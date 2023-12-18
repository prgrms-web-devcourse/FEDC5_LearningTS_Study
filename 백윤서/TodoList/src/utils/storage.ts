import { StorageKey } from "../types/todo";

const storage = window.localStorage;

export const setItem = (key: string, value: string) => {
  try {
    storage.setItem(key, value);
  }
  catch (error: unknown) {
    if (error instanceof Error) console.log(error);
  }
};

export const getItem = <T>(key: StorageKey, defaultValue: T): T => {
  try {
    const data = storage.getItem(key);
    if (data) return JSON.parse(data);
    return defaultValue;
  } catch (error) {
    if (error instanceof Error) console.log(error);
    return defaultValue;
  }
};
