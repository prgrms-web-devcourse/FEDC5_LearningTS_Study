import { Todo } from '../types/todo'

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
// 이부분 제네릭으로 구현하는 방법이 좋을까요??
// export const getItem = <T>(key: string, defaultValue: T): T => {}
export const getItem = (key: string, defaultValue: []): Todo => {
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
