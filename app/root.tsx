import type { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { MantineProvider } from '@mantine/core';
import { json } from '@remix-run/cloudflare';
import { Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react';
import md from 'is-mobile';
import { promiseHash } from 'remix-utils/promise';
import { Document, ErrorBoundary as GeneralErrorBoundary, TheFooter, TheHeader } from '~/components';
import { useProgress } from '~/hooks';
import { getUrl } from '~/utilities';
import { http0 } from '~/utilities/.server';
import '~/assets/css/style.css';

export { headers, meta } from '~/utilities/meta';

export const loader = async ({ request: { headers, url } }: LoaderFunctionArgs) => {
  const ua = headers.get('user-agent') as string;
  const isMobile = md({ ua, tablet: true });
  const isPhone = md({ ua });
  const isTablet = isMobile && !isPhone;
  const isDesktop = !isMobile;

  const data = await promiseHash({
    svg: http0.get<string>(`${url}/images/sprite.svg`, { headers: { 'Cache-Control': 'public, max-age=3600' } }),
    primaryMenu: http0.get<iMenu>('/menus/v1/menus/primary'),
    // footer: http0.get<iMenu>('/menus/v1/menus/footer'),
    // socials: http0.get<iMenu>('/menus/v1/menus/socials'),
  });

  return json(
    {
      isMobile,
      isPhone,
      isTablet,
      isDesktop,
      svg: data.svg.data,
      menu: {
        primary: data?.primaryMenu?.data?.items?.map(({ url, title }) => ({ title, path: getUrl(url) })),
        // footer: menu?.footer?.items?.map(({ url, title }) => ({ title, path: getUrl(url) })),
        // socials: menu?.socials?.items?.map(({ url }) => ({ url })),
      },
    },
    { headers: { 'Cache-Control': 'public, max-age=300' } },
  );
};

export default function App() {
  useProgress();
  const { svg } = useLoaderData<typeof loader>();

  return (
    <Document>
      <MantineProvider>
        <div className="child:hidden" dangerouslySetInnerHTML={{ __html: svg }} />
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
