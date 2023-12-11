export interface TodoItemContext {
  text: string;
  id: number;
  isCompleted: boolean;
}
export type TodoState = TodoItemContext[];

// todo 상태의 유효검사 함수
export function validateState(state: TodoState, origin = []) {
  if (
    Array.isArray(state) &&
    state.every(
      (val) =>
        val &&
        Object.hasOwn(val, "text") &&
        val.text.split(" ").join("").length &&
        Object.hasOwn(val, "isCompleted") &&
        typeof val.isCompleted === "boolean" &&
        Object.hasOwn(val, "id") &&
        typeof val.id === "number"
    )
  )
    return state;
  return origin;
}

export function filterValidStorageState(state: TodoState, defaultState = []) {
  try {
    return state
      .filter(
        (val) =>
          val &&
          Object.hasOwn(val, "text") &&
          val.text.split(" ").join("").length &&
          Object.hasOwn(val, "isCompleted") &&
          typeof val.isCompleted === "boolean" &&
          Object.hasOwn(val, "id") &&
          typeof val.id === "number"
      )
      .map((val, idx) => ({ ...val, id: idx }));
  } catch (e) {
    console.log(e);
    return defaultState;
  }
}
