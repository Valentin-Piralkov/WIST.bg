import { db } from "~/lib/db";

export async function updateFiltersAction(label: string, value: boolean) {
  db.filterOption.update({
    where: {
      label: label
    },
    data: {
      value: value
    }
  });
}
