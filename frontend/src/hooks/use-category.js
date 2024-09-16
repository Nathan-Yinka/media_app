import { useState, useCallback } from "react";
import { createAxiosInstance } from "@/config/axios-config";
import { toast } from "sonner";  // Verify that 'sonner' is the correct library. Usually, it's 'react-toastify'.
import { useSearchParams } from "react-router-dom";

/**
 * Custom React hook to fetch blog posts.
 * Returns the loading state, the fetched Category posts, and a function to initiate fetching.
 *
 * @returns {Object} The loading state, the fetched blog posts, and the fetchBlogs function.
 */
export function useCategory() {
    const baseAxios = createAxiosInstance();
    const [categoryData, setCategoryData] = useState({
        data: [],
        isLoading: false,
    });

    const fetchCategory = useCallback(
        async (url,add_all=true) => {
            setCategoryData((prev) => ({
                ...prev,
                isLoading: true,
            }));
            try {


                const response = await baseAxios.get(url);
                const newData = add_all?[{ id: 0, name: "All" },...response.data]: response.data;
                setCategoryData((prev) => ({
                    ...prev,
                    isLoading: false,
                    data: newData
                }));
            } catch (err) {
                setCategoryData((prev) => ({
                    ...prev,
                    isLoading: false,
                }));
                toast.error(err.message); // Make sure that toast.error is suitable for your toast notification library.
            }
        },
        [] // searchParams as a dependency to refresh the function when searchParams change.
    );

    const createCategory = useCallback(
        async (url) => {
            setCategoryData((prev) => ({
                ...prev,
                isLoading: true,
            }));
            try {


                const response = await baseAxios.get(url);
                const newData = add_all?[{ id: 0, name: "All" },...response.data]: response.data;
                setCategoryData((prev) => ({
                    ...prev,
                    isLoading: false,
                    data: newData
                }));
            } catch (err) {
                setCategoryData((prev) => ({
                    ...prev,
                    isLoading: false,
                }));
                toast.error(err.message); // Make sure that toast.error is suitable for your toast notification library.
            }
        },
        [] // searchParams as a dependency to refresh the function when searchParams change.
    );

    return { categoryData, fetchCategory };
}
