import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleErrorMessage = (error: any): string => {
  const getMessage = (message: any): string => {
    if (typeof message === "object") {
      let errorMessages: string[] = [];
      for (const key in message) {
        if (Array.isArray(message[key])) {
          errorMessages = errorMessages.concat(message[key]);
        }
      }
      return errorMessages.join(" ");
    } else if (typeof message === "string") {
      return message;
    }
    return "";
  };

  if (error?.message) {
    return getMessage(error.message);
  } else if (error?.data?.message) {
    return getMessage(error.data.message);
  }
  return "An unknown error occurred";
};

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
