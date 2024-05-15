import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import Modal from '@/components/Containers/Modal';

type Story = StoryObj<typeof Modal>;
type Meta = MetaObj<typeof Modal>;

export const Default: Story = {
  args: {
    title: 'Node.js v20.13.1',
    description: '2024-05-09, Version 20.13.1 (LTS)',
    children: <p>Content</p>,
    open: true,
    closeTrigger: true,
  },
};

export const MediumSize: Story = {
  args: {
    children: (
      <main className="p-10">
        <p>This is a security release.</p>
        <h3>Notable Changes</h3>
        <ul>
          <li>
            CVE-2024-27980 - Command injection via args parameter of{' '}
            <code>child_process.spawn</code> without shell option enabled on
            Windows
          </li>
        </ul>
      </main>
    ),
    open: true,
    closeTrigger: false,
    size: 'medium',
  },
};

export default { component: Modal } as Meta;
