import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { redirect } from "next/navigation";

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