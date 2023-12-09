const storage = window.localStorage;

export const setItem = (key: string, value: string) => {
  try {
    storage.setItem(key, value);
  } catch (error) {
    console.log(error);
  }
};

export const getItem = <T>(key: string, defaultValue: T): T => {
  try {
    const data = storage.getItem(key);
    if (data) return JSON.parse(data);
    return defaultValue;
  } catch (error) {
    console.log(error);
    return defaultValue;
  }
};
