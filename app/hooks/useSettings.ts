import { useRouteLoaderData } from '@remix-run/react';

export const useSettings = () => useRouteLoaderData<iSettings>('root');
