"use client";
import { ChevronsDown, Github, Menu } from "lucide-react";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { ToggleTheme } from "./toogle-theme";

interface RouteProps {
  href: string;
  label: string;
}

interface FeatureProps {
  title: string;
  description: string;
}

const routeList: RouteProps[] = [
  {
    href: "/explore",
    label: "Explore",
  },
  {
    href: "/success-stories",
    label: "Success Stories",
  },
  {
    href: "/about-us",
    label: "About US",
  },
  {
    href: "/universities ",
    label: "Universities ",
  },
];

const featureList: FeatureProps[] = [
  {
    title: "100% Visa Guidance",
    description: "Step-by-step personalized help from documentation to approval.",
  },
  {
    title: "Lowest MBBS Fees Abroad",
    description: "Study MBBS under ₹25 Lakhs in NMC & WHO-approved universities.",
  },
  {
    title: "Indian Support Abroad",
    description: "Dedicated caretakers, Indian food, and hostel support.",
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="shadow-inner bg-opacity-15 w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-5 mx-auto sticky border border-secondary z-40 rounded-2xl flex justify-between items-center p-2 bg-card">
      <Link href="/" className="font-bold text-lg flex items-center">
        <Image
          src="https://res.cloudinary.com/dt3j2uiyb/image/upload/v1753268940/transparent_1_akqkyt.png"
          alt="Abroad Kaka Logo"
          width={36}
          height={36}
          className="mr-2 rounded-lg"
        />
        <span className="text-transparent bg-gradient-to-r from-[#00A3D3] to-[#0077AA] bg-clip-text">
          Abroad Kaka
        </span>
      </Link>

      {/* Mobile Nav */}
      <div className="flex items-center lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Menu
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer lg:hidden"
            />
          </SheetTrigger>

          <SheetContent
            side="left"
            className="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card border-secondary"
          >
            <div>
              <SheetHeader className="mb-4 ml-4">
                <SheetTitle className="flex items-center">
                  <Link href="/" className="flex items-center">
                    <Image
                      src="https://res.cloudinary.com/dt3j2uiyb/image/upload/v1753268940/transparent_1_akqkyt.png"
                      alt="Abroad Kaka Logo"
                      width={36}
                      height={36}
                      className="mr-2 rounded-lg"
                    />
                    <span className="text-transparent bg-gradient-to-r from-[#00A3D3] to-[#0077AA] bg-clip-text">
                      Abroad Kaka
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-2">
                {routeList.map(({ href, label }) => (
                  <Button
                    key={href}
                    onClick={() => setIsOpen(false)}
                    asChild
                    variant="ghost"
                    className="justify-start text-base"
                  >
                    <Link href={href}>{label}</Link>
                  </Button>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Nav */}
      <div className="hidden lg:flex items-center gap-4">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-card text-base">
                Why Abroad Kaka?
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[300px] gap-5 p-4">
                  <ul className="flex flex-col gap-2">
                    {featureList.map(({ title, description }) => (
                      <li
                        key={title}
                        className="rounded-md p-3 text-sm hover:bg-muted"
                      >
                        <p className="mb-1 font-semibold leading-none text-foreground">
                          {title}
                        </p>
                        <p className="line-clamp-2 text-muted-foreground">
                          {description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {routeList.map(({ href, label }) => (
              <NavigationMenuItem key={href}>
                <NavigationMenuLink asChild>
                  <Link 
                    href={href} 
                    className="text-base px-3 py-2 hover:text-[#00A3D3] transition-colors"
                  >
                    {label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};