import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import Link from 'next/link';
import type { ComponentProps, FC, PropsWithChildren } from 'react';
import styles from './index.module.scss';
import { component } from '@/types/component';
import classNames from 'classnames';

type BadgeProps = {
  kind?: component;
  badgeText?: string;
} & ComponentProps<typeof Link>;

const Badge: FC<PropsWithChildren<BadgeProps>> = ({
  kind,
  badgeText,
  children,
  ...args
}) => {
  if (typeof kind === 'undefined') kind = component.Default;
  const badgeClasses = classNames(styles.badge, {
    [styles.badgeWarning]: kind === component.Warning,
    [styles.badgeError]: kind === component.Error,
    [styles.badgeGreen]: kind === component.Default,
  });

  return (
    <Link {...args}>
      <div className={badgeClasses}>
        {badgeText && <span className={styles.badgeText}>{badgeText}</span>}
        <span className={styles.badgeMessage}>{children}</span>
        <ArrowRightIcon className={styles.badgeIcon} />
      </div>
    </Link>
  );
};

export default Badge;
