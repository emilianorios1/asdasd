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
      title: "Categories",
      href: "/categories",
    },
    {
      title: "Publicaciones",
      href: "/publish",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}
