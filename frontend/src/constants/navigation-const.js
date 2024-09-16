import { routeConstants } from "./route-const";

export const navigationConstants = {
   menu: [
      {
         label: "All Blogs",
         href: routeConstants.home,
      },

      {
         label: "My Blogs",
         href: routeConstants.myBlogs,
      },
      {
         label: "In Review",
         href: routeConstants.inReview,
      },
      {
         label: "Flagged",
         href: routeConstants.flagged,
      },
      {
         label: "Login",
         href: routeConstants.login,
         btn: true,
      },
      {
         label: "Sign Up",
         href: routeConstants.signup,
         btn: true,
      },
   ],
};
