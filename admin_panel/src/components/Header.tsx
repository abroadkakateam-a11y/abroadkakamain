"use client";
import { LogOutIcon, Menu } from "lucide-react";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUser } from "@/store/slices/userSlice";
import { UserState } from "@/types/userstate";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
    href: "/AddCollege",
    label: "Add University",
  },
  {
    href: "/AddCountry",
    label: "Add Country",
  },
  {
    href: "ShowQuery",
    label: "Show Query",
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const user = useSelector((state: { user: UserState }) => state.user);
  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(logout());
    localStorage.removeItem("refreshToken");
    setIsOpen(false);
  }
  return (
    <header className="shadow-xl  bg-opacity-15 w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-5 mx-auto sticky border border-secondary z-40 rounded-2xl flex justify-between items-center p-2 bg-card">
      <Link href="/" className="font-bold text-lg flex items-center">
        <Image
          src="https://res.cloudinary.com/dt3j2uiyb/image/upload/v1753268940/transparent_1_akqkyt.png"
          alt="Abroad Kaka Logo"
          width={36}
          height={36}
          className="mr-2 rounded-lg"
        />
        <span className="text-transparent bg-gradient-to-r from-[#00A3D3] to-[#0077AA] bg-clip-text">
          Abroad Kaka Admin Panel
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
                      Abroad Kaka Admin Panel
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
                {user.isAuthenticated && (
                  <AlertDialog>
                    <AlertDialogTrigger className="flex text-red-600 text-md mx-2">
                      Logout
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure you want to logout ?
                        </AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleLogout}
                          className=" flex bg-red-600 text-md"
                        >
                          Logout
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </div>

            <SheetFooter className="flex-col sm:flex-col justify-start items-start">
              <Separator className="mb-2" />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Nav */}
      <NavigationMenu className="hidden lg:block mx-auto">
        <NavigationMenuList>
          {routeList.map(({ href, label }) => (
            <NavigationMenuItem key={href}>
              <NavigationMenuLink asChild>
                <Link href={href} className="text-base px-3">
                  {label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
          <NavigationMenuItem></NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      {user.isAuthenticated && (
        <AlertDialog>
          <AlertDialogTrigger className="hidden lg:flex text-red-600 text-md mx-2">
            Logout
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you absolutely sure you want to logout ?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleLogout}
                className=" flex bg-red-600 text-md"
              >
                Logout
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      {/* Right-side (desktop) */}
      <div className="hidden lg:flex gap-1 items-center"></div>
    </header>
  );
};
