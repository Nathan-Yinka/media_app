import { BlogCard } from "@/components/blog-card";
import { Filters } from "@/components/filters";
import { LoadingHome } from "@/components/loading-home";
import { Button } from "@/components/ui/button";
import { ENDPOINT } from "@/constants/endpoints-const";
import { routeConstants } from "@/constants/route-const";
import { is_owner } from "@/helpers/card_detail";
import { extractTextFromHTML, trimText } from "@/helpers/hmtl_formatter";
import { convertTimestamp, timeAgo } from "@/helpers/timeformatter";
import { useBlogs } from "@/hooks/use-blog";
import { useCategory } from "@/hooks/use-category";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyBlog = () => {
   const { fetchBlogs, blogData } = useBlogs();
   const { categoryData, fetchCategory} = useCategory()

   useEffect(()=>{
      fetchBlogs(`${ENDPOINT.MY_BLOGS}?status=published`)
   },[fetchBlogs])

      useEffect(()=>{
      fetchCategory(ENDPOINT.GET_CATEGORY)
   },[fetchCategory])

if (blogData.isLoading ) {
   return <LoadingHome />
}

   return (
   
      <main className="container pt-10">
         <section>
            <Filters categoryData={categoryData}/>
         </section>

         {/* Blog Card Preview */}
         <section className="grid py-20 gap-x-6 gap-y-8 md:grid-cols-2">
            {blogData.data?.map((data, index) => (
               <BlogCard key={index} index={index} data={data || {}} />
            ))}
         </section>
      </main>
   );
};

export default MyBlog;
