import { useMemo } from 'react';
import type { ComponentProps, FC, PropsWithChildren } from 'react';

import AboutLayout from '@/layouts/AboutLayout';
import BlogIndexLayout from '@/layouts/BlogIndexLayout';
import BlogPostLayout from '@/layouts/BlogPostLayout';
import CategoryIndexLayout from '@/layouts/CategoryIndexLayout';
import ContributeLayout from '@/layouts/ContributeLayout';
import DefaultLayout from '@/layouts/DefaultLayout';
import DocsLayout from '@/layouts/DocsLayout';
import DownloadCurrentLayout from '@/layouts/DownloadCurrentLayout';
import DownloadLayout from '@/layouts/DownloadLayout';
import IndexLayout from '@/layouts/IndexLayout';
import LearnLayout from '@/layouts/LearnLayout';
import type { LegacyFrontMatter, LegacyLayouts } from '@/types';

const layoutMap = {
  'about.hbs': AboutLayout,
  'learn.hbs': LearnLayout,
  'blog-index.hbs': BlogIndexLayout,
  'blog-post.hbs': BlogPostLayout,
  'category-index.hbs': CategoryIndexLayout,
  'contribute.hbs': ContributeLayout,
  'docs.hbs': DocsLayout,
  'download.hbs': DownloadLayout,
  'download-current.hbs': DownloadCurrentLayout,
  'index.hbs': IndexLayout,
  'page.hbs': DefaultLayout,
};

const getLegacyLayout = (layout: LegacyLayouts) => {
  return layoutMap[layout] || DefaultLayout;
};

type LayoutProps = ComponentProps<typeof BlogPostLayout> &
  ComponentProps<typeof CategoryIndexLayout> &
  ComponentProps<typeof DownloadLayout>;

type WithMDXLayoutProps = {
  frontMatter?: LegacyFrontMatter;
};

export const WithMDXLayout: FC<PropsWithChildren<WithMDXLayoutProps>> = ({
  children,
  frontMatter = {},
}) => {
  const { layout = 'page.hbs', ...props } = frontMatter;
  const Layout = useMemo(() => getLegacyLayout(layout), [layout]);

  return <Layout {...(props as LayoutProps)}>{children}</Layout>;
};
