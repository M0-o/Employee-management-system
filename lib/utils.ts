import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { redirect } from "next/navigation";
import { type growthDataItem } from "@/data/types";

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function encodedRedirect(
  type: "error" | "success",
  path: string,
  message: string,
) {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}

export function formatDate(dateString: string | null): string {
  if (!dateString) return "N/A"
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}


export function displayValue(value: any): string {
  if (value === null || value === undefined) return "N/A"
  return String(value)
}


export function filterGrowthData(chartData: growthDataItem[] | null , timeRange: string): growthDataItem[] {
 return  chartData?.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date(chartData[chartData.length - 1]?.date || new Date())
    let daysToSubtract = 365
    if (timeRange === "183d") {
      daysToSubtract = 183
    } else if (timeRange === "92d") {
      daysToSubtract = 92
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  }) || []
} 
  