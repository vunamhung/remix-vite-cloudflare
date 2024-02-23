import type { ReactNode } from 'react';
import { Partytown } from '@builder.io/partytown/react';
import { Links, Meta } from '@remix-run/react';

export function Document({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/images/favicon.ico" />
        <Partytown debug={true} forward={['dataLayer.push']} />
        <Meta />
        <Links />
      </head>
      <body>{children}</body>
    </html>
  );
}
