import { TodosType } from "../types";
// todo 상태의 유효검사 함수
export function validateState(state: TodosType, origin = []) {
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

export function filterValidStorageState(
  state: TodosType,
  defaultState = [] as TodosType
) {
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
    if (e instanceof Error) {
      console.log(e);
    }
    return defaultState;
  }
}
