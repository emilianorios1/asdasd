export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Marketplace TP",
  description: "Desarrollo de Software - UTN FRRO",
  mainNav: [
    {
      title: "Home",
      href: "/",
      adminReq: false,
    },
    {
      title: "Brands",
      href: "/brands",
      adminReq: true,
    },
    {
      title: "Car Models",
      href: "/car-models",
      adminReq: true,
    },
    {
      title: "Car Publications",
      href: "/car-publications",
      adminReq: false,
    },
    {
      title: "Boat Models",
      href: "/boat-models",
      adminReq: true,
    },
    {
      title: "Boat Publications",
      href: "/boat-publications",
      adminReq: false,
    },
    {
      title: "Plane Models",
      href: "/plane-models",
      adminReq: true,
    },
    {
      title: "Plane Publications",
      href: "/plane-publications",
      adminReq: false,
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com/",
  },
}
