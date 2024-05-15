import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import Keyboard from '@/components/Common/Keyboard';

type Story = StoryObj<typeof Keyboard>;
type Meta = MetaObj<typeof Keyboard>;

export const Default: Story = {
  args: {
    value: '⌘ + K',
  },
};

export const Neutral: Story = {
  args: {
    value: '⌘ + K',
    kind: 'neutral',
    label: 'Open search',
  },
};

export default { component: Keyboard } as Meta;
