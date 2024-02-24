import { NextUIProvider } from '@nextui-org/react';
import { json, LoaderFunction } from '@remix-run/cloudflare';
import { Outlet, Scripts, ScrollRestoration, useLoaderData, useNavigate } from '@remix-run/react';
import md from 'is-mobile';
import { promiseHash } from 'remix-utils/promise';
import { Document, ErrorBoundary as GeneralErrorBoundary } from '~/components';
import { useProgress } from '~/hooks';
import { getUrl } from '~/utilities';
import { rawFetch } from '~/utilities/fetch';
import '~/assets/css/style.css';

export { headers, meta } from '~/utilities/meta';

export const loader: LoaderFunction = async ({ request: { headers } }) => {
  const ua = headers.get('user-agent') as string;
  const isMobile = md({ ua, tablet: true });
  const isPhone = md({ ua });
  const isTablet = isMobile && !isPhone;
  const isDesktop = !isMobile;

  const menu = await promiseHash({
    primary: rawFetch('/menus/v1/menus/primary'),
    footer: rawFetch('/menus/v1/menus/footer'),
    socials: rawFetch('/menus/v1/menus/socials'),
  });

  return json(
    {
      isMobile,
      isPhone,
      isTablet,
      isDesktop,
      menu: {
        // @ts-ignore
        primary: menu?.primary?.items?.map(({ url, title }) => ({ title, path: getUrl(url) })),
        // @ts-ignore
        footer: menu?.footer?.items?.map(({ url, title }) => ({ title, path: getUrl(url) })),
        // @ts-ignore
        socials: menu?.socials?.items?.map(({ url }) => ({ url })),
      },
    },
    { headers: { 'Cache-Control': 'public, max-age=300' } },
  );
};

export default function App() {
  useProgress();
  const navigate = useNavigate();
  const settings = useLoaderData<iSettings>();

  return (
    <Document>
      <NextUIProvider navigate={navigate}>
        <Outlet context={settings} />
      </NextUIProvider>
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
