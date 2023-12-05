export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Marketplace TP",
  description: "Desarrollo de Software - UTN FRRO",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Brands",
      href: "/brands",
    },
    {
      title: "Car Models",
      href: "/car-models",
    },
    {
      title: "Car Publications",
      href: "/car-publications",
    },
    {
      title: "Boat Models",
      href: "/boat-models",
    },
    {
      title: "Boat Publications",
      href: "/boat-publications",
    },
    {
      title: "Plane Models",
      href: "/plane-models",
    },
    {
      title: "Plane Publications",
      href: "/plane-publications",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com/",
  },
}
