import { filterConstants } from "@/constants/filter-const";
import { routeConstants } from "@/constants/route-const";
import { useDebounce } from "@/hooks/use-debounce";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useCategory } from "./use-category";
import { ENDPOINT } from "@/constants/endpoints-const";

export const useFilter = () => {
   const [searchParams, setSearchParams] = useSearchParams();
   const [formValues, setFormValues] = useState({
      category: searchParams.get("category"),
      search: searchParams.get("search"),
   });
   

   // Debounce the search value
   const debouncedSearch = useDebounce(formValues.search);

   // Update form values
   const handleSetFormField = (field, value) => {
      setFormValues((prev) => ({
         ...prev,
         [field]: value,
      }));
   };

   // Update the category param in the URL
   useEffect(() => {
      if (formValues.category) {
         setSearchParams((prevParams) => ({
            ...Object.fromEntries(prevParams.entries()),
            category: formValues.category,
         }));
      }
   }, [formValues.category, setSearchParams]);

   // Update the search param in the URL when debounced search changes
   useEffect(() => {
      if (formValues.search) {
         setSearchParams((prevParams) => ({
            ...Object.fromEntries(prevParams.entries()),
            search: debouncedSearch,
         }));
      } else {
         setSearchParams((prevParams) => ({
            ...Object.fromEntries(prevParams.entries()),
            search: "",
         }));
      }
   }, [debouncedSearch, setSearchParams]);

   return {
      searchParams,
      formValues,
      handleSetFormField,
   };
};
