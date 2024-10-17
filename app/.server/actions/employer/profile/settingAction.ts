import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { z } from "zod";
import { db } from "~/lib/db";
import { isValidPassword } from "~/lib/utils/formatUtils";
import pkg from "bcryptjs";

async function deleteEmployerProfile(id: number) {
  try {
    const company = await db.company.delete({
      where: { id }
    });
    return company;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function updateEmployerPreference(id: number, preference: string, string_value: string) {
  const value = string_value === "on" ? true : false;
  try {
    const company = await db.company.update({
      where: { id },
      data: {
        preferences: {
          update: {
            [preference]: value
          }
        }
      }
    });
    return company;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function updateEmployerEmail(id: number, email: string) {
  try {
    const company = await db.company.update({
      where: { id },
      data: {
        email
      }
    });
    return company;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function updateEmployerPassword(id: number, password: string) {
  const { hash } = pkg;
  try {
    const passwordHash = await hash(password, 12);
    const company = await db.company.update({
      where: { id },
      data: {
        password: passwordHash
      }
    });
    return company;
  } catch (error) {
    console.error(error);
    return null;
  }
}

const actionSchema = z.object({
  action: z.string(),
  id: z.string(),
  preference: z.string().optional(),
  value: z.string().optional(),
  email: z.string().optional(),
  current_password: z.string().optional(),
  new_password: z.string().optional(),
  confirm_password: z.string().optional()
});

export async function employerSettingsAction({ request }: ActionFunctionArgs) {
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
    const company = await deleteEmployerProfile(id_num);
    if (!company || !company.id || company.id !== id_num) {
      return redirect(`/employer${finalURL}error=company_not_found`);
    }
    return redirect(`/employer${finalURL}success=company_deleted`);
  }

  if (action === "update_preference") {
    const { preference, value } = parsedData.data;
    if (!preference || !value) {
      return redirect("/505");
    }
    const company = await updateEmployerPreference(id_num, preference, value);
    if (!company || !company.id || company.id !== id_num) {
      return redirect(`/employer${finalURL}error=company_not_found`);
    }
    return null;
  }

  if (action === "update_email") {
    const { email } = parsedData.data;
    if (!email) {
      return redirect("/505");
    }
    const company = await updateEmployerEmail(id_num, email);
    if (!company || !company.id || company.id !== id_num) {
      return redirect(`/employer${finalURL}error=company_not_found`);
    }
    return null;
  }

  if (action === "update_password") {
    const { current_password, new_password, confirm_password } = parsedData.data;
    if (!current_password || !new_password || !confirm_password) {
      return redirect("/505");
    }
    if (new_password !== confirm_password) {
      return redirect(`/employer${finalURL}error=passwords_do_not_match`);
    }
    if (!isValidPassword(new_password)) {
      return redirect(`/employer${finalURL}error=invalid_password`);
    }
    const company = await db.company.findUnique({ where: { id: id_num } });
    if (!company) {
      return redirect(`/employer${finalURL}error=company_not_found`);
    }
    const { compare } = pkg;
    const isValid = await compare(current_password, company.password);
    if (!isValid) {
      return redirect(`/employer${finalURL}error=invalid_password`);
    }
    const updatedCompany = await updateEmployerPassword(id_num, new_password);
    if (!updatedCompany || !updatedCompany.id || updatedCompany.id !== id_num) {
      return redirect(`/employer${finalURL}error=company_not_found`);
    }

    return null;
  }

  return redirect("/505");
}
