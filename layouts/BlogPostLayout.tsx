import type { FC, PropsWithChildren } from 'react';
import { FormattedMessage } from 'react-intl';

import { Time } from '@/components/Common/Time';

import BaseLayout from './BaseLayout';

type BlogPostLayoutProps = {
  title: string;
  author: string;
  date: string;
};

const BlogPostLayout: FC<PropsWithChildren<BlogPostLayoutProps>> = ({
  title,
  author,
  date,
  children,
}) => (
  <BaseLayout>
    <div className="container">
      <article dir="auto">
        <div className="blogpost-header">
          <h1>{title}</h1>
          <span className="blogpost-meta">
            <FormattedMessage
              id="layouts.blogPost.author.byLine"
              values={{ author: author || null }}
            />

            <Time
              date={date}
              format={{ month: 'short', day: '2-digit', year: 'numeric' }}
            />
          </span>
        </div>

        {children}
      </article>
    </div>
  </BaseLayout>
);

export default BlogPostLayout;
