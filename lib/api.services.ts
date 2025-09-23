// "use server";
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import axios, { AxiosRequestConfig } from "axios";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
// import { getServerSession } from "next-auth";
// import { authOptions } from "./authOptions";

// export async function apiServices<T>(
//   endpoint: string,
//   method: "get" | "post" | "put" | "patch" | "delete" | "options",
//   data?: T,
//   pagination?: any,
//   config: AxiosRequestConfig = {}
// ): Promise<{
//   data: any;
//   pagination?: any;
//   statusCode: number | null;
//   message: string | null;
//   error: any;
//   success: any;
// }> {
//   const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
//   const URL = `${BASE_URL}${endpoint}`;

//   try {
//     // 🔑 Token session se lo
//     const session = await getServerSession(authOptions);
//     const token = session?.user?.token;

//     const headers = {
//       ...(token && { Authorization: `Bearer ${token}` }),
//       ...config.headers,
//     };

//     const response = await axios({
//       url: URL,
//       method,
//       data: method === "get" || method === "delete" ? undefined : data,
//       headers,
//       ...config,
//     });

//     return {
//       data: response.data.data || response.data || null,
//       pagination: response.data.pagination || null,
//       statusCode: response.status,
//       message: response.data.message || response.statusText,
//       error: null,
//       success: response.data.success ?? true,
//     };
//   } catch (error: any) {
//     const cookieStore: any = await cookies();
//     const redirectedByURL = cookieStore?.get("redirectedByURL")?.value || null;

//     if (
//       axios.isAxiosError(error) &&
//       (error.response?.status === 401 || error.response?.status === 403)
//     ) {
//       if (redirectedByURL) {
//         redirect(process.env.NEXT_PUBLIC_GETDIRECT_SIGNUP_URL as string);
//       }

//       return {
//         data: null,
//         statusCode: 401,
//         message: "Unauthorized access. Please log in again.",
//         error: { message: "Unauthorized access" },
//         success: false,
//       };
//     }

//     if (axios.isAxiosError(error)) {
//       if (!error.response) {
//         return {
//           data: null,
//           statusCode: 503,
//           success: false,
//           message:
//             error.message ||
//             "Server is unreachable. Please check the API server.",
//           error: {
//             message: "Could not connect to the server. Ensure it's running.",
//           },
//         };
//       }

//       return {
//         data: null,
//         statusCode: error.response?.status || 500,
//         message: error.response?.data?.message || error.message,
//         error: error.response?.data || error.message,
//         success: false,
//       };
//     }

//     return {
//       data: null,
//       statusCode: 500,
//       message: "An unexpected error occurred",
//       error: null,
//       success: false,
//     };
//   }
// }


"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

export async function apiServices<T>(
  endpoint: string,
  method: "get" | "post" | "put" | "patch" | "delete" | "options",
  data?: T,
  pagination?: any,
  config: AxiosRequestConfig = {}
): Promise<{
  data: any;
  pagination?: any;
  statusCode: number | null;
  message: string | null;
  error: any;
  success: any;
}> {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const URL = `${BASE_URL}${endpoint}`;

  try {
    const session = await getServerSession(authOptions);
    const token = session?.user?.token;

    const headers = {
      ...(token && { Authorization: `Bearer ${token}` }),
      ...config.headers,
    };

    const response = await axios({
      url: URL,
      method,
      data: method === "get" || method === "delete" ? undefined : data,
      headers,
      ...config,
    });

    return {
      data: response.data.data || response.data || null,
      pagination: response.data.pagination || null,
      statusCode: response.status,
      message: response.data.message || response.statusText,
      error: null,
      success: response.data.success ?? true,
    };
  } catch (error: any) {
    const cookieStore: any = await cookies();
    const redirectedByURL = cookieStore?.get("redirectedByURL")?.value || null;
    if (
      axios.isAxiosError(error) &&
      (error.response?.status === 401 || error.response?.status === 403)
    ) {
      console.log("Token expired or unauthorized access detected");
      redirect('/login');
    }

    if (axios.isAxiosError(error)) {
      if (!error.response) {
        return {
          data: null,
          statusCode: 503,
          success: false,
          message:
            error.message ||
            "Server is unreachable. Please check the API server.",
          error: {
            message: "Could not connect to the server. Ensure it's running.",
          },
        };
      }

      return {
        data: null,
        statusCode: error.response?.status || 500,
        message: error.response?.data?.message || error.message,
        error: error.response?.data || error.message,
        success: false,
      };
    }

    return {
      data: null,
      statusCode: 500,
      message: "An unexpected error occurred",
      error: null,
      success: false,
    };
  }
}