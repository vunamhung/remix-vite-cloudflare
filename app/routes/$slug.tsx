import type { LoaderFunction } from '@remix-run/cloudflare';
import { useRef } from 'react';
import { useLoaderData } from '@remix-run/react';
import { PrefetchPageAnchors, useDelegatedAnchors } from 'remix-utils/use-delegated-anchors';
import { Wrapper } from '~/components';
import { useRevalidateOnFocus } from '~/hooks';
import { getPage } from '~/utilities/fetch';

export { headers, meta } from '~/utilities/meta';
export const loader: LoaderFunction = async ({ params: { slug } }) => await getPage(slug);

export default function Page() {
  const data = useLoaderData<iPage>();
  let ref = useRef<HTMLDivElement>(null);
  useDelegatedAnchors(ref);

  useRevalidateOnFocus();

  return (
    <Wrapper>
      <PrefetchPageAnchors>
        <div ref={ref} className="container flex h-screen items-center justify-center">
          <h1 className="text-blue-500">{data?.title}</h1>
        </div>
      </PrefetchPageAnchors>
    </Wrapper>
  );
}
