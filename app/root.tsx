import { NextUIProvider } from '@nextui-org/react';
import { json, LoaderFunction } from '@remix-run/cloudflare';
import { isRouteErrorResponse, Outlet, Scripts, ScrollRestoration, useLoaderData, useNavigate, useRouteError } from '@remix-run/react';
import md from 'is-mobile';
import { promiseHash } from 'remix-utils/promise';
import { Document } from '~/components';
import { useProgress } from '~/hooks';
import { getUrl } from '~/utilities';
import { rawFetch } from '~/utilities/fetch';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';
import '~/assets/css/style.css';

export { headers } from '~/utilities/meta';

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

export function ErrorBoundary() {
  const error = useRouteError();

  // Log the error to the console
  console.error(error);

  if (isRouteErrorResponse(error)) {
    const title = `${error.status} ${error.statusText}`;
    let message;
    switch (error.status) {
      case 401:
        message = 'Oops! Looks like you tried to visit a page that you do not have access to.';
        break;
      case 404:
        message = 'Oops! Looks like you tried to visit a page that does not exist.';
        break;
      default:
        message = JSON.stringify(error.data, null, 2);
        break;
    }

    return (
      <Document title={title}>
        <div className="container prose flex h-screen min-w-full items-center justify-center">
          <div>
            <h1>{title}</h1>
            <p>{message}</p>
          </div>
        </div>
      </Document>
    );
  } else if (error instanceof Error) {
    return (
      <Document title="Error">
        <div className="container prose flex h-screen min-w-full items-center justify-center">
          <div>
            <h1>Error</h1>
            <p>{error.message}</p>
            <p>The stack trace is:</p>
            <pre>{error.stack}</pre>
          </div>
        </div>
      </Document>
    );
  } else {
    return (
      <Document title="Unknown Error">
        <h1>Unknown Error</h1>
      </Document>
    );
  }
}
