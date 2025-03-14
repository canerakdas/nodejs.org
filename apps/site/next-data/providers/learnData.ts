import { cache } from 'react';

import generateLearnData from '@/next-data/generators/learnData.mjs';
import type { Learn } from '@/types';

const { posts } = await generateLearnData();

export const provideLearnPage = cache((): Array<Learn> => posts);
