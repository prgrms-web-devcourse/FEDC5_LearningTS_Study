const storage = window.localStorage;
export const setItem = (key, value) => {
    try {
        storage.setItem(key, value);
    }
    catch (e) {
        console.log(e);
    }
};
export const getItem = (key, defaultValue) => {
    const storedValue = storage.getItem(key);
    try {
        return storedValue ? JSON.parse(storedValue) : defaultValue;
    }
    catch (e) {
        console.error('Error parsing stored value:', e);
        return defaultValue;
    }
};
