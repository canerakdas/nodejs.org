import { parseAuthorNames } from '../authorUtils';

describe('parseAuthorNames', () => {
  it('maps authors to card authors with default avatar source', () => {
    const author = 'John Doe';

    const result = parseAuthorNames(author);

    expect(result).toEqual(['John Doe']);
  });

  it('handles multiple authors separated by various delimiters', () => {
    const author = 'Alice, Bob, Charlie, David';

    const result = parseAuthorNames(author);
    expect(result).toEqual(['Alice', 'Bob', 'Charlie', 'David']);
  });

  describe('when has more than one author', () => {
    it.each([
      ['Timothy J Fontaine, John Doe'],
      ['Timothy J Fontaine and John Doe'],
      ['Timothy J Fontaine;John Doe'],
      ['Timothy J Fontaine & John Doe'],
      ['Timothy J Fontaine by John Doe'],
      ['Timothy J Fontaine prepared by John Doe'],
      ['Timothy J Fontaine (@TimothyJFontaine) & John Doe (@JohnDoe)'],
      ['Timothy J Fontaine (TimothyJFontaine) & John Doe (JohnDoe)'],
    ])('returns the correct card authors', author => {
      const result = parseAuthorNames(author);

      expect(result).toStrictEqual(['Timothy J Fontaine', 'John Doe']);
    });
  });

  describe('when the author name does not have GitHub username', () => {
    it('returns the correct card authors', () => {
      const result = parseAuthorNames('John Doe, Jane Doe');

      expect(result).toStrictEqual(['John Doe', 'Jane Doe']);
    });
  });

  describe('when the author name has GitHub username', () => {
    it('returns the correct card authors', () => {
      const result = parseAuthorNames('Timothy J Fontaine');

      expect(result).toStrictEqual(['Timothy J Fontaine']);
    });
  });
});
