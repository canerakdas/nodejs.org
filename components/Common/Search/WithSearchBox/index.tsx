'use client';

import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
} from '@heroicons/react/24/outline';
import type { Results, Nullable } from '@orama/orama';
import * as Dialog from '@radix-ui/react-dialog';
import { Label } from '@radix-ui/react-label';
import { useTranslations } from 'next-intl';
import { useState, useEffect, useMemo } from 'react';
import type { FC } from 'react';

import Keyboard from '@/components/Common/Keyboard';
import SearchFooter from '@/components/Common/Search/SearchFooter';
import SearchResult from '@/components/Common/Search/SearchResult';
import {
  NoResults,
  SearchError,
} from '@/components/Common/Search/SearchStatus';
import SeeAllResults from '@/components/Common/Search/SeeAllResults';
import Tabs from '@/components/Common/Tabs';
import Modal from '@/components/Containers/Modal';
import { useComboboxKeyboardNavigation } from '@/hooks/react-client';
import { useRouter } from '@/navigation.mjs';
import { DEFAULT_ORAMA_QUERY_PARAMS } from '@/next.constants.mjs';
import { search as oramaSearch, getInitialFacets } from '@/next.orama.mjs';
import type { SearchDoc } from '@/types';
import {
  getFacets,
  getRoles,
  setSearchParams,
  searchHitToLinkPath,
} from '@/util/searchUtils';

import styles from './index.module.css';

type Facets = { [key: string]: number };

type SearchResults = Nullable<Results<SearchDoc>>;

type SearchBoxProps = { setOpen: (open: boolean) => void; open: boolean };

const WithSearchBox: FC<SearchBoxProps> = ({ open, setOpen }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResults>(null);
  const [selectedFacet, setSelectedFacet] = useState<number>(0);
  const [facets, setFacets] = useState<Facets>({});
  const [searchError, setSearchError] = useState<Nullable<Error>>(null);
  const [control, setControl] = useState<'keyboard' | 'mouse'>('mouse');
  const router = useRouter();
  const shortcuts = useTranslations('components.search.shortcuts');

  const roles = getRoles(shortcuts);
  const selectedFacetName = Object.keys(facets)[selectedFacet];

  const search = (term: string) => {
    oramaSearch({
      term,
      ...DEFAULT_ORAMA_QUERY_PARAMS,
      mode: 'fulltext',
      returning: [
        'path',
        'pageSectionTitle',
        'pageTitle',
        'path',
        'siteSection',
      ],
      ...filterBySection(),
    })
      .then(setSearchResults)
      .catch(setSearchError);
  };

  const reset = () => {
    setSearchTerm('');
    setSelectedItem(undefined);
    setSelectedFacet(0);
    setControl('mouse');
  };

  useEffect(() => {
    getInitialFacets().then(setSearchResults).catch(setSearchError);

    return reset;
    // We only want to run this effect once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    () => {
      search(searchTerm);
    },
    // We don't need to care about memoization of search function
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchTerm, selectedFacet]
  );

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const handleEnter = () => {
    if (
      !searchResults ||
      !selectedItem ||
      // Prevent enter key from triggering when the user is changing facets or
      // when the user is interacting with the Links in the search box
      document.activeElement?.role?.includes('option' || 'combobox')
    ) {
      return;
    }

    const selectedHit = searchResults.hits[selectedItem];

    if (!selectedHit) {
      return;
    }

    handleClose();
    router.push(searchHitToLinkPath(selectedHit));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleClose();
    router.push(setSearchParams(searchTerm, selectedFacetName));
  };

  const handleBeforeCommand = () => {
    if (
      searchError ||
      !searchResults ||
      searchResults.count <= 0 ||
      // Prevent the defined keyboard commands when the user is not interacting
      // with the search results
      document.activeElement?.role?.includes('option' || 'combobox' || 'tab')
    )
      return;
  };

  const filterBySection = () => {
    if (selectedFacet === 0) return {};

    return { where: { siteSection: { eq: selectedFacetName } } };
  };

  useEffect(() => {
    setFacets(getFacets(searchResults));
  }, [searchResults]);

  const {
    cursor: [selectedItem, setSelectedItem],
    navigation,
  } = useComboboxKeyboardNavigation({
    onBeforeCommand: handleBeforeCommand,
    onPressEnter: handleEnter,
    onValueChange: () => setControl('keyboard'),
    itemLimit:
      Math.min(facets[selectedFacetName], DEFAULT_ORAMA_QUERY_PARAMS.limit) - 1,
    roles: roles,
  });

  const tabs = useMemo(
    () =>
      Object.keys(facets).map((facetName, idx) => ({
        key: facetName,
        label: facetName,
        secondaryLabel: `(${facets[facetName].toLocaleString('en')})`,
        value: idx.toString(),
      })),
    [facets]
  );

  return (
    <Modal
      open={open}
      onOpenChange={handleClose}
      size="medium"
      closeTrigger={false}
    >
      <div className={styles.container} aria-label="search" role="searchbox">
        <div className={styles.search}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <Label htmlFor="search" className={styles.label}>
              <MagnifyingGlassIcon />
            </Label>
            <input
              aria-activedescendant={
                selectedItem !== undefined
                  ? `search-hit-${selectedItem}`
                  : undefined
              }
              aria-autocomplete="list"
              aria-controls="fulltext-results-container"
              aria-expanded={Boolean(!searchError && searchResults?.count)}
              autoComplete="off"
              role="combobox"
              type="search"
              id="search"
              className={styles.input}
              onChange={event => {
                setSearchTerm(event.target.value);
                setSelectedItem(undefined);
              }}
              value={searchTerm}
            />
            <Dialog.Trigger className={styles.trigger}>
              <ChevronLeftIcon />
            </Dialog.Trigger>
          </form>

          <Tabs
            activationMode="manual"
            defaultValue="0"
            autoFocus={true}
            tabs={tabs}
            onValueChange={(value: string) => {
              setSelectedItem(undefined);
              setSelectedFacet(Number(value));
            }}
            className={styles.tabs}
          />
        </div>

        <section className={styles.results}>
          {!searchError && searchResults && searchResults.count > 0 && (
            <ul
              id="fulltext-results-container"
              role="listbox"
              onMouseMove={() => setControl('mouse')}
            >
              {searchResults.hits.map((hit, idx) => (
                <SearchResult
                  control={control}
                  key={hit.id}
                  hit={hit}
                  searchTerm={searchTerm}
                  selected={
                    typeof selectedItem === 'undefined'
                      ? selectedItem
                      : selectedItem === idx
                  }
                  idx={idx}
                  onMouseMove={() => setSelectedItem(idx)}
                />
              ))}
            </ul>
          )}

          {searchError && <SearchError />}

          {searchResults && searchResults.count === 0 && (
            <NoResults searchTerm={searchTerm} />
          )}

          {!searchError && searchResults && searchResults.count > 8 && (
            <SeeAllResults
              results={searchResults}
              searchTerm={searchTerm}
              facetName={selectedFacetName}
              onClick={() => setOpen(false)}
            />
          )}
        </section>

        <SearchFooter>
          <div className={styles.navigation}>
            {roles.default?.map(({ value, label }) => (
              <Keyboard
                value={value}
                label={label}
                key={value}
                kind="neutral"
              />
            ))}
            {control === 'keyboard' &&
              navigation?.map(({ value, label }) => (
                <Keyboard
                  value={value}
                  label={label}
                  key={value}
                  kind="neutral"
                />
              ))}
          </div>
        </SearchFooter>
      </div>
    </Modal>
  );
};

export default WithSearchBox;
