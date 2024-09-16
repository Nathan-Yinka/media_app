import { ChevronDown, SearchIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Input } from "./ui/input";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { ComboBox } from "./ui/combo-box";
import { filterConstants } from "@/constants/filter-const";
import { routeConstants } from "@/constants/route-const";

import { useFilter } from "@/hooks/use-fiilter";

export const Filters = ({categoryData}) => {
   const navigate = useNavigate();
   const { formValues, handleSetFormField } = useFilter(categoryData);

console.log(categoryData?.data)

const options = categoryData && categoryData.data && categoryData.data.length > 0
    ? categoryData.data.map(item => ({
        label: item.name,
        value: String(item.id)
      }))
    : [];

   return (
      <div className="flex flex-wrap items-center justify-between w-full gap-3">
         <div className="flex gap-2">
            <ComboBox
               array={options}
               defaultValue={formValues.category}
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
