import provideUserData from '@/next-data/providers/userData';
import { defaultLocale } from '@/next.locales.mjs';

// This function generates the static paths that come from the dynamic segments
// `[locale]/next-data/release-data/` and returns an array of all available static paths
// This is used for ISR static validation and generation
export const generateStaticParams = async () => [
  { locale: defaultLocale.code },
];

// Uses static user data for responses
export const GET = async () => {
  const data = await provideUserData();

  return Response.json(data, { status: 200 });
};

// Enforces that this route is used as static rendering
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = 'force-static';

export const revalidate = false;
