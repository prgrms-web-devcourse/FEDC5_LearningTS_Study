const storage = window.localStorage;

export const setItem = (key: string, value: string) => {
  try {
    storage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};

export const getItem = (key: string, defaultValue: []) => {
  const storedValue = storage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
};
