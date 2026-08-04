import path from "node:path";
import { fileURLToPath } from "node:url";

import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";

import { Brands } from "./src/collections/Brands";
import { Clients } from "./src/collections/Clients";
import { Media } from "./src/collections/Media";
import { Products } from "./src/collections/Products";
import { SuccessStories } from "./src/collections/SuccessStories";
import { Users } from "./src/collections/Users";

import { CatalogPage } from "./src/globals/CatalogPage";
import { HomePage } from "./src/globals/HomePage";
import { SiteConfig } from "./src/globals/SiteConfig";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Media, Brands, Products, Clients, SuccessStories],
  globals: [SiteConfig, HomePage, CatalogPage],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || "DEFAULT_SAVEMILE_DEV_SECRET_KEY_12345",
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || "file:./payload.db",
    },
  }),
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
