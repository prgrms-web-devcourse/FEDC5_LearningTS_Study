import { ITodo } from '../types/todoTypes';

export const storageSetItem = (key: string, value: string) => {
  try {
    window.localStorage.setItem(key, value);
  } catch (e) {
    console.error(e);
  }
};
// export const storageGetItem = <T>(key: string, defaultValue: T): T => {
// 제네릭 타입을 사용하려면 이렇게 하는게 맞을까요???
// 위 방법을 사용하면 App.ts 11번줄에서 .idx를 접근할수가 없더라고요.. -> Property 'idx' does not exist on type 'never'.ts(2339)
export const storageGetItem = (
  key: string,
  defaultValue = [] as ITodo[],
): ITodo[] => {
  try {
    const storedValue = window.localStorage.getItem(key);
    if (storedValue) {
      return JSON.parse(storedValue);
    }
    return defaultValue;
  } catch (e) {
    console.error(e);
    return defaultValue;
  }
};
