import type { Params } from 'react-router-dom';
import type { ClassValue } from 'clsx';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export * from './globalState';

export const isDev = process.env.NODE_ENV === 'development';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function trailingSlash(text: string) {
  return text.replace(/^\/|\/$/g, '');
}

export function getParams(params: Params) {
  return params['*']?.split('/') as string[];
}

export const getUrl = (url: string, locale = 'en') => {
  if (url?.includes('wp-content/uploads')) {
    return url;
  } else if (url?.startsWith(import.meta.env.VITE_HOST)) {
    if (locale === 'en') return '/' + trailingSlash(url.replace(import.meta.env.VITE_HOST, ''));
    return `/${locale}/${trailingSlash(url.replace(import.meta.env.VITE_HOST, ''))}`;
  } else if (url?.startsWith('http')) {
    return url;
  }

  return locale === 'en' ? url : `/${locale}/${url}`;
};
