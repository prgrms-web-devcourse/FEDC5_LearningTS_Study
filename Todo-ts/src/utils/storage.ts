export const storage = (function (storage) {
  const setItem = (key: string, value: string) => {
    try {
      storage.setItem(key, value);
    } catch (e) {
      console.log(e);
    }
  };

  const getItem = (key: string, defaultValue: string | string[]) => {
    try {
      const storedValue = storage.getItem(key);

      if (storedValue) {
        return JSON.parse(storedValue);
      }
      return defaultValue;
    } catch (e) {
      console.log(e);
      return defaultValue;
    }
  };

  return {
    setItem,
    getItem,
  };
})(window.localStorage);
