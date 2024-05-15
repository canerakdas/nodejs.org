import type { Result, Results, Nullable } from '@orama/orama';

import { BASE_URL } from '@/next.constants.mjs';
import type { SearchDoc } from '@/types';

export const searchHitToLinkPath = (hit: Result<SearchDoc>) => {
  const isAPIResult = hit.document.siteSection.toLowerCase() === 'docs';
  const basePath = isAPIResult ? BASE_URL : '';
  return `${basePath}/${hit.document.path}`;
};

export const pathToBreadcrumbs = (path: string) => {
  const paths = path.replace(/#.+$/, '').split('/');

  return (
    paths
      // When the path is a root path, we keep the breadcrumb as is.
      .slice(0, paths.length !== 1 ? -1 : 1)
      .map(element => element.replaceAll('-', ' '))
      .filter(Boolean)
  );
};

export const getFacets = (results: Nullable<Results<SearchDoc>>) => ({
  all: results?.facets
    ? Object.values(results?.facets.siteSection.values).reduce(
        (a, b) => a + b,
        0
      )
    : 0,
  ...(results?.facets?.siteSection?.values ?? {}),
});

export const setSearchParams = (term: string, facet: string): string => {
  const searchParams = new URLSearchParams();

  searchParams.set('q', term);
  searchParams.set('section', facet);

  return `/search?${searchParams.toString()}`;
};

export const getRoles = (t: (arg: string) => string) => ({
  link: [{ value: 'enter', label: t('visit') }],
  option: [
    { value: 'up-down', label: t('navigate') },
    { value: 'enter', label: t('select') },
  ],
  combobox: [
    { value: 'up-down', label: t('navigate') },
    { value: 'enter', label: t('search') },
  ],
  tab: [
    {
      value: 'left-right',
      label: t('changeCategory'),
    },
    {
      value: 'enter',
      label: t('selectCategory'),
    },
  ],
  default: [{ value: 'esc', label: t('close') }],
});
