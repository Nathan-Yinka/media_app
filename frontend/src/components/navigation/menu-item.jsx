import PropTypes from "prop-types";
import { run_nav } from "@/constants/navigation-const";
import { useIsRouteActive } from "@/hooks/use-is-route-active";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { routeConstants } from "@/constants/route-const";
import { isAdmin } from "@/helpers/auth";

export const MenuItem = ({ closeModal }) => {
   const location = useLocation();
   const isRouteActive = useIsRouteActive();
   const navigationConstants = run_nav();

   return (
      <div className={`flex items-center justify-between w-full gap-1 max-lg:flex-col lg:ml-auto ${isAdmin()?'lg:max-w-3xl':"lg:max-w-2xl"}`}>
         <ul className="flex items-center gap-y-4 max-lg:w-full max-lg:flex-col">
            {navigationConstants.menu
               .filter((item) => !item.btn)
               .map((item, index) => {
                  return (
                     <Link
                        key={index}
                        to={item.href}
                        className="w-full"
                        onClick={() => closeModal && closeModal()}
                     >
                        <Button
                           variant="link"
                           className={cn(
                              "w-full max-lg:justify-start text-foreground hover:text-primary",
                              {
                                 "font-semibold text-primary": isRouteActive(
                                    item.href,
                                    true
                                 ),
                              }
                           )}
                        >
                           {item.label}
                        </Button>
                     </Link>
                  );
               })}
         </ul>

         {/* Buttons Loop */}
         <ul className="flex items-center max-lg:flex-wrap max-lg:mt-4 gap-y-4 gap-x-2 max-lg:w-full">
            {navigationConstants.menu
               .filter((item) => item.btn)
               .map((item, index) => {
                  const isLogin = item.href === routeConstants.login;

                  return (
                     <Link
                        key={index}
                        to={item.href}
                        className="max-[400px]:w-full max-lg:flex-1"
                     >
                        <Button
                           variant={isLogin ? "outline" : "default"}
                           className={cn(
                              "w-full px-10 py-4 text-foreground font-semibold rounded-full",
                              {
                                 "text-primary-foreground": !isLogin,
                                 "font-semibold": isRouteActive(
                                    item.href,
                                    true
                                 ),
                              }
                           )}
                        >
                           {item.label}
                        </Button>
                     </Link>
                  );
               })}
         </ul>
      </div>
   );
};

MenuItem.propTypes = {
   closeModal: PropTypes.func,
};
