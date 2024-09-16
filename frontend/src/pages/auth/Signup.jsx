import { BiLoaderAlt } from "react-icons/bi"; 
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { createAxiosInstance } from "@/config/axios-config";
import { ENDPOINT } from "@/constants/endpoints-const";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/loader";
import { handleLoginSuccess } from "@/helpers/auth";
import { routeConstants } from "@/constants/route-const";


const Signup = () => {
   const [userName, setUserName] = useState("")
   const [password, setPassword] = useState("")
   const [confirmPassword, setConfirmPassword] = useState("")
   const [email, setEmail] = useState("")
   const [firstName,setFirstName] = useState("")
   const [lastName, setLastName] = useState("")
   const [phone,setPhone] =useState("")
   const baseAxios = createAxiosInstance()
   const [isLoading, setIsLoading] = useState(false)
   const navigate = useNavigate();

   // Regex pattern for email validation
   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   // Regex pattern for phone validation (10-15 digits, no special characters)
   const phonePattern = /^[0-9]{10,15}$/;
   
   const handleSubmit = async (event) => {
     event.preventDefault();
     let error = false;
   
     // Trim the input values before validation
     const trimmedUserName = userName.trim();
     const trimmedEmail = email.trim();
     const trimmedPhone = phone.trim();
     const trimmedFirstName = firstName.trim();
     const trimmedLastName = lastName.trim();
     const trimmedPassword = password;
     const trimmedConfirmPassword = confirmPassword;
   
     // Validate each field after trimming
     if (!trimmedUserName) {
       toast.error('Please Enter Username');
       error = true;
     }
   
     if (!trimmedEmail || !emailPattern.test(trimmedEmail)) {
       toast.error('Please Enter a Valid Email');
       error = true;
     }
   
     if (!trimmedPhone || !phonePattern.test(trimmedPhone)) {
       toast.error('Please Enter a Valid Phone Number');
       error = true;
     }
   
     if (!trimmedFirstName) {
       toast.error('Please Enter Your First Name');
       error = true;
     }
   
     if (!trimmedLastName) {
       toast.error('Please Enter Your Last Name');
       error = true;
     }
   
     if (!trimmedPassword) {
       toast.error('Please Enter Your Password');
       error = true;
     }
   
     if (!trimmedConfirmPassword) {
       toast.error('Please Confirm Your Password');
       error = true;
     }
   
     if (trimmedPassword !== trimmedConfirmPassword) {
       toast.error('Passwords Do Not Match');
       error = true;
     }
   
     if (error) {
       return; // Stop form submission if any errors exist
     }
   
     // Create form data to send in the API request
     const formData = new FormData();
     formData.append('username', trimmedUserName);
     formData.append('email', trimmedEmail);
     formData.append('mobile', trimmedPhone);
     formData.append('first_name', trimmedFirstName);
     formData.append('last_name', trimmedLastName);
     formData.append('password', trimmedPassword);
   
     try {
       setIsLoading(true);
       const response = await baseAxios.post(ENDPOINT.AUTH_SIGNUP, formData);
       setIsLoading(false);
       toast.success('User Account Created Successfully');
       navigate(routeConstants.login)
     } catch (err) {
        setIsLoading(false);
        if (err.response && err.response.data) {
            const errors = err.response.data;
      
            // Loop over the error object and display each error using toast
            Object.keys(errors).forEach((field) => {
              errors[field].forEach((message) => {
                toast.error(`${field.charAt(0).toUpperCase() + field.slice(1)}: ${message}`);
              });
            });
          } else {
            toast.error('Something went wrong, please try again.');
          }
        }
     
   };
   

   return <div className="h-[100vh] w-screen md:flex justify-center items-center">
      <div className="md:border md:w-[50%] rounded-lg ">
      {/* back button */}
      <Button
            className="mt-10 ml-3"
            variant="ghost"
            onClick={() => navigate(-1, { replace: true })}
         >
            <ArrowLeft className="mr-2 size-4" />
            <span className="text-black/50 hover:text-black">Back</span>
         </Button>

      <h1 className="font-bold text-3xl text-center">Signup</h1>
      <p className="text-black/60 text-center text-xs my-3">Create your content creator account</p>

      <form action="" className="flex flex-col gap-5 container py-5 md:w-[95%] mb-10" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
               <label htmlFor="username" className="text-sm">
                  Username
               </label>
               <input
                  id="username"
                  type="text"
                  className=" placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm py-3"
                  placeholder="Enter Your Username"
                  value={userName}
                  onChange={(e)=>setUserName(e.target.value)}
               />
            </div>
            <div className="flex flex-col gap-3">
               <label htmlFor="email" className="text-sm">
                  Email
               </label>
               <input
                  id="email"
                  type="email"
                  className=" placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm py-3"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
               />
            </div>
            <div className="flex flex-col gap-3">
               <label htmlFor="phone" className="text-sm">
                  Phone
               </label>
               <input
                  id="phone"
                  type="number"
                  className=" placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm py-3"
                  placeholder="Enter Your Phone"
                  value={phone}
                  onChange={(e)=>setPhone(e.target.value)}
               />
            </div>

           <div className="md:flex gap-5">
           <div className="flex flex-col gap-3 w-full">
               <label htmlFor="first_name" className="text-sm">
                  First Name
               </label>
               <input
                  id="first_name"
                  type="text"
                  className=" placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm py-3"
                  placeholder="Enter Your First Name"
                  value={firstName}
                  onChange={(e)=>setFirstName(e.target.value)}
               />
            </div>

            <div className="flex flex-col gap-3 w-full">
               <label htmlFor="last_name" className="text-sm">
                  Last Name
               </label>
               <input
                  id="last_name"
                  type="text"
                  className=" placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm py-3"
                  placeholder="Enter Your Last Name"
                  value={lastName}
                  onChange={(e)=>setLastName(e.target.value)}
               />
            </div>
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
            <div className="flex flex-col gap-3">
               <label htmlFor="cpassword" className="text-sm">
                  Confirm Password
               </label>
               <input
                  id="cpassword"
                  type="password"
                  className=" placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm py-3"
                  placeholder="Confirm Your password"
                  value={confirmPassword}
                  onChange={(e)=>setConfirmPassword(e.target.value)}
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

export default Signup;


