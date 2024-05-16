/// <reference types="@remix-run/cloudflare" />
/// <reference types="vite/client" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      RESEND_API_KEY: string;
      HOST: string;
    }
  }
}

export {};
