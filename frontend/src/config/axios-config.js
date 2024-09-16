import { getToken } from "@/helpers/auth";
import axios from "axios";
// Assuming you have a getToken function to fetch the token from localStorage

/**
 * Creates and returns an Axios instance configured with a base URL and standard settings.
 *
 * @param {string} baseURL - The base URL for all HTTP requests from this instance.
 * @returns {AxiosInstance} The configured Axios instance with interceptors.
 */
export const createAxiosInstance = () => {
   // Define the default configuration for the Axios instance.
   const baseServerUrl = import.meta.env.VITE_PUBLIC_BASEURL;
   const axiosInstance = axios.create({
      baseURL: baseServerUrl, // Base URL for requests.
      timeout: 100000, // Set timeout to 10 seconds.
      headers: {
         "Content-Type": "application/json", // Set default content type to JSON.
      },
   });

   // Setup request interceptor to dynamically add Authorization header if the user is logged in.
   axiosInstance.interceptors.request.use(
      (config) => {
         // Get the token if available.
         const token = getToken(); // Assuming getToken retrieves the token from localStorage

         if (token) {
            // If token exists, dynamically add the Authorization header.
            config.headers['Authorization'] = `Bearer ${token}`;
         }

         // Optional: Log the request configuration.
         console.log(`Request made to ${config.url} with data:`, config.data);

         return config;
      },
      (error) => {
         // Handle errors before the request is sent.
         console.error("Failed to make request:", error);
         return Promise.reject(error);
      }
   );

   // Setup response interceptor to handle responses globally.
   axiosInstance.interceptors.response.use(
      (response) => {
         // Handle successful responses.
         console.log(
            `Response received from ${response.config.url} with status: ${response?.status}`
         );
         return response;
      },
      (error) => {
         // Handle responses with errors.
         console.error(
            `Error received from ${error.config.url} with status: ${error.response?.status}`
         );
         return Promise.reject(error);
      }
   );

   // Return the configured Axios instance.
   return axiosInstance;
};

