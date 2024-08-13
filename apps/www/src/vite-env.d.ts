/// <reference types="vite/client" />
import * as OpenDesignSystem from "../open-design-system.schema";

interface ImportMetaEnv {
  readonly VITE_GA_ID: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
