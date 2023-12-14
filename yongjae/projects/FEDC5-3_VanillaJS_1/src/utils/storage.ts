import { ERROR_MESSAGES } from "../constants";
import { Todos } from "../types/states";

export type setStorage<T> = (key: string, value: T) => void;
export type getStorage<T> = (key: string, defaultValue: T) => T;

const storage = window.localStorage;

export const setItem: setStorage<Todos> = (key: string, value: Todos) => {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.warn(ERROR_MESSAGES[e.message]);
    }
  }
};

export const getItem: getStorage<Todos> = (key: string, defaultValue = []) => {
  try {
    const storedValue = storage.getItem(key);
    if (storedValue) {
      return JSON.parse(storedValue);
    }
    return defaultValue;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.warn(ERROR_MESSAGES[e.message]);
      return defaultValue;
    }
  }
};
