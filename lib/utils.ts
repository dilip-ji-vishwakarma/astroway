/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import moment from 'moment';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatSingleDate = (date: any, forceYear?: boolean) => {
  if (!date) {
    return 'No date'
  }

  let dateFormatted = moment(date).format('MMM DD')
  const currentYear = new Date().getFullYear().toString()

  if (currentYear !== moment(date).format('Y') || forceYear) {
    dateFormatted = moment(date).format('MMM DD, YYYY')
  }

  return dateFormatted
}

export const getImageUrl = (imagePath:any) => {
  if (!imagePath) return "";
  return `${BASE_URL}${imagePath}`;
};
