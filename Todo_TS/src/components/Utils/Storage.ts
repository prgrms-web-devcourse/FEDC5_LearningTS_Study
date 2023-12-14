const $storage = window.localStorage;

export const setItem = (key: string, value: string) => {
  try {
    $storage.setItem(key, value);
  } catch (e) {
    console.error(e instanceof Error);
  }
};

export const getItem = (key: string, defaultValue = []) => {
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
