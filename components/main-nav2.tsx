"use client"

import { siteConfig } from "@/config/site"
import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import { ListItem } from "./ui/listItem"

const carcomponents: { title: string; href: string; description: string }[] = [
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
]

const boatcomponents: { title: string; href: string; description: string }[] = [
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
]

const planecomponents: { title: string; href: string; description: string }[] = [
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

export function MainNav() {
  return (
    <div className="flex gap-6 md:gap-10">
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" className="flex items-center space-x-2 pr-20">
            <Icons.logo className="h-6 w-6" />
            <span className="inline-block font-bold">{siteConfig.name}</span>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Cars</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {carcomponents.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>        
        <NavigationMenuItem>
          <NavigationMenuTrigger>Boats</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {boatcomponents.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Planes</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {planecomponents.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/brands" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              All Brands
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
    </div>
  )
}
