import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import styles from './index.module.css';

type NoResultsProps = { searchTerm: string };

const NoResults: FC<NoResultsProps> = ({ searchTerm }) => {
  const t = useTranslations();

  return (
    <output className={styles.status}>
      {t('components.search.noResults.text', { query: searchTerm })}
    </output>
  );
};

const SearchError: FC = () => {
  const t = useTranslations();

  return (
    <output className={styles.status}>
      {t('components.search.searchError.text')}
    </output>
  );
};

export { NoResults, SearchError };
