import path from "node:path";
import { fileURLToPath } from "node:url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";

import { gcsStorage } from "@payloadcms/storage-gcs";

import { Brands } from "./src/collections/Brands";
import { Clients } from "./src/collections/Clients";
import { FeatureTypes } from "./src/collections/FeatureTypes";
import { Jobs } from "./src/collections/Jobs";
import { Media } from "./src/collections/Media";
import { Products } from "./src/collections/Products";
import { SuccessStories } from "./src/collections/SuccessStories";
import { TerrainTypes } from "./src/collections/TerrainTypes";
import { TireTypes } from "./src/collections/TireTypes";
import { Users } from "./src/collections/Users";
import { VehicleTypes } from "./src/collections/VehicleTypes";

import { AboutPage } from "./src/globals/AboutPage";
import { CareerPage } from "./src/globals/CareerPage";
import { CatalogPage } from "./src/globals/CatalogPage";
import { ContactPage } from "./src/globals/ContactPage";
import { HomePage } from "./src/globals/HomePage";
import { SiteConfig } from "./src/globals/SiteConfig";
import { SuccessStoryPage } from "./src/globals/SuccessStoryPage";
import { TmsPage } from "./src/globals/TmsPage";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    Media,
    Brands,
    TireTypes,
    VehicleTypes,
    TerrainTypes,
    FeatureTypes,
    Products,
    Clients,
    SuccessStories,
    Jobs,
  ],
  globals: [
    SiteConfig,
    HomePage,
    CatalogPage,
    TmsPage,
    AboutPage,
    CareerPage,
    ContactPage,
    SuccessStoryPage,
  ],
  editor: lexicalEditor({}),
  plugins: [
    ...(process.env.GCS_BUCKET
      ? [
          gcsStorage({
            collections: {
              media: true,
            },
            bucket: process.env.GCS_BUCKET,
            options: {
              projectId: process.env.GCS_PROJECT_ID,
              ...(process.env.GCS_KEY_FILE
                ? { keyFilename: process.env.GCS_KEY_FILE }
                : process.env.GCS_CLIENT_EMAIL && process.env.GCS_PRIVATE_KEY
                  ? {
                      credentials: {
                        client_email: process.env.GCS_CLIENT_EMAIL,
                        private_key: process.env.GCS_PRIVATE_KEY.replace(
                          /\\n/g,
                          "\n",
                        ),
                      },
                    }
                  : {}),
            },
          }),
        ]
      : []),
  ],
  secret: process.env.PAYLOAD_SECRET || "DEFAULT_SAVEMILE_DEV_SECRET_KEY_12345",
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || process.env.DATABASE_URL,
      ssl:
        (process.env.DATABASE_URI || process.env.DATABASE_URL)?.includes(
          "supabase",
        ) ||
        (process.env.DATABASE_URI || process.env.DATABASE_URL)?.includes(
          "postgres",
        )
          ? { rejectUnauthorized: false }
          : false,
    },
  }),
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
