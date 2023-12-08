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
    return storedValue ? JSON.parse(storedValue) : defaultValue;
};
