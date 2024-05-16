import { useRouteLoaderData } from '@remix-run/react';

export function useSettings() {
  return useRouteLoaderData('root') as iSettings;
}
