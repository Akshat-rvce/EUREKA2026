declare module 'clsx' {
  export type ClassValue = string | number | boolean | null | undefined | ClassValue[] | Record<string, boolean | null | undefined>;
  export default function clsx(...inputs: ClassValue[]): string;
  export function clsx(...inputs: ClassValue[]): string;
}
