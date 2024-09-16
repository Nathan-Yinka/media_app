import { useState, useCallback } from "react";
import { createAxiosInstance } from "@/config/axios-config";
import { toast } from "sonner";  // Verify that 'sonner' is the correct library. Usually, it's 'react-toastify'.
import { useSearchParams } from "react-router-dom";

/**
 * Custom React hook to fetch blog posts.
 * Returns the loading state, the fetched blog posts, and a function to initiate fetching.
 *
 * @returns {Object} The loading state, the fetched blog posts, and the fetchBlogs function.
 */
export function useBlogs() {
    const baseAxios = createAxiosInstance();
    const [searchParams] = useSearchParams();
    const [blogData, setBlogData] = useState({
        data: [],
        isLoading: false,
        headerBlog: {},
    });

    const fetchBlogs = useCallback(
        async (url) => {
            setBlogData((prev) => ({
                ...prev,
                isLoading: true,
            }));
            try {
                // Convert searchParams to a suitable object for axios
                const params = Array.from(searchParams.entries()).reduce((acc, [key, value]) => ({
                    ...acc,
                    [key]: value
                }), {});

                const response = await baseAxios.get(url, { params });
                setBlogData((prev) => ({
                    ...prev,
                    isLoading: false,
                    data: response.data,
                }));
            } catch (err) {
                setBlogData((prev) => ({
                    ...prev,
                    isLoading: false,
                }));
                toast.error(err.message); // Make sure that toast.error is suitable for your toast notification library.
            }
        },
        [searchParams] // searchParams as a dependency to refresh the function when searchParams change.
    );
    const fetchHeaderBlogs = useCallback(
        async (url) => {

            setBlogData((prev) => ({
                ...prev,
                isLoading: true,
            }));
            try {
                // Convert searchParams to a suitable object for axios

                const response = await baseAxios.get(url);
                setBlogData((prev) => ({
                    ...prev,
                    isLoading: false,
                    headerBlog: response.data[0],
                }));
            } catch (err) {
                setBlogData((prev) => ({
                    ...prev,
                    isLoading: false,
                }));
                toast.error(err.message); // Make sure that toast.error is suitable for your toast notification library.
            }
        },
        [] // searchParams as a dependency to refresh the function when searchParams change.
    );


    return { blogData, fetchBlogs,fetchHeaderBlogs };
}
