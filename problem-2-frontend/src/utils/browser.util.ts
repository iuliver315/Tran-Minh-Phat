/* eslint-disable @typescript-eslint/no-explicit-any */
export const getItem = (key: string) => {
  const data = localStorage.getItem(key);
  if (!data || data === "null") return null;
  return JSON.parse(data);
};
export const setItem = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};
