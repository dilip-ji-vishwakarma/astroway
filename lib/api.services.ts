"use server"
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from "axios"
import { getServerSession } from "next-auth"
import { authOptions } from "./authOptions"


const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export async function apiServices<T>(
  endpoint: string,
  method: "get" | "post" | "put" | "patch" | "delete",
  data?: T,
  config: AxiosRequestConfig = {},
  apiToken?: string
): Promise<{
  data: any
  statusCode: number
  message: string
  error: any
}> {
  try {
    const session: any = await getServerSession(authOptions)
    const token = session?.user?.access_token || apiToken

    const headers = {
      ...(token && { Authorization: `Bearer ${token}` }),
      ...config.headers,
    }

    const response = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      data: method === "get" || method === "delete" ? undefined : data,
      headers,
      ...config,
    })

    return {
      data: response.data,
      statusCode: response.status,
      message: response.statusText,
      error: null,
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      return {
        data: null,
        statusCode: error.response?.status || 500,
        message: error.response?.statusText || error.message,
        error: error.response?.data || error.message,
      }
    }

    return {
      data: null,
      statusCode: 500,
      message: "Unexpected error",
      error,
    }
  }
}
