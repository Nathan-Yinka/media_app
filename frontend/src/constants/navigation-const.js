import { getUserName, isAdmin, isLoggedIn } from "@/helpers/auth";
import { routeConstants } from "./route-const";


let all_route = [
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
      label: isLoggedIn()?"Logout":"Login",
      href: isLoggedIn()?routeConstants.logout:routeConstants.login,
      btn: true,
   },
   {
      label: getUserName()?getUserName():"Sign Up",
      href: !isLoggedIn()&&routeConstants.signup,
      btn: true,
   },
]

isAdmin() && all_route.push({
   label: "Admin Board",
   href: routeConstants.admin,
})



export const run_nav = () => {
let all_route = [
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
      label: isLoggedIn()?"Logout":"Login",
      href: isLoggedIn()?routeConstants.logout:routeConstants.login,
      btn: true,
   },
   {
      label: getUserName()?getUserName():"Sign Up",
      href: !isLoggedIn()&&routeConstants.signup,
      btn: true,
   },
]

isAdmin() && all_route.push({
   label: "Admin Board",
   href: routeConstants.admin,
})
   return  {
      menu: all_route
   };
}

