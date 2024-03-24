import slugify from "slugify";

export const generateSlug = (name: string) => {
  const slug = slugify(name, { replacement: "-", lower: true });
  return slug;
};
