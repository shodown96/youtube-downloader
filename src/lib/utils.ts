import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(seconds: number) {
  if (seconds >= 3600) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return minutes > 0 ? `${hours}:${minutes}` : `${hours} ${hours > 1 ? 'hr' : 'hrs'}`;
  } else if (seconds < 60) {
    return `${Math.floor(seconds)}s`;
  } else {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} mins`;
  }
}

export function getLimitedText(text: string, limit = 200) {
  if (text.length > limit) {
    return `${text.substring(0, limit - 1)}...`
  }
  return text
}

export function isValidYoutubeURL(url: string) {
  const regex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})(&.*)?$/;
  return regex.test(url);
}