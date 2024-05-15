import {
  setSearchParams,
  pathToBreadcrumbs,
  getFacets,
} from '@/util/searchUtils';

describe('pathToBreadcrumbs', () => {
  it('should return an array of breadcrumbs from a given path', () => {
    const path = 'docs/v20.13.1/api/util.html';
    const expected = ['docs', 'v20.13.1', 'api'];

    expect(pathToBreadcrumbs(path)).toEqual(expected);
  });

  it('should replace hyphens with spaces in the breadcrumbs', () => {
    const path = 'docs/v20.13.1/a-p-i/util.html';
    const expected = ['docs', 'v20.13.1', 'a p i'];

    expect(pathToBreadcrumbs(path)).toEqual(expected);
  });

  it('should return an empty array for a root path', () => {
    const path = '/';
    const expected = [];

    expect(pathToBreadcrumbs(path)).toEqual(expected);
  });

  it('should return an array with one element for a one-level path', () => {
    const path = 'docs/';
    const expected = ['docs'];

    expect(pathToBreadcrumbs(path)).toEqual(expected);
  });
});

describe('getFacets', () => {
  it('should correctly calculate the sum of all facets and return the correct object structure', () => {
    const mockResults = {
      facets: {
        siteSection: {
          values: {
            section1: 10,
            section2: 20,
            section3: 30,
          },
        },
      },
    };

    const expected = {
      all: 60,
      section1: 10,
      section2: 20,
      section3: 30,
    };

    expect(getFacets(mockResults)).toEqual(expected);
  });

  it('should return an object with all: 0 if facets are not provided', () => {
    const mockResults = {};

    const expected = {
      all: 0,
    };

    expect(getFacets(mockResults)).toEqual(expected);
  });
});

describe('setSearchParams', () => {
  it('should return a search URL with the correct parameters', () => {
    const term = 'javascript';
    const facet = 'learn';

    const result = setSearchParams(term, facet);

    expect(result).toBe('/search?q=javascript&section=learn');
  });
});
