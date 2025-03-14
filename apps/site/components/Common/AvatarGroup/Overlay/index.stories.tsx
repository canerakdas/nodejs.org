import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import AvatarOverlay from '@/components/Common/AvatarGroup/Overlay';

type Story = StoryObj<typeof AvatarOverlay>;
type Meta = MetaObj<typeof AvatarOverlay>;

export const Default: Story = {
  args: {
    image: 'https://avatars.githubusercontent.com/u/1',
    name: 'John Doe',
    id: 'JD',
  },
};

export default { component: AvatarOverlay } as Meta;
