import {
  ChevronRightIcon,
  ArrowDownTrayIcon,
  SparklesIcon,
} from '@heroicons/react/24/solid';
import type { Result } from '@orama/orama';
import classNames from 'classnames';
import type { FC } from 'react';
import { useEffect, useRef, Fragment } from 'react';

import Link from '@/components/Link';
import { highlighter } from '@/next.orama.mjs';
import type { SearchDoc } from '@/types';
import { pathToBreadcrumbs, searchHitToLinkPath } from '@/util/searchUtils';

import styles from './index.module.css';

type SearchResultProps = {
  hit: Result<SearchDoc>;
  searchTerm: string;
  selected: boolean | undefined;
  control?: 'keyboard' | 'mouse';
  idx: number;
  onMouseMove?: () => void;
};

const SearchResult: FC<SearchResultProps> = ({
  hit,
  searchTerm,
  selected,
  control,
  idx,
  onMouseMove = () => {},
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const path = searchHitToLinkPath(hit);

  useEffect(() => {
    if (!ref.current || control === 'mouse') return;

    // If the element in the search box is selected, scroll to that element or
    // when the facet or search term changes, it allows us to scroll to the
    // first element.
    if (selected || (typeof selected === 'undefined' && idx === 0)) {
      ref.current.scrollIntoView({ block: 'center' });
    }
  }, [control, idx, selected]);

  return (
    <li className={styles.result} onMouseMove={onMouseMove}>
      <Link
        href={path}
        tabIndex={selected ? 0 : -1}
        key={hit.id}
        id={`search-hit-${idx}`}
        role="option"
        aria-selected={selected}
        className={classNames({
          [styles.keyboard]: control === 'keyboard',
          [styles.mouse]: control === 'mouse',
        })}
      >
        <div className={styles.title}>
          {hit.document.path.startsWith('download') && <ArrowDownTrayIcon />}
          {hit.document.path.startsWith('about') && <SparklesIcon />}
          <p
            ref={ref}
            dangerouslySetInnerHTML={{
              __html: highlighter
                .highlight(hit.document.pageSectionTitle, searchTerm)
                .trim(125),
            }}
          />
        </div>
        <div className={styles.breadcrumb}>
          {pathToBreadcrumbs(hit.document.path).map((breadcrumb, idx) => (
            <Fragment key={breadcrumb}>
              {idx !== 0 && <ChevronRightIcon className={styles.icon} />}
              {breadcrumb}
            </Fragment>
          ))}
          <ChevronRightIcon className={styles.icon} />
          {hit.document.pageTitle}
        </div>
      </Link>
    </li>
  );
};

export default SearchResult;
