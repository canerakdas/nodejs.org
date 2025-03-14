'use strict';

import { createReadStream } from 'node:fs';
import { join } from 'node:path';
import readline from 'node:readline';

import graymatter from 'gray-matter';

import { getMarkdownFiles } from '../../next.helpers.mjs';

// Defines the base path for Learn posts
const LEARN_PATH = join(process.cwd(), 'pages/en/learn');

/**
 * Parses the Markdown content and extracts FrontMatter metadata.
 *
 * @param {string} source - The raw markdown content of a learn pages.
 * @returns {Array<import('../../types').Learn>}
 */
const getFrontMatter = source => {
  const { title, authors, layout } = graymatter(source).data;

  return {
    title: title || 'Untitled',
    author: authors || 'The Node.js Project',
    layout: layout || 'learn',
  };
};

/**
 * Reads and extracts frontmatter metadata from Markdown files.
 *
 * @return {Promise<import('../../types').LearnData>}
 */
const generateLearnData = async () => {
  // We retrieve the full pathnames of all Learn Pages to read each file individually
  const filenames = await getMarkdownFiles(process.cwd(), 'pages/en/learn');

  return new Promise(resolve => {
    const posts = [];
    const rawFrontmatter = [];

    filenames.forEach(filename => {
      // We create a stream for reading a file instead of reading the files
      const _stream = createReadStream(join(LEARN_PATH, filename));

      // We create a readline interface to read the file line-by-line
      const _readLine = readline.createInterface({ input: _stream });

      // Creates an array of the metadata based on the filename
      // This prevents concurrency issues since the for-loop is synchronous
      // and these event listeners are not
      rawFrontmatter[filename] = [0, ''];

      // We read line by line
      _readLine.on('line', line => {
        rawFrontmatter[filename][1] += `${line}\n`;

        // We observe the frontmatter separators
        if (line === '---') {
          rawFrontmatter[filename][0] += 1;
        }

        // Once we have two separators we close the readLine and the stream
        if (rawFrontmatter[filename][0] === 2) {
          _readLine.close();
          _stream.close();
        }
      });

      // Then we parse gray-matter on the frontmatter
      // This allows us to only read the frontmatter part of each file
      // and optimise the read-process as we have thousands of markdown files
      _readLine.on('close', () => {
        posts.push(getFrontMatter(rawFrontmatter[filename][1]));

        if (posts.length === filenames.length) {
          resolve({ posts });
        }
      });
    });
  });
};

export default generateLearnData;
