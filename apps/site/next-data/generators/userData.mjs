'use strict';

/**
 *
 * @param {string} username
 * @returns {import('../../types').Author}
 */
export const createAuthorWithUsername = username => ({
  id: username,
  name: username,
  image: `https://avatars.githubusercontent.com/${username}`,
  url: `https://github.com/${username}`,
});

/**
 *
 * @param {string} author
 * @returns {Array<string>}
 */
export const formatAuthors = author => {
  // Clears text in parentheses
  const cleanedAuthor = author.replace(/\s*\(.*?\)\s*/g, '').trim();

  // Defines the separators such as (",", "and", ";", "&", "prepared by", "by")
  const separators = /,|\band\b|;|&| prepared by | by /i;

  return cleanedAuthor
    .split(separators)
    .map(name => name.trim())
    .filter(Boolean);
};

/**
 * @param {Array<(import('../../types').Learn)|(import('../../types').BlogPost)>} data
 * @return {{ [key: string]: import('../../types').Author }}
 */
const generateUserData = data => {
  const authors = {};
  const usernames = new Set([
    ...data.flatMap(({ author }) => (author ? formatAuthors(author) : [])),
  ]);

  Array.from(usernames).forEach(
    username => (authors[username] = createAuthorWithUsername(username))
  );

  return authors;
};

export default generateUserData;
