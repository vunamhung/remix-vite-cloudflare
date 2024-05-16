import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/cloudflare';
import { MantineProvider } from '@mantine/core';
import { json } from '@remix-run/cloudflare';
import { Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import md from 'is-mobile';
import { promiseHash } from 'remix-utils/promise';
import { Document, ErrorBoundary as GeneralErrorBoundary, TheFooter, TheHeader } from '~/components';
import { useProgress } from '~/hooks';
import { getUrl } from '~/utilities';
import { http0 } from '~/utilities/.server';
import '~/assets/css/style.css';

export { headers, meta } from '~/utilities/meta';

export const links: LinksFunction = () => [{ rel: 'preload', href: '/icons/sprite.svg', as: 'image', type: 'image/svg+xml' }];

export const loader = async ({ request: { headers } }: LoaderFunctionArgs) => {
  const ua = headers.get('user-agent') as string;
  const isMobile = md({ ua, tablet: true });
  const isPhone = md({ ua });
  const isTablet = isMobile && !isPhone;
  const isDesktop = !isMobile;

  const menu = await promiseHash({
    primary: http0.get<iMenu>('/menus/v1/menus/primary'),
    // footer: http0.get('/menus/v1/menus/footer'),
    // socials: http0.get('/menus/v1/menus/socials'),
  });

  return json(
    {
      isMobile,
      isPhone,
      isTablet,
      isDesktop,
      menu: {
        primary: menu?.primary?.data?.items?.map(({ url, title }) => ({ title, path: getUrl(url) })),
        // footer: menu?.footer?.items?.map(({ url, title }) => ({ title, path: getUrl(url) })),
        // socials: menu?.socials?.items?.map(({ url }) => ({ url })),
      },
    },
    { headers: { 'Cache-Control': 'public, max-age=300' } },
  );
};

export default function App() {
  useProgress();

  return (
    <Document>
      <MantineProvider>
        <TheHeader />
        <Outlet />
        <TheFooter />
      </MantineProvider>
      <ScrollRestoration />
      <Scripts />
    </Document>
  );
}

export const ErrorBoundary = () => (
  <Document>
    <GeneralErrorBoundary />
  </Document>
);
