const storage = (function (storage) {
  const setItem = (key, value) => {
    try {
      storage.setItem(key, value);
    } catch (error) {
      console.log(error);
    }
  }

  const getItem = (key, defaultValue) => {
    try {
      const data = storage.getItem(key);
      if (data) return JSON.parse(data);
      return defaultValue;
    } catch (error) {
      console.log(error);
      return defaultValue;
    }
  }

  return {
    setItem,
    getItem
  }
})(window.localStorage);