import { TodosType } from "../types";

export type setStorage<T> = (key: string, value: T) => void;
export type getStorage<T> = (key: string, defaultValue: T) => T;

const storage = window.localStorage;

export const setItem: setStorage<TodosType> = (
  key: string,
  value: TodosType
) => {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e);
    }
  }
};

export const getItem: getStorage<TodosType> = (
  key: string,
  defaultValue = [] as TodosType
) => {
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
