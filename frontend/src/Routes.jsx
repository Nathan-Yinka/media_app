import * as React from "react";
import { Routes as Router, Route, Navigate } from "react-router-dom";
import { routeConstants } from "./constants/route-const";
import { Navbar } from "./components/navigation/navbar";
import { LoadingHome } from "./components/loading-home";
import NotFound from "./pages/NotFound";

// Pages imports.
const Login = React.lazy(() => import("@/pages/auth/Login"))
const Home =React.lazy(() => import("@/pages/Home"));
const MyBlog =React.lazy(() => import("@/pages/MyBlog"));
const BlogDetails = React.lazy(() => import("@/pages/BlogDetails"))
const BlogInReview = React.lazy(() => import("@/pages/BlogInReview"))
const FlaggedBlog = React.lazy(() => import("@/pages/FlaggedBlog"))
const CreateBlog = React.lazy(() => import("@/pages/Create"))
const EditBlog = React.lazy(() => import("@/pages/EditBlog"))
const AdminBoard = React.lazy(() => import("@/pages/AdminBoard"))
const Signup = React.lazy(() => import("@/pages/auth/Signup"))
const Logout = React.lazy(() => import("@/pages/auth/Logout"))

const Routes = () => {

   return (
      <React.Suspense fallback={<LoadingHome/>}>
         <Navbar />

         <Router>
            <Route index  element={<Home />} />
            <Route path={routeConstants.login} element={<Login />} />
            <Route path={routeConstants.logout} element={<Logout />} />
            <Route path={routeConstants.signup} element={<Signup />} />
            <Route path={routeConstants.home} element={<Home />} />
            <Route path={routeConstants.myBlogs} element={<MyBlog />} />
            <Route path={routeConstants.flagged} element={<FlaggedBlog />} />
            <Route path={routeConstants.inReview} element={<BlogInReview />} />
            <Route path={routeConstants.blogDetails} element={<BlogDetails />}/>
            <Route path={routeConstants.create} element={<CreateBlog />}/>
            <Route path={routeConstants.edit} element={<EditBlog />}/>
            <Route path={routeConstants.admin} element={<AdminBoard />}/>
            <Route path="*" element={<NotFound />} />

         </Router>
      </React.Suspense>
   )
}

export default Routes;