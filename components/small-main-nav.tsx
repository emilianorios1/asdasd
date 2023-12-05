import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import * as React from "react"
import Link from "next/link"
import { NavItem } from "@/interfaces/nav"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

interface MainNavProps {
    items?: NavItem[]
  }

export function SmallNav({ items }: MainNavProps) {

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Menu</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
        <SheetClose asChild>
            <Link href="/" className="flex items-center space-x-2">
                <Icons.logo className="h-6 w-6" />
                <span className="inline-block font-bold">{siteConfig.name}</span>
            </Link>
            </SheetClose>
        </SheetHeader>
                {items?.length ? (
                    <nav className="flex flex-col">
                        {items?.map(
                        (item, index) =>
                            item.href && (
                            <SheetClose key={index} asChild>
                                <Link 
                                    key={index}
                                    href={item.href}
                                    className={cn(
                                    "text-center px-4 py-2 m-2 border-solid border-2 border-white-500 rounded-md text-white-700",
                                    item.disabled && "cursor-not-allowed opacity-80"
                                    )}
                                >
                                    {item.title}
                                </Link>
                            </SheetClose>
                            )
                        )}
                    </nav>
                ) : null}
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
