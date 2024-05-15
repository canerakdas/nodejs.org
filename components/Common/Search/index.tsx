'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { useState, type FC } from 'react';

import Keyboard from '@/components/Common/Keyboard';
import WithSearchBox from '@/components/Common/Search/WithSearchBox';
import { useCommandKey, useKeyboardCommands } from '@/hooks/react-client';

import styles from './index.module.css';

const SearchButton: FC = () => {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const { osCommandKey, isOSLoading } = useCommandKey();

  useKeyboardCommands(cmd => cmd === 'cmd-k' && setOpen(true));

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={styles.button}
        aria-label={t('components.search.searchBox.placeholder')}
      >
        <MagnifyingGlassIcon className={styles.icon} />

        {t('components.search.searchBox.placeholder')}
        <Keyboard
          value={`${osCommandKey} K`}
          className={classNames(styles.shortcut, {
            'opacity-0': isOSLoading,
          })}
        />
      </button>

      <WithSearchBox open={open} setOpen={setOpen} />
    </>
  );
};

export default SearchButton;
