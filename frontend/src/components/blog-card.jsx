import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "./ui/card";
import { routeConstants } from "@/constants/route-const";
import { Link } from "react-router-dom";
import { getCategoryColor } from "@/helpers/get-category-color";
import { convertTimestamp, timeAgo } from "@/helpers/timeformatter";
import { extractTextFromHTML, trimText } from "@/helpers/hmtl_formatter";
import { is_owner } from "@/helpers/card_detail";

export const BlogCard = ({ data, index }) => {
   const { id, author_details, title, publication_date, last_read, category_details, content,thumbnail, is_owner:owns_blog } = data;
   const { name:category } = category_details
   const { full_name:author } = author_details
   const { textColor, backgroundColor } = getCategoryColor(
      category || "lifestyle"
   );

   return (
      <div className="relative flex flex-col justify-center">
         <img src={thumbnail||"/blog-card.svg"} className=" rounded-md flex-1 w-[500px] rounded-l-2xl object-cover h-[500px]" />

         <Card className="border-none shadow-[0_0_15px_rgba(0_0_0/0.05)] min-[500px]:w-10/12 -mt-[20%] lg:-mt-[25%] place-self-center">
            <CardHeader className="pb-4">
               <CardDescription className="flex flex-wrap items-center justify-between font-medium justi text-foreground text-md">
                  <span>By {is_owner(owns_blog,author) || "Chinonso Elum"}</span>
                  <span
                     style={{
                        backgroundColor: backgroundColor,
                        color: textColor,
                     }}
                     className="px-3 py-[5px] text-xs font-semibold rounded-full"
                  >
                     {category || "Lifestyle"}
                  </span>
               </CardDescription>

               <CardTitle className="text-xl leading-tight md:text-2xl lg:text-3xl">
                  {title ||
                     "How to Become a Millionaire in your 20’s Without Stress"}
               </CardTitle>
            </CardHeader>

            <CardContent>
               <p className="flex flex-wrap items-center justify-between gap-2 text-xs">
               <span>{convertTimestamp(publication_date)||"12 Jan, 2024. 2:00PM"}</span> 
               <span>{timeAgo(last_read|| "Last Read: 2hrs ago")}</span>
               </p>

               <p className="mt-5">
               {trimText(extractTextFromHTML(content),300)||`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmodkk uyjtempor incididunt ut labore et dolore magna
                  aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                  ullamco laboris nisi ut aliquip ex eajjkkllll commodo
                  consequat. Duis aute irure dolor in reprehenderit in
                  voluphhjbk...`} 
               </p>

               <Link
                  to={routeConstants.blogDetails.replace(":id", id || index)}
               >
                  <Button
                     variant="outline"
                     className="mt-4 min-w-[150px] py-5 bg-transparent hover:bg-transparent"
                  >
                     View <ArrowRight className="ml-2 size-4" />
                  </Button>
               </Link>
            </CardContent>
         </Card>
      </div>
   );
};
