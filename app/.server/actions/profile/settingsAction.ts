import { db } from "~/lib/db";
import pkg from "bcryptjs";
import { z } from "zod";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { isValidPassword } from "~/lib/utils/formatUtils";

const actionSchema = z.object({
  action: z.string(),
  id: z.string(),
  preference: z.string().optional(),
  value: z.string().optional(),
  current_password: z.string().optional(),
  new_password: z.string().optional(),
  confirm_password: z.string().optional()
});

async function deleteUserProfile(id: number) {
  try {
    const user = await db.user.delete({
      where: { id }
    });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function updateUserPreference(id: number, preference: string, string_value: string) {
  const value = string_value === "on" ? true : false;
  try {
    const user = await db.user.update({
      where: { id },
      data: {
        preferences: {
          update: {
            [preference]: value
          }
        }
      }
    });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function updateUserPassword(id: number, password: string) {
  const { hash } = pkg;
  try {
    const passwordHash = await hash(password, 12);
    const user = await db.user.update({
      where: { id },
      data: {
        password: passwordHash
      }
    });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function settingsAction({ request }: ActionFunctionArgs) {
  // get search params from URL
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const finalURL = searchParams.toString() ? `?${searchParams.toString()}&` : `?`;

  const formData = Object.fromEntries(await request.formData());

  const parsedData = actionSchema.safeParse(formData);

  if (!parsedData.success) {
    return redirect("/404");
  }

  const { action, id } = parsedData.data;
  const id_num = parseInt(id);

  if (action === "delete") {
    const user = await deleteUserProfile(id_num);
    if (!user || !user.id || user.id !== id_num) {
      return redirect(`/${finalURL}error=company_not_found`);
    }
    return redirect(`/${finalURL}success=profile_deleted`);
  }

  if (action === "update_preference") {
    const { preference, value } = parsedData.data;
    if (!preference || !value) {
      return redirect("/505");
    }
    const user = await updateUserPreference(id_num, preference, value);
    if (!user || !user.id || user.id !== id_num) {
      return redirect(`/${finalURL}error=company_not_found`);
    }
    return null;
  }

  if (action === "update_password") {
    const { current_password, new_password, confirm_password } = parsedData.data;
    if (!current_password || !new_password || !confirm_password) {
      return redirect("/505");
    }
    if (new_password !== confirm_password) {
      return redirect(`/${finalURL}error=passwords_do_not_match`);
    }
    if (!isValidPassword(new_password)) {
      return redirect(`/${finalURL}error=invalid_password`);
    }
    const user = await db.user.findUnique({ where: { id: id_num } });
    if (!user) {
      return redirect("/505");
    }
    const { compare } = pkg;
    const isValid = await compare(current_password, user.password);
    if (!isValid) {
      return redirect(`/employer${finalURL}error=invalid_password`);
    }
    const updatedUser = await updateUserPassword(id_num, new_password);
    if (!updatedUser || !updatedUser.id || updatedUser.id !== id_num) {
      return redirect(`/${finalURL}error=company_not_found`);
    }

    return null;
  }

  return redirect("/505");
}
