import { BiLoaderAlt } from "react-icons/bi"; 
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { createAxiosInstance } from "@/config/axios-config";
import { ENDPOINT } from "@/constants/endpoints-const";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/Loader";
import { handleLoginSuccess } from "@/helpers/auth";
import { routeConstants } from "@/constants/route-const";


const Login = () => {
   const [userName, setUserName] = useState("")
   const [password, setPassword] = useState("")
   const baseAxios = createAxiosInstance()
   const [isLoading, setIsLoading] = useState(false)
   const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (event) => {
      event.preventDefault();
      let error = false
      if (!userName.trim()) {
          toast.error('Please Enter UserName or Email or Phone Number');
          error = true
      }
  
      if (!password.trim()) {
          toast.error('Please Enter Your Password');
           error = true
      }
  
      if (error){
          return
      }
      
      const formData = new FormData();
      formData.append("username", userName.trim());
      formData.append("password", password.trim());
      
      try{
          setIsLoading(true)
          const response = await baseAxios.post(ENDPOINT.AUTH_LOGIN,formData)
          setIsLoading(false)
          toast.success('User Login Successfully');
          handleLoginSuccess(response.data)
          navigate('/blogs')
      }
      catch(err){
          toast.error("Invalid Login Details")
          setIsLoading(false)
      }
      };

   return <div className="h-[100vh] w-screen md:flex justify-center items-center">
      <div className="md:border md:w-[50%] rounded-lg ">
      {/* back button */}
      <Button
            className="mt-10 ml-3"
            variant="ghost"
            onClick={() => navigate(routeConstants.home)}
         >
            <ArrowLeft className="mr-2 size-4" />
            <span className="text-black/50 hover:text-black">Back</span>
         </Button>

      <h1 className="font-bold text-3xl text-center mt-3 cursor-pointer" onClick={()=>navigate(routeConstants.home)}>Login</h1>
      <p className="text-black/60 text-center text-xs my-3">Get access into your account</p>
      <p className="text-primary text-center text-sm my-3 cursor-pointer" onClick={()=>navigate(routeConstants.signup)}>click here to signup</p>

      <form action="" className="flex flex-col gap-5 container py-5 md:w-[95%] mb-10" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
               <label htmlFor="username" className="text-sm">
                  Username/Phone/Email
               </label>
               <input
                  id="username"
                  type="text"
                  className=" placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm py-3"
                  placeholder="Enter Username/Phone/Email"
                  value={userName}
                  onChange={(e)=>setUserName(e.target.value)}
               />
            </div>

            <div className="flex flex-col gap-3">
               <label htmlFor="password" className="text-sm">
                  Password
               </label>
               <input
                  id="password"
                  type="password"
                  className=" placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm py-3"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
               />
            </div>

            <Button
               variant="primary"
               className="bg-primary font-bold border-border hover:text-black text-white hover:border-primary mt-5 py-5"
               type="submit"
               disabled={isLoading}
            >
               {isLoading? <Loader/> :"Login"}
            </Button>
      </form>
      </div>
      </div>
};

export default Login;


