import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import Avatar from '@/components/Common/AvatarGroup/Avatar';

type Story = StoryObj<typeof Avatar>;
type Meta = MetaObj<typeof Avatar>;

export const Default: Story = {
  args: {
    id: 'ovflowd',
    name: 'ovflowd',
    image: 'https://avatars.githubusercontent.com/ovflowd',
    url: 'https://github.com/ovflowd',
  },
};

export const NoSquare: Story = {
  args: {
    image: '/static/images/logo-hexagon-card.png',
    id: 'SD',
    name: 'SD',
  },
};

export const FallBack: Story = {
  args: {
    image: 'https://avatars.githubusercontent.com/u/',
    id: 'John Doe',
    name: 'John Doe',
  },
};

export default { component: Avatar } as Meta;
