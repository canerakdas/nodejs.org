/**
 * @TODO @canerakdas Remove this file before open a PR
 * This file is a utility to replace author names with author IDs in the markdown files.
 * It reads the authors.json file and replaces the author names with the corresponding author IDs.
 */
import fs from 'fs/promises';

import { glob } from 'glob';

export const mapAuthorToCardAuthors = author => {
  const cleanedAuthor = author.replace(/\s*\(.*?\)\s*/g, '').trim();

  const separators = /,|\band\b|;|&| prepared by | by /i;

  return cleanedAuthor
    .split(separators)
    .map(name => name.trim())
    .filter(Boolean);
};

async function replaceAuthorId(pattern, authorsJsonPath) {
  try {
    const authorsContent = await fs.readFile(authorsJsonPath, 'utf8');
    const authors = JSON.parse(authorsContent);

    const files = glob.sync(pattern);

    for (const file of files) {
      const markdownContent = await fs.readFile(file, 'utf8');

      const authorMatch = markdownContent.match(/^author:\s*(.+)$/m);
      if (!authorMatch) {
        console.log(`No author found in ${file}.`);
        continue;
      }

      const authorName = authorMatch[1].trim();
      const updatedName = mapAuthorToCardAuthors(authorName);
      const a = [];

      updatedName.forEach(name => {
        const authorData = authors[name];

        if (!authorData || !authorData.id) {
          console.log(`No matching author ID found for ${name} in ${file}.`);
        } else {
          a.push(authorData.id);
        }
      });

      if (a.length === 0) {
        console.log(
          `No matching author ID found for ${authorName} in ${file}.`
        );
        continue;
      }

      const updatedMarkdown = markdownContent.replace(
        authorMatch[0],
        `author: ${a.join(', ')}`
      );

      console.log(updatedMarkdown);
    }
  } catch (error) {
    console.error('Error processing files:', error);
  }
}

replaceAuthorId('./pages/en/blog/**/**.md', 'authors.json');
