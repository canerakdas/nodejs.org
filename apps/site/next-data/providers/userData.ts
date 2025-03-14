import { cache } from 'react';

import generateUserData from '@/next-data/generators/userData.mjs';
import { GITHUB_API_KEY } from '@/next.constants.mjs';
import type { Author, GitHubApiUser } from '@/types';
import { getGitHubUser } from '@/util/gitHubUtils';

import { provideBlogPosts } from './blogData';
import { provideLearnPage } from './learnData';

// Defines if we should use the GitHub API Key for the request
// based on the environment variable `GITHUB_API_KEY`
const options = GITHUB_API_KEY
  ? {
      headers: {
        Authorization: `Bearer ${GITHUB_API_KEY}`,
        Accept: `application/vnd.github+json`,
      },
    }
  : undefined;

const [blogData, learnData] = await Promise.all([
  provideBlogPosts('all'),
  provideLearnPage(),
]);

const provideUserData = cache(async (): Promise<Record<string, Author>> => {
  const authors = generateUserData([...blogData.posts, ...learnData]);

  const users = await Promise.all(
    Object.entries(authors).map(async ([username, author]) => {
      const response = await fetch(getGitHubUser(username), options);

      if (response.ok) {
        return response
          .json()
          .then(({ name, url, avatar_url }: GitHubApiUser) => ({
            [username]: {
              id: username,
              name: name,
              url: url,
              image: avatar_url,
            },
          }));
      }

      return { [username]: author };
    })
  );

  return users.reduce((acc, user) => ({ ...acc, ...user }), {});
});

export default provideUserData;
