import TextEditor from "@/components/TextEditor";
import Dropdown from "@/components/dropdown";
import Loader from "@/components/Loader";
import { LoadingHome } from "@/components/loading-home";
import { Button } from "@/components/ui/button";
import { createAxiosInstance } from "@/config/axios-config";
import { ENDPOINT } from "@/constants/endpoints-const";
import { getCategoryColor } from "@/helpers/get-category-color";
import { useBlogDetails } from "@/hooks/use-blog-details";
import { useCategory } from "@/hooks/use-category";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const EditBlog = () => {
   const navigate = useNavigate();
   const { id } = useParams();
   const { blogDetails,isLoading:blogDetailLoading,fetchBlogDetails } = useBlogDetails();
   const baseAxios = createAxiosInstance()
   const { categoryData, fetchCategory } = useCategory();
   const [selectedCategory, setSelectedCategory] = useState({});
   const [content, setContent] = useState("");
   const [title, setTitle] = useState("");
   const [image, setImage] = useState("");
   const [isLoading, setIsLoading] = useState(false)
   const [existingImageUrl,setExistingImageUrl] = useState("")

   useEffect(() => {
        fetchBlogDetails(ENDPOINT.GET_BLOG_DETAIL.replace(":id", id));
        fetchCategory(ENDPOINT.GET_CATEGORY, false);
   }, [fetchBlogDetails,id]);



   useEffect(()=>{
    if(blogDetails && !blogDetailLoading){
        setTitle(blogDetails.title)
        setContent(blogDetails.content)
        setExistingImageUrl(blogDetails.thumbnail)
        setSelectedCategory(blogDetails.category_details)

    }
   },[blogDetails])

   // Handle change in title input
   const handleTitleChange = (event) => {
      setTitle(event.target.value);
   };

   // Handle change in file input for thumbnail
   const handleThumbnailChange = (event) => {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        setImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setExistingImageUrl(reader.result);
        };
        reader.readAsDataURL(file); 
      } else {
         toast.error("Please select an image file.");
         event.target.value = null;
      }
   };

    // Handle form submission
    const handleSubmit = async (event) => {
    event.preventDefault();
    let error = false
    if (!title) {
        toast.error('Please Enter Blog Title');
        error = true
    }

    if (!content) {
        toast.error('Please Enter Blog Content');
         error = true
    }

    if (!selectedCategory?.id){
        toast.error('Please Select A Category');
        error = true
    }

    if (error){
        return
    }
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    image && formData.append("thumbnail", image)
    formData.append("category", selectedCategory.id);
    
    try{
        setIsLoading(true)
        const response = await baseAxios.patch(ENDPOINT.EDIT_BLOG.replace(":id",id),formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        setIsLoading(false)
        toast.success('Blog Updated Successfully');
    }
    catch(err){
        toast.error(err.message)
        setIsLoading(false)
    }
    };


    

    if (blogDetailLoading){
        return <LoadingHome/>
    }
   return (
      <main className="container py-12">
         <Button
            variant="ghost"
            onClick={() => navigate(-1, { replace: true })}
         >
            <ArrowLeft className="mr-2 size-4" />
            Back
         </Button>

         <form className="flex flex-col gap-5 container py-5 md:w-[80%] my-10" onSubmit={handleSubmit}>
            {/* Blog Title */}
            <div className="flex flex-col gap-1">
               <label htmlFor="title" className="text-sm font-bold">
                  Title
               </label>
               <input
                  id="title"
                  type="text"
                  className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  placeholder="Enter Blog Title"
                  value={title}
                  onChange={handleTitleChange}
               />
            </div>

            {/* blog thumbnail */}
            <div className="flex flex-col gap-1">
               <label htmlFor="thumbnail" className="text-sm font-bold">
                  thumbnail
               </label>
               <div>
                <img src={existingImageUrl} alt="Thumbnail" className=" rounded-md shadow-sm  h-[100px] w-[100px]" />
                </div>
               <input
                  id="thumbnail"
                  type="file"
                  accept="image/*"
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 border rounded-md file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  onChange={handleThumbnailChange}
               />
            </div>

            {/* Blog category */}
            <div className="flex flex-col gap-1">
               <label htmlFor="title" className="text-sm font-bold">
                  Category
               </label>
               <Dropdown
                  DropdownData={categoryData.data}
                  selected={selectedCategory}
                  setSelected={setSelectedCategory}
               />
            </div>

            {/* Blog Content */}
            <div className="flex flex-col gap-1">
               <label htmlFor="content" className="text-sm font-bold">
                  Content
               </label>
               <TextEditor value={content} setValue={setContent} />
            </div>

            <Button
               variant="primary"
               className="bg-primary font-bold border-border hover:text-white hover:border-primary"
               type="submit"
               disabled={isLoading}
            >
               {isLoading? <Loader/>:"Submit"}
            </Button>
         </form>
      </main>
   );
};

export default EditBlog;
