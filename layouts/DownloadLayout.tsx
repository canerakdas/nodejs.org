import type { FC, PropsWithChildren } from 'react';

import PrimaryDownloadMatrix from '@/components/Downloads/PrimaryDownloadMatrix';
import SecondaryDownloadMatrix from '@/components/Downloads/SecondaryDownloadMatrix';
import { WithNodeRelease } from '@/components/withNodeRelease';

import BaseLayout from './BaseLayout';

type DownloadLayoutProps = {
  downloads: Record<string, string>;
  additional: Record<string, string>;
};

const DownloadLayout: FC<PropsWithChildren<DownloadLayoutProps>> = ({
  downloads,
  additional,
  children,
}) => {
  console.log(downloads, additional, children);
  return (
    <BaseLayout>
      <div className="container">
        <article dir="auto">
          <div className="download-header">
            <h1>{downloads.headline}</h1>
          </div>

          {children}

          <WithNodeRelease status={['Active LTS', 'Maintenance LTS']}>
            {({ release }) => (
              <>
                <PrimaryDownloadMatrix {...release} downloads={downloads} />
                <SecondaryDownloadMatrix {...release} additional={additional} />
              </>
            )}
          </WithNodeRelease>
        </article>
      </div>
    </BaseLayout>
  );
};

export default DownloadLayout;
