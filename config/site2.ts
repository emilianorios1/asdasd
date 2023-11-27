export type Components = typeof components

export const components: { title: string; href: string; description: string }[] = [
  {
    title: "Home",
    href: "/",    
    description:
      "Main Page",
  },
  {
    title: "All Brands",
    href: "/brands",    
    description:
      "List regustered brands",
  },
  {
    title: "Car Models",
    href: "/car-models",    
    description:
      "List of vehicle models",
  },
  {
    title: "Car Publications",
    href: "/car-publications",    
    description:
      "List of publicated vehicles",
  },
  {
    title: "Boat Models",
    href: "/boat-models",    
    description:
      "List of boat models",
  },
  {
    title: "Boat Publications",
    href: "/boat-publications",    
    description:
      "List of publicated boats",
  },
  {
    title: "Plane Models",
    href: "/plane-models",    
    description:
      "List of plane models",
  },
  {
    title: "Plane Publications",
    href: "/plane-publications",    
    description:
      "List of publicated airplanes",
  },
]
