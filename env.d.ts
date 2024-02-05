/// <reference types="@remix-run/cloudflare" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_HOST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
