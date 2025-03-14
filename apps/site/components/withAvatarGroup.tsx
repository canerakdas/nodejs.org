'use client';

import type { ComponentProps, FC } from 'react';

import AvatarGroup from '@/components/Common/AvatarGroup';
import type { Author } from '@/types';

type WithAvatarGroupProps = {
  authors: Array<Author>;
  size?: ComponentProps<typeof AvatarGroup>['size'];
  limit?: ComponentProps<typeof AvatarGroup>['limit'];
};

const WithAvatarGroup: FC<WithAvatarGroupProps> = ({ authors, ...props }) => (
  <AvatarGroup authors={authors} {...props} />
);

export default WithAvatarGroup;
