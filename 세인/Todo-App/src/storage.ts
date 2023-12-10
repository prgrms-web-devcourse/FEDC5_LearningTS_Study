const storage: Storage = window.localStorage

export const setItem = (key: string, value: string) => {
  try {
    storage.setItem(key, value)
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

export const getItem = (key: string, defaultValue: []) => {
  try {
    const storedValue = storage.getItem(key)
    if (storedValue) {
      return JSON.parse(storedValue)
    }
    return defaultValue
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    return defaultValue
  }
}
