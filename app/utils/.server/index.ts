import type { AppLoadContext } from '@remix-run/cloudflare';
import { drizzle } from 'drizzle-orm/d1';

export { http0 } from './http0';
export { getPage, getPosts } from './fetch';

export function getDb(context: AppLoadContext) {
  return drizzle(context.cloudflare.env.DB);
}
