import type { GlobalConfig } from "payload";
import { revalidateGlobal } from "../hooks/revalidate";

export const CatalogPage: GlobalConfig = {
  slug: "catalog-page",
  hooks: {
    afterChange: [revalidateGlobal("/solusi/ban")],
  },
  fields: [
    {
      name: "title",
      type: "text",
      defaultValue: "Ban Truk & Kendaraan Niaga",
    },
    {
      name: "heroMedia",
      type: "relationship",
      relationTo: "media",
      label: "Hero Media (Image or Video)",
    },
    {
      name: "whatsappMessage",
      type: "textarea",
      label: "WhatsApp CTA Message Template",
      defaultValue: "Halo SaveMile, saya ingin bertanya mengenai katalog ban.",
    },
    {
      name: "infoStripTitle",
      type: "text",
      label: "Info Strip Title",
      defaultValue: "Belanja ban dengan tenang",
    },
    {
      name: "infoStripTitleHighlight",
      type: "text",
      label: "Info Strip Title Highlight Phrases (comma separated)",
      defaultValue: "tenang",
    },
    {
      name: "infoStripItems",
      type: "array",
      label: "Info Strip Cards",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "sub",
          type: "textarea",
          label: "Body",
          required: true,
        },
        {
          name: "icon",
          type: "select",
          options: [
            { label: "Certificate", value: "certificate" },
            { label: "Delivery", value: "delivery" },
            { label: "Guarantee", value: "guarantee" },
            { label: "Headset", value: "headset" },
          ],
          defaultValue: "certificate",
        },
      ],
    },
  ],
};
