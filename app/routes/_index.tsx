import { useLoaderData } from '@remix-run/react';
import { Accessibility } from '~/icons';
import { getPage } from '~/utils/.server';

export const loader = async () => await getPage('home');

export { headers, meta } from '~/utils/meta';

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="container flex h-screen items-center justify-center">
      <h1 className="text-blue-500">
        Welcome to Remix <Accessibility />
      </h1>
    </div>
  );
}
