export const parseAuthorNames = (author: string) => {
  if (!author) return [];

  // Clears text in parentheses
  const cleanedAuthor = author.replace(/\s*\(.*?\)\s*/g, '').trim();

  // Defines the separators such as (",", "and", ";", "&", "prepared by", "by")
  const separators = /,|\band\b|;|&| prepared by | by /i;

  return cleanedAuthor
    .split(separators)
    .map(name => name.trim())
    .filter(Boolean);
};
