import * as React from "react";

export const useMediaQuery = (query) => {
   const [matches, setMatches] = React.useState(false);

   React.useEffect(() => {
      const mediaQueryList = window.matchMedia(query);

      const handleChange = (event) => {
         setMatches(event.matches);
      };

      // Initial check
      setMatches(mediaQueryList.matches);

      // Listen for changes
      mediaQueryList.addEventListener("change", handleChange);

      return () => {
         mediaQueryList.removeEventListener("change", handleChange);
      };
   }, [query]);

   return matches;
};
