import type { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { useRef } from 'react';
import { useLoaderData } from '@remix-run/react';
import { PrefetchPageAnchors, useDelegatedAnchors } from 'remix-utils/use-delegated-anchors';
import { useRevalidateOnFocus } from '~/hooks';
import { getPage } from '~/utilities/.server';

export { headers, meta } from '~/utilities/meta';
export const loader = async ({ params: { slug } }: LoaderFunctionArgs) => await getPage(slug);

export default function Page() {
  const data = useLoaderData<typeof loader>();
  const ref = useRef<HTMLDivElement>(null);
  useDelegatedAnchors(ref);

  useRevalidateOnFocus();

  return (
    <PrefetchPageAnchors>
      <div ref={ref} className="container flex h-screen items-center justify-center">
        <h1 className="text-blue-500">{data?.title}</h1>
      </div>
    </PrefetchPageAnchors>
  );
}
