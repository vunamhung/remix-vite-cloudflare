import { defineConfig } from 'drizzle-kit';

const config = process.env.LOCAL_DB_PATH
  ? defineConfig({
      dialect: 'sqlite',
      schema: './app/drizzle/schema.ts',
      out: './app/drizzle/migrations',
      dbCredentials: {
        url: process.env.LOCAL_DB_PATH,
      },
    })
  : defineConfig({
      dialect: 'sqlite',
      driver: 'd1',
      schema: './app/drizzle/schema.ts',
      out: './app/drizzle/migrations',
      dbCredentials: {
        wranglerConfigPath: new URL('wrangler.toml', import.meta.url).pathname,
        dbName: 'db',
      },
    });

export default config;
