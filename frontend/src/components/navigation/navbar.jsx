import { routeConstants } from "@/constants/route-const";
import { useIsRouteActive } from "@/hooks/use-is-route-active";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { navigationConstants } from "@/constants/navigation-const";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { MenuItem } from "./menu-item";
import {
   Sheet,
   SheetContent,
   SheetDescription,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from "../ui/sheet";
import { Menu } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { useEffect, useState } from "react";

export const Navbar = () => {
   const location = useLocation();
   const isDesktop = useMediaQuery("(min-width: 1024px)");

   const [isOpen, setIsOpen] = useState(false);

   // We dont show the navbar in any auth page
   if (location.pathname.includes("/x/")) {
      return null;
   }

   return (
      <nav className="sticky top-0 left-0 z-20 bg-background">
         <header className="container flex items-center justify-between h-16 lg:gap-0">
            <h1 className="text-xl font-bold">Mediom</h1>

            {isDesktop && <MenuItem />}

            {!isDesktop && (
               <Sheet
                  open={isOpen}
                  onOpenChange={() => setIsOpen((prev) => !prev)}
               >
                  <SheetTrigger asChild>
                     <Button size="icon" variant="ghost" className="ml-auto">
                        <Menu />
                     </Button>
                  </SheetTrigger>

                  <SheetContent className="grid grid-rows-[auto_1fr]">
                     <SheetHeader className="sr-only">
                        <SheetTitle>Mobiule Menu</SheetTitle>
                        <SheetDescription>
                           Mobile menu description
                        </SheetDescription>
                     </SheetHeader>

                     <ScrollArea className="pt-6">
                        <MenuItem closeModal={() => setIsOpen(false)} />
                     </ScrollArea>
                  </SheetContent>
               </Sheet>
            )}
         </header>
      </nav>
   );
};
