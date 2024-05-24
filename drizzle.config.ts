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
      driver: 'd1-http',
      schema: './app/drizzle/schema.ts',
      out: './app/drizzle/migrations',
      dbCredentials: {
        accountId: process.env.CF_ACCOUNT_ID as string,
        databaseId: process.env.CF_D1_ID as string,
        token: process.env.CF_TOKEN as string,
      },
    });

export default config;
