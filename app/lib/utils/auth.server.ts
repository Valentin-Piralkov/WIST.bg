import pkg from "bcryptjs";
import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { db } from "../db";
import { randomUUID } from "crypto";
import { generateSlug } from "./stringUtils";

const bcrypt = pkg;

// Register a new user
export async function registerUser({
  firstName,
  lastName,
  phone,
  email,
  password
}: {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
}) {
  let user: {
    id: number;
    firstName: string;
    lastName: string;
    slug: string;
    phone: string;
    email: string;
    emailVerified: boolean;
    password: string;
  } | null;

  try {
    // hash the password using bcrypt
    const passwordHash = await bcrypt.hash(password, 12);

    // try to create a new user with random UUID slug
    user = await db.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        slug: randomUUID(),
        phone: phone,
        email: email.toLowerCase(),
        emailVerified: true,
        password: passwordHash
      }
    });
  } catch (error) {
    console.error(error);
    return null;
  }

  if (!user) return null;

  // generate a slug now that we have the user's ID
  const slug = generateSlug(`${firstName} ${lastName}`, user.id);

  try {
    // update the user with the generated slug
    user = await db.user.update({
      where: { id: user.id },
      data: { slug }
    });
  } catch (error) {
    console.error(error);
    return null;
  }

  if (!user || !user.slug || user.slug !== slug) return null;

  return user;
}

// Authenticate user login
export async function loginUser({ email, password }: { email: string; password: string }) {
  // find the user by email
  const user = await db.user.findUnique({ where: { email: email.toLowerCase() } });
  if (!user) return null;

  // compare the provided password with the stored password hash
  const isValid = await bcrypt.compare(password, user.password);
  return isValid ? user : null;
}

// Register a new employer
export async function registerEmployer({
  name,
  phone,
  email,
  password
}: {
  name: string;
  phone: string;
  email: string;
  password: string;
}) {
  let company: {
    id: number;
    name: string;
    slug: string;
    phone: string;
    email: string;
    emailVerified: boolean;
    password: string;
  } | null;

  try {
    // hash the password using bcrypt
    const passwordHash = await bcrypt.hash(password, 12);

    // try to create a new company with random UUID slug
    company = await db.company.create({
      data: {
        name: name,
        slug: randomUUID(),
        phone: phone,
        email: email.toLowerCase(),
        emailVerified: true,
        password: passwordHash
      }
    });
  } catch (error) {
    console.error(error);
    return null;
  }

  if (!company) return null;

  // generate a slug now that we have the company's ID
  const slug = generateSlug(name, company.id);

  try {
    // update the company with the generated slug
    company = await db.company.update({
      where: { id: company.id },
      data: { slug }
    });
  } catch (error) {
    console.error(error);
    return null;
  }

  if (!company || !company.slug || company.slug !== slug) return null;

  return company;
}

// Authenticate employer login
export async function loginEmployer({ email, password }: { email: string; password: string }) {
  // find the company by email
  const company = await db.company.findUnique({ where: { email: email.toLowerCase() } });
  if (!company) return null;

  // compare the provided password with the stored password hash
  const isValid = await bcrypt.compare(password, company.password);
  return isValid ? company : null;
}

// Session management
const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) throw new Error("SESSION_SECRET must be set");

const storage = createCookieSessionStorage({
  cookie: {
    name: "session",
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    httpOnly: true
  }
});

// Create a new session for a user (session has userId and userType)
export async function createUserSession(userId: number, userType: "user" | "employer", redirectTo: string) {
  const session = await storage.getSession();
  session.set("userId", userId);
  session.set("userType", userType);
  return redirect(redirectTo, {
    headers: { "Set-Cookie": await storage.commitSession(session) }
  });
}

// Get the current user session (userId and userType)
export async function getUserSession(
  request: Request
): Promise<{ userId: number | null; userType: "user" | "employer" | null }> {
  const session = await storage.getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");
  const userType = session.get("userType");
  return { userId, userType };
}

// Require a user session to access a route
// userTypeRequired is either "user" or "employer"
export async function requireUserSession(request: Request, userTypeRequired: "user" | "employer", redirectTo: string) {
  const { userId, userType } = await getUserSession(request);

  if (!userId || userType !== userTypeRequired) {
    throw redirect(redirectTo);
  }
  const session = await getUserSession(request);
  if (!session.userId || !session.userType || session.userType !== userTypeRequired) {
    throw redirect(redirectTo);
  }
  return { userId: session.userId, userType: session.userType };
}
// Destroy the current user session
export async function logout(request: Request) {
  const session = await storage.getSession(request.headers.get("Cookie"));

  // get search params from URL
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const finalURL = searchParams.toString() ? `?${searchParams.toString()}` : "";

  if (!session.get("userId")) {
    return redirect(`/${finalURL}`);
  }

  const redirectTo = session.get("userType") === "user" ? `/${finalURL}` : `/employer${finalURL}`;

  return redirect(redirectTo, {
    headers: { "Set-Cookie": await storage.destroySession(session) }
  });
}
