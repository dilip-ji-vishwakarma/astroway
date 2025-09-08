export const getImageUrl = (path: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  if (!path) return "";
  return `${baseUrl}${path}`;
};
