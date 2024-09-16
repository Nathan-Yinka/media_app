import StatusSelect from "@/components/StatusSelect";
import { LoadingHome } from "@/components/loading-home";
import { Button } from "@/components/ui/button";
import { createAxiosInstance } from "@/config/axios-config";
import { ENDPOINT } from "@/constants/endpoints-const";
import { routeConstants } from "@/constants/route-const";
import { isAdmin } from "@/helpers/auth";
import { is_owner, is_owner_or_admin } from "@/helpers/card_detail";
import { getCategoryColor } from "@/helpers/get-category-color";
import { convertTimestamp, timeAgo } from "@/helpers/timeformatter";
import { useBlogDetails } from "@/hooks/use-blog-details";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const BlogDetails = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const baseAxios = createAxiosInstance();
   const { handleDelete, blogDetails,isLoading,fetchBlogDetails } = useBlogDetails();
   const [status, setStatus] = useState({})

   const { textColor, backgroundColor } = getCategoryColor(
      blogDetails?.category_details?.name || "lifestyle"
   );

   const fetchEndpoint = isAdmin()?ENDPOINT.ADMIN_BLOG_DETAILS: ENDPOINT.GET_BLOG_DETAIL

   useEffect(()=>{
      fetchBlogDetails(fetchEndpoint.replace(":id", id));
   },[fetchBlogDetails,id])

   const statusData = [
      {
         name: 'Published',
         value: 'published'
      },
      {
         name: 'In Review',
         value: 'in_review'
      },
      {
         name: 'Flagged',
         value: 'flagged'
      }
   ]

   useEffect(() => {
      if (blogDetails?.status) {
          const foundStatus = statusData.find((item) => item.value === blogDetails.status);
          setStatus(foundStatus);
      }
  }, [blogDetails]);  



  const handleItemClick = async (value) => {
   const formData = new FormData();
   formData.append("status", value.value);
   try {
       const response = await baseAxios.patch(ENDPOINT.ADMIN_UPDATE_STATUS.replace(":id",id),formData);
       toast.success(`Blog Status Updated to ${value.name}`)
   } catch (error) {
      toast.error(error.message)
   }
};




   if (isLoading) {
   return <LoadingHome/>
   }
   return (
      <main className="container py-12">
         <Button
            variant="ghost"
            onClick={() => navigate(-1, { replace: true })}
         >
            <ArrowLeft className="mr-2 size-4" />
            <b>Back</b>
         </Button>

         {/*Action Button Section */}
         <section className="mt-10 flex items-center justify-end gap-2 [&_button]:px-10">
            <Button variant="destructive" onClick={()=>handleDelete(ENDPOINT.DELETE_BLOG.replace(":id", id))} disabled={!is_owner_or_admin(blogDetails?.is_owner,isAdmin())}>
               Delete
            </Button>

            <Button
               variant="outline"
               className="bg-transparent border-border hover:text-primary hover:border-primary"
               disabled={!is_owner_or_admin(blogDetails?.is_owner,isAdmin())}
               onClick={()=>{navigate(routeConstants.edit.replace(":id",id))}}
            >
               Edit
            </Button>

         {
            isAdmin() && (
               <StatusSelect 
               DropdownData={statusData}
               selected={status}
               setSelected={setStatus}
               handleItemClick={handleItemClick}
               />
            )
         }
         </section>

         

         {/* Header Title Section */}
         <section className="mt-8">
            <div className="flex flex-wrap items-center justify-between gap-2">
               <h4 className="font-semibold">By {is_owner(blogDetails?.is_owner,blogDetails?.author_details?.full_name)|| "Lifestyle"}</h4>
               <span
                  style={{
                     backgroundColor: backgroundColor,
                     color: textColor,
                  }}
                  className="px-3 py-[5px] text-xs font-semibold rounded-full"
               >
                  {blogDetails?.category_details?.name || "Lifestyle"}
               </span>
            </div>

            <div className="mt-2 flex items-center justify-between gap-2 [&_p]:text-sm [&_p]:text-muted-foreground text-xs">
            <span>{convertTimestamp(blogDetails?.publication_date)||"12 Jan, 2024. 2:00PM"}</span> 
                  <span>{timeAgo(blogDetails?.last_read|| "Last Read: 2hrs ago")}</span>
            </div>

            <h1 className="mt-8 text-4xl font-bold !leading-tight max-lg:max-w-2xl md:text-5xl">
               {blogDetails?.title}
            </h1>

            <img
               src={blogDetails?.thumbnail}
               className="w-full h-full mt-10 max-h-[450px] object-cover rounded-2xl"
            />

            <div
               dangerouslySetInnerHTML={{ __html: blogDetails?.content }}
               className="mt-10 space-y-4"
            />
         </section>
      </main>
   );
};

export default BlogDetails;
