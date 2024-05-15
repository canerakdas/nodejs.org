'use client';

import classNames from 'classnames';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import type { FC, PropsWithChildren } from 'react';
import { useEffect, useState } from 'react';

import { Link } from '@/navigation.mjs';

import styles from './index.module.css';

const getLogoURL = (theme: string = 'dark') =>
  `https://website-assets.oramasearch.com/orama-when-${theme}.svg`;

type SearchFooterProps = { ltr?: boolean };

const SearchFooter: FC<PropsWithChildren<SearchFooterProps>> = ({
  ltr = false,
  children,
}) => {
  const t = useTranslations();
  const { resolvedTheme } = useTheme();
  const [logoURL, setLogoURL] = useState<string>();

  useEffect(() => setLogoURL(getLogoURL(resolvedTheme)), [resolvedTheme]);

  return (
    <footer
      className={classNames(styles.footer, {
        [styles.rightAligned]: !ltr,
      })}
    >
      {children}
      <Link
        href="https://oramasearch.com?utm_source=nodejs.org"
        target="_blank"
        rel="noreferer"
        role="link"
      >
        {t('components.search.poweredBy.text')}

        {logoURL && (
          <Image
            src={logoURL}
            alt="Powered by OramaSearch"
            width={64}
            height={16}
          />
        )}
      </Link>
    </footer>
  );
};

export default SearchFooter;
