import type { GlobalConfig } from "payload";
import { revalidateGlobal } from "../hooks/revalidate";

export const ContactPage: GlobalConfig = {
  slug: "contact-page",
  hooks: {
    afterChange: [revalidateGlobal("/company/contact")],
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Page Title (SEO)",
      defaultValue: "Hubungi Kami",
    },
    {
      name: "heroTitle",
      type: "text",
      label: "Hero Title",
      defaultValue: "Kami siap memberikan layanan terbaik untuk Anda",
    },
    {
      name: "heroDescription",
      type: "textarea",
      label: "Hero Description",
      defaultValue:
        "Pilih kontak yang sesuai dengan kebutuhan Anda, dan kami akan dengan senang hati menghubungi Anda.",
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
      label: "WhatsApp Message Template",
      defaultValue:
        "Halo SaveMile, saya ingin berkonsultasi mengenai layanan dan produk ban.",
    },
    {
      name: "helpTitle",
      type: "text",
      label: "Help Section Title",
      defaultValue: "Bagaimana kami dapat membantu Anda?",
    },
    {
      name: "helpBody",
      type: "textarea",
      label: "Help Section Description",
      defaultValue:
        "Pilih kontak yang sesuai dengan kebutuhan Anda, dan kami akan dengan senang hati menghubungi Anda.",
    },
    {
      name: "helpOptions",
      type: "array",
      label: "Help Option Cards",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "tag",
          type: "text",
          required: true,
        },
        {
          name: "desc",
          type: "textarea",
          required: true,
        },
        {
          name: "icon",
          type: "select",
          options: [
            { label: "WhatsApp", value: "whatsapp" },
            { label: "Users", value: "users" },
            { label: "Mail", value: "mail" },
            { label: "Phone", value: "phone" },
          ],
          defaultValue: "whatsapp",
        },
        {
          name: "actionLabel",
          type: "text",
          required: true,
        },
        {
          name: "href",
          type: "text",
          required: true,
        },
        {
          name: "external",
          type: "checkbox",
          defaultValue: false,
        },
      ],
    },
    {
      name: "infoItems",
      type: "array",
      label: "Contact Info Items",
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "value",
          type: "text",
          required: true,
        },
        {
          name: "icon",
          type: "select",
          options: [
            { label: "Pin", value: "pin" },
            { label: "Mail", value: "mail" },
            { label: "Phone", value: "phone" },
          ],
          defaultValue: "pin",
        },
        {
          name: "href",
          type: "text",
        },
      ],
    },
  ],
};
