import { useLocation } from "react-router-dom";

export const useIsRouteActive = () => {
   const location = useLocation();

   const isRouteActive = (path, matchSubroute = false) => {
      if (matchSubroute) {
         return location.pathname.startsWith(path);
      }
      return location.pathname === path;
   };

   return isRouteActive;
};
