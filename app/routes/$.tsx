export { ErrorBoundary } from '~/components';

export const loader = () => {
  throw new Response('Not found', { status: 404 });
};
