import CategoryModal from "@/components/CategoryModal";
import { BlogCard } from "@/components/blog-card";
import { Filters } from "@/components/filters";
import { LoadingHome } from "@/components/loading-home";
import { Button } from "@/components/ui/button";
import { ENDPOINT } from "@/constants/endpoints-const";
import { routeConstants } from "@/constants/route-const";
import { isAdmin } from "@/helpers/auth";
import { is_owner } from "@/helpers/card_detail";
import { extractTextFromHTML, trimText } from "@/helpers/hmtl_formatter";
import { convertTimestamp, timeAgo } from "@/helpers/timeformatter";
import { useBlogs } from "@/hooks/use-blog";
import { useCategory } from "@/hooks/use-category";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminBoard = () => {
   const { fetchBlogs, blogData } = useBlogs();
   const navigate = useNavigate();
   const { categoryData, fetchCategory} = useCategory()
   const [approvedBlog, setApprovedBlog] = useState([]);
   const [inReviewBlog, setInReviewBlog] = useState([]);
   const [flaggedBlog, setFlaggedBlog] = useState([]);

   useEffect(()=>{
    if (!isAdmin()){
        navigate(routeConstants.login)
    }
   },[])


   useEffect(()=>{
     isAdmin() && fetchBlogs(`${ENDPOINT.ADMIN_GET_BLOG}`)
   },[fetchBlogs])

      useEffect(()=>{
        isAdmin() && fetchCategory(ENDPOINT.GET_CATEGORY)
   },[fetchCategory])

   useEffect(()=>{
        if (blogData.data){
            const approved = blogData.data.filter(blog => blog.status === 'published');
            const inReview = blogData.data.filter(blog => blog.status === 'in_review');
            const flagged = blogData.data.filter(blog=> blog.status === "flagged");

            setApprovedBlog(approved)
            setFlaggedBlog(flagged);
            setInReviewBlog(inReview);
        }
   },[blogData.data])



if (blogData.isLoading ) {
   return <LoadingHome />
}

   return (
   
      <main className="container pt-10">
         <section>
            <Filters categoryData={categoryData}/>
         </section>

         {/* Published Blog Card Preview */}
         <h1 className="pt-20 pb-10 font-bold text-3xl">Published Blogs</h1>
         <section className="grid pb-10  gap-x-6 gap-y-8 md:grid-cols-2">
            {approvedBlog.map((data, index) => (
               <BlogCard key={index} index={index} data={data || {}} />
            ))}
         </section>
         {/* In Review Blog Card Preview */}
         <h1 className="pt-20 pb-10 font-bold text-3xl">In Review Blogs</h1>
         <section className="grid pb-10  gap-x-6 gap-y-8 md:grid-cols-2">
            {inReviewBlog.map((data, index) => (
               <BlogCard key={index} index={index} data={data || {}} />
            ))}
         </section>
         {/* Flagged Blog Card Preview */}
         <h1 className="pt-20 pb-10 my-10 font-bold text-3xl">Flagged Blogs</h1>
         <section className="grid pb-10  gap-x-6 gap-y-8 md:grid-cols-2">
            {flaggedBlog.map((data, index) => (
               <BlogCard key={index} index={index} data={data || {}} />
            ))}
         </section>
      </main>
   );
};

export default AdminBoard;
