'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import * as Dialog from '@radix-ui/react-dialog';
import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';

import styles from './index.module.css';

type ModalProps = PropsWithChildren<{
  title?: string;
  description?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  size?: 'medium' | 'large';
  closeTrigger?: boolean;
}>;

const Modal: FC<ModalProps> = ({
  title,
  description,
  children,
  open = false,
  size = 'large',
  closeTrigger = true,
  onOpenChange = () => {},
}) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay className={styles.overlay}>
        {closeTrigger && (
          <Dialog.Trigger className={styles.close}>
            <XMarkIcon />
          </Dialog.Trigger>
        )}

        <Dialog.Content
          className={classNames(styles.content, `${styles[size]}`)}
        >
          {title && (
            <Dialog.Title className={styles.title}>{title}</Dialog.Title>
          )}

          {description && (
            <Dialog.Description className={styles.description}>
              {description}
            </Dialog.Description>
          )}

          {children}
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  </Dialog.Root>
);

export default Modal;
