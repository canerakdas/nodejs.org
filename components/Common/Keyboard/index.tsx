import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  ArrowUturnRightIcon,
} from '@heroicons/react/24/solid';
import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';

import styles from './index.module.css';

type KeyboardProps = {
  label?: string;
  value: string;
  className?: string;
  kind?: 'ghost' | 'neutral';
};

const Keyboard: FC<PropsWithChildren<KeyboardProps>> = ({
  label = '',
  value,
  className,
  kind = 'ghost',
}) => {
  const shortcutMap = {
    'up-down': (
      <>
        <ArrowUpIcon /> <ArrowDownIcon />
      </>
    ),
    'left-right': (
      <>
        <ArrowLeftIcon /> <ArrowRightIcon />
      </>
    ),
    enter: <ArrowUturnRightIcon className="-scale-100" />,
  };

  const Content = shortcutMap[value as keyof typeof shortcutMap] || value;

  return (
    <kbd title={value} className={classNames(styles.container, className)}>
      <div className={styles[kind]}>{Content}</div>
      {label && <span className={styles.label}>{label}</span>}
    </kbd>
  );
};

export default Keyboard;
