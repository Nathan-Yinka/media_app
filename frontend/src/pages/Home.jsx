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

const Home = () => {
   const { fetchBlogs, blogData,fetchHeaderBlogs } = useBlogs();
   const { categoryData, fetchCategory} = useCategory()
   const [headerBlog, setheaderBlog] = useState({})

   useEffect(()=>{
      fetchHeaderBlogs(ENDPOINT.GET_BLOG)
      fetchBlogs(ENDPOINT.GET_BLOG)
   },[fetchBlogs])

   useEffect(()=>{
      if (blogData.headerBlog) setheaderBlog(blogData.headerBlog)
   },[blogData.headerBlog])

      useEffect(()=>{
      fetchCategory(ENDPOINT.GET_CATEGORY)
   },[fetchCategory])


   console.log(headerBlog)
if (blogData.isLoading ) {
   return <LoadingHome />
}

console.log(headerBlog)

   return (
   
      <main className="container pt-10">
         <section>
            <Filters categoryData={categoryData}/>
         </section>

         {/* Spotlights */}
         <section className="flex gap-10 mt-8 md:items-center max-md:flex-col">
            <img
               src={headerBlog?.thumbnail || "/home/spotlight.svg"}
               alt="blog-1"
               className="flex-1 max-w-sm rounded-l-2xl object-cover min-h-[400px]"
            />

            <div className="py-2">
               <p className="text-xl font-medium">By {is_owner(headerBlog?.is_owner,headerBlog?.author_details?.full_name) || "Chinonso Elum"}</p>
               

               <h1 className="max-w-lg text-3xl font-semibold leading-normal sm:text-4xl lg:text-5xl lg:leading-snug">
                  {headerBlog?.title || 'How to Become a Millionaire in your 20’s Without Stress'}
               </h1>

               <p className="flex flex-wrap items-center justify-between sm:text-sm max-lg:mt-4">
                  <span>{convertTimestamp(headerBlog?.publication_date)||"12 Jan, 2024. 2:00PM"}</span> 
                  <span>{timeAgo(headerBlog?.last_read|| "Last Read: 2hrs ago")}</span>
               </p>

               <p className="mt-4">
                  {trimText(extractTextFromHTML(headerBlog?.content),400)||`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmodkk uyjtempor incididunt ut labore et dolore magna
                  aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                  ullamco laboris nisi ut aliquip ex eajjkkllll commodo
                  consequat. Duis aute irure dolor in reprehenderit in
                  voluphhjbk...`} 
               </p>

               <Link to={routeConstants.blogDetails.replace(":id", headerBlog?.id||"")}>
                  <Button
                     variant="outline"
                     className="mt-4 min-w-[150px] py-5 bg-transparent hover:bg-transparent"
                  >
                     View <ArrowRight className="ml-2 size-4" />
                  </Button>
               </Link>
            </div>
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

export default Home;
