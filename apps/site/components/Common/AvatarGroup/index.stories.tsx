import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import AvatarGroup from '@/components/Common/AvatarGroup';

type Story = StoryObj<typeof AvatarGroup>;
type Meta = MetaObj<typeof AvatarGroup>;

const authors = [
  {
    id: 'flaviocopes',
    name: 'flaviocopes',
    image: 'https://avatars.githubusercontent.com/flaviocopes',
    url: 'https://github.com/flaviocopes',
  },
  {
    id: 'ZYSzys',
    name: 'ZYSzys',
    image: 'https://avatars.githubusercontent.com/ZYSzys',
    url: 'https://github.com/ZYSzys',
  },
  {
    id: 'MylesBorins',
    name: 'MylesBorins',
    image: 'https://avatars.githubusercontent.com/MylesBorins',
    url: 'https://github.com/MylesBorins',
  },
  {
    id: 'fhemberger',
    name: 'fhemberger',
    image: 'https://avatars.githubusercontent.com/fhemberger',
    url: 'https://github.com/fhemberger',
  },
  {
    id: 'ovflowd',
    name: 'ovflowd',
    image: 'https://avatars.githubusercontent.com/ovflowd',
    url: 'https://github.com/ovflowd',
  },
];

const unknownAvatar = {
  id: 'unknown-avatar',
  name: 'unknown-avatar',
  image: 'https://avatars.githubusercontent.com/u/',
  url: '',
};

const defaultProps = {
  authors: [unknownAvatar, ...authors],
};

export const Default: Story = {
  args: { ...defaultProps },
};

export const WithCustomLimit: Story = {
  args: {
    ...defaultProps,
    limit: 5,
  },
};

export const InSmallContainer: Story = {
  decorators: [
    Story => (
      <div className="w-[150px]">
        <Story />
      </div>
    ),
  ],
  args: { ...defaultProps, limit: 5 },
};

export default { component: AvatarGroup } as Meta;
