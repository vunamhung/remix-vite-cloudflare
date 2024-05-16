import { MantineProvider } from '@mantine/core';
import { json, LoaderFunction } from '@remix-run/cloudflare';
import { Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react';
import md from 'is-mobile';
import { promiseHash } from 'remix-utils/promise';
import { Document, ErrorBoundary as GeneralErrorBoundary } from '~/components';
import { useProgress } from '~/hooks';
import { getUrl } from '~/utilities';
import { http0 } from '~/utilities/.server';
import '~/assets/css/style.css';

export { headers, meta } from '~/utilities/meta';

export const loader: LoaderFunction = async ({ request: { headers } }) => {
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
  const settings = useLoaderData<iSettings>();

  return (
    <Document>
      <MantineProvider>
        <Outlet context={settings} />
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
