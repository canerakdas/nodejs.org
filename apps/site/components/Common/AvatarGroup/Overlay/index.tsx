import { ArrowUpRightIcon } from '@heroicons/react/24/solid';
import type { FC } from 'react';

import Avatar from '@/components/Common/AvatarGroup/Avatar';
import Link from '@/components/Link';
import type { Author } from '@/types';

import styles from './index.module.css';

export type AvatarOverlayProps = Author;

const AvatarOverlay: FC<AvatarOverlayProps> = ({ id, image, name, url }) => (
  <Link className={styles.overlay} href={url} target="_blank">
    <Avatar image={image} name={name} id={id} size="medium" />
    <div className={styles.user}>
      <div className={styles.name}>{name}</div>
      <span>{id}</span>
    </div>
    <ArrowUpRightIcon className={styles.arrow} />
  </Link>
);

export default AvatarOverlay;
