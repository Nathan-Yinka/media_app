import { useNavigate, useParams } from "react-router-dom";
import { useBlogs } from "./use-blog";
import { createAxiosInstance } from "@/config/axios-config";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { routeConstants } from "@/constants/route-const";

export const useBlogDetails = () => {
   //Make a request with the 'id' param
   const { id } = useParams();
   const navigate = useNavigate();

   const baseAxios = createAxiosInstance();
   const [blogDetails,setBlogDetails] = useState({});
   const [isLoading, setIsLoading] = useState(false);
   const [isLoadingDelete, setIsLoadingDelete] = useState(false)

   const fetchBlogDetails = useCallback(
      async (url) => {
         if (isLoading) return;
         setIsLoading(true)
          try {
              const response = await baseAxios.get(url);
              setIsLoading(false);
              setBlogDetails(response.data)
          } catch (err) {
            setIsLoading(false);
              toast.error(err.message);
          }
      },
      [] 
  );

  const handleDelete = useCallback(
   async (url) => {
      if (isLoadingDelete) return
      setIsLoadingDelete(true)
       try {
           const response = await baseAxios.delete(url);
           setIsLoadingDelete(false);
           toast.success("Blog Post Deleted Successfully");
           navigate(-1, {replace:true})
       } catch (err) {
         setIsLoadingDelete(false);
           toast.error(err.message);
       }
   },
   [] 
);

   return {
      handleDelete,
      blogDetails,
      isLoading,
      fetchBlogDetails
   };
};
