import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const formatMessageTime = (timestamp: string) => {
  const messageDate = new Date(timestamp);
  const now = new Date();
  
  // Check if the message is from today
  const isToday = messageDate.toDateString() === now.toDateString();
  
  // Check if the message is from yesterday
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday = messageDate.toDateString() === yesterday.toDateString();
  
  // Check if the message is from this year
  const isThisYear = messageDate.getFullYear() === now.getFullYear();
  
  if (isToday) {
    // For messages from today, just show the time
    return messageDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } else if (isYesterday) {
    // For messages from yesterday, show "Yesterday" and the time
    return `Yesterday ${messageDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })}`;
  } else if (isThisYear) {
    // For messages from this year but not today/yesterday, show month, day and time
    return `${messageDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })} ${messageDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })}`;
  } else {
    // For older messages, show full date and time
    return `${messageDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })} ${messageDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })}`;
  }
};