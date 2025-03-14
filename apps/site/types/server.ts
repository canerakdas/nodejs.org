import type { Heading } from '@vcarl/remark-headings';
import type { ReadTimeResults } from 'reading-time';

import type { Author } from './author';
import type { LegacyFrontMatter } from './frontmatter';

export interface ClientSharedServerContext {
  frontmatter: LegacyFrontMatter;
  headings: Array<Heading>;
  pathname: string;
  filename: string;
  readingTime: ReadTimeResults;
  authors: Array<Author>;
}
