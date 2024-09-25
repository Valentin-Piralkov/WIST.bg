export const dateToShortString = (date: string): string => {
  const dt = new Date(date);
  const y: string = dt.getFullYear().toString();
  const m: string = (dt.getMonth() + 1).toString();
  const d: string = dt.getDate().toString();

  return "".concat(d, "-").concat(m, "-").concat(y);
};

export const generateSlug = (title: string, id: number): string => {
  const slug = title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "");
  return "".concat(slug, "-").concat(id.toString());
};
