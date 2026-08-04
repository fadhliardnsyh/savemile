import { RootLayout, handleServerFunctions } from "@payloadcms/next/layouts";
import configPromise from "@payload-config";
import "@payloadcms/next/css";
import type React from "react";
import { importMap } from "./admin/importMap";

type Args = {
  children: React.ReactNode;
};

export default async function Layout({ children }: Args) {
  return (
    <RootLayout
      config={configPromise}
      importMap={importMap}
      serverFunction={async (args) => {
        "use server";
        return handleServerFunctions({
          ...args,
          config: configPromise,
          importMap,
        });
      }}
    >
      {children}
    </RootLayout>
  );
}
