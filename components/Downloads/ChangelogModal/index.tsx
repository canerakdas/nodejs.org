'use client';

import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import type { FC, PropsWithChildren, ComponentProps } from 'react';

import AvatarGroup from '@/components/Common/AvatarGroup';
import Modal from '@/components/Containers/Modal';
import Link from '@/components/Link';

import styles from './index.module.css';

type ChangelogModalProps = PropsWithChildren<{
  heading: string;
  subheading: string;
  avatars: ComponentProps<typeof AvatarGroup>['avatars'];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}>;

const ChangelogModal: FC<ChangelogModalProps> = ({
  heading,
  subheading,
  avatars,
  children,
  open = false,
  onOpenChange = () => {},
}) => {
  const t = useTranslations();

  return (
    <Modal
      title={heading}
      description={subheading}
      open={open}
      onOpenChange={onOpenChange}
    >
      <div className={styles.authors}>
        <AvatarGroup avatars={avatars} isExpandable={false} />

        <Link href="/about/get-involved">
          {t('components.downloads.changelogModal.startContributing')}
          <ArrowUpRightIcon />
        </Link>
      </div>

      <div className={styles.wrapper}>{children}</div>
    </Modal>
  );
};

export default ChangelogModal;
