import { ChevronDown, SearchIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Input } from "./ui/input";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { ComboBox } from "./ui/combo-box";
import { filterConstants } from "@/constants/filter-const";
import { routeConstants } from "@/constants/route-const";

import { useFilter } from "@/hooks/use-fiilter";
import CategoryModal from "./CategoryModal";
import { useState } from "react";
import { isAdmin } from "@/helpers/auth";

export const Filters = ({categoryData}) => {
   const navigate = useNavigate();
   const { formValues, handleSetFormField } = useFilter(categoryData);
   const [open,setOpen] = useState(false);

console.log(categoryData?.data)

const options = categoryData && categoryData.data && categoryData.data.length > 0
    ? categoryData.data.map(item => ({
        label: item.name,
        value: item.name === "All"? "":item.name
      }))
    : [];

   return (
      <div className="flex flex-wrap items-center justify-between w-full gap-3">
         <div className="flex gap-2">
         {isAdmin() && <CategoryModal
         open={open}
         setOpen={setOpen}
         />}
            <ComboBox
               array={options}
               defaultValue={formValues.category||"all"}
               onValueChange={(value) => handleSetFormField("category", value)}
               triggerClassName="bg-transparent shadow-none"
               popoverContentClassName="min-w-[140px]"
               iconRight={<ChevronDown size={10} />}
            />

            <Button
               variant="outline"
               onClick={() => navigate(routeConstants.create)}
            >
               <PlusIcon strokeWidth={2} className="mr-2" /> Create New
            </Button>

            {
               isAdmin() && <Button
               variant=""
               onClick={() => setOpen(true)}
               className={"bg-primary"}
            >
               <PlusIcon strokeWidth={2} className="mr-2" /> Create Category
            </Button>
            }
         </div>

         <div className="relative flex-1 max-w-xs min-w-[200px]">
            <SearchIcon className="absolute -translate-y-1/2 left-3 size-4 top-1/2" />

            <Input
               placeholder="Search"
               value={formValues.search}
               onChange={(e) => handleSetFormField("search", e.target.value)}
               className="border-none rounded-full pl-9 bg-muted"
            />
         </div>
      </div>
   );
};
