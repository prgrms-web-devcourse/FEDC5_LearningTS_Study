import type { setStorage, getStorage, StateType } from "./TypeDeclare";
const $storage = window.localStorage;

export const setItem: setStorage<StateType> = (key: string, value: StateType) => {
  try {
    $storage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(e instanceof Error);
  }
};

export const getItem: getStorage<StateType> = (key: string, defaultValue = []) => {
  try {
    const storedValue = $storage.getItem(key);
    if (storedValue) {
      return JSON.parse(storedValue);
    }
    return defaultValue;
  } catch (e) {
    console.error(e instanceof Error);
    return defaultValue;
  }
};
