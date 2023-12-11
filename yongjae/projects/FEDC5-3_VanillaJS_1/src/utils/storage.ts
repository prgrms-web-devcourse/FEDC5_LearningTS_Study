import { TodoState } from "./validateState";

const storage = window.localStorage;

export const setItem = (key: string, value: string) => {
  try {
    storage.setItem(key, value);
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e);
    }
  }
};

export const getItem = (key: string, defaultValue: TodoState) => {
  try {
    const storedValue = storage.getItem(key);
    if (storedValue) {
      return JSON.parse(storedValue);
    }
    return defaultValue;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e);
      return defaultValue;
    }
  }
};
