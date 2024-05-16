import type { ClassValue } from 'clsx';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { env } from '~/utilities/contants';

export { globalState } from './globalState';

export const isDev = import.meta.env.DEV;
export const isProd = import.meta.env.PROD;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function trailingSlash(text: string) {
  return text.replace(/^\/|\/$/g, '');
}

export const getUrl = (url: string, locale = 'en') => {
  if (url?.includes('wp-content/uploads')) {
    return url;
  } else if (url?.startsWith(env.HOST)) {
    if (locale === 'en') return '/' + trailingSlash(url.replace(env.HOST, ''));
    return `/${locale}/${trailingSlash(url.replace(env.HOST, ''))}`;
  } else if (url?.startsWith('http')) {
    return url;
  }

  return locale === 'en' ? url : `/${locale}/${url}`;
};
