import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cx(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function capitalize(str?: string) {
    if(!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
