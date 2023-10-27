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
      title: "Publications",
      href: "/publish",
    },
    {
      title: "Brands",
      href: "/brands",
    },
    {
      title: "Models",
      href: "/models",
    },
    {
      title: "My Cars",
      href: "/my-cars",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}
