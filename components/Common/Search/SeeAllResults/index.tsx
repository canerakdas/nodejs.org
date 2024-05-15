import type { Results } from '@orama/orama';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import Link from '@/components/Link';
import type { SearchDoc } from '@/types';
import { setSearchParams } from '@/util/searchUtils';

import styles from './index.module.css';

type SearchResults = Results<SearchDoc>;

type SeeAllResultsProps = {
  results: SearchResults;
  searchTerm: string;
  facetName: string;
  onClick: () => void;
};

const SeeAllResults: FC<SeeAllResultsProps> = ({
  results,
  searchTerm,
  facetName,
  onClick,
}) => {
  const t = useTranslations();

  const resultsCount = results?.count?.toLocaleString('en') ?? 0;

  return (
    <div className={styles.allResults}>
      <Link
        href={setSearchParams(searchTerm, facetName)}
        onClick={onClick}
        role="link"
      >
        {t('components.search.seeAll.text', { count: resultsCount })}
      </Link>
    </div>
  );
};

export default SeeAllResults;
