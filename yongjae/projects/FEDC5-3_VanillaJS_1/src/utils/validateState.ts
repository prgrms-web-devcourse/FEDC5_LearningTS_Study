import { ERROR_MESSAGES } from "../constants";
import { Todos } from "../types/states";
// todo 상태의 유효검사 함수
export function validateState(state: Todos, origin: Todos = []) {
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
        typeof val.id === "string"
    )
  ) {
    return state;
  }
  console.warn(ERROR_MESSAGES["invalidState"]);
  return origin;
}

export function filterValidStorageState(
  state: Todos,
  defaultState: Todos = []
) {
  try {
    return state.filter(
      (val) =>
        val &&
        Object.hasOwn(val, "text") &&
        val.text.split(" ").join("").length &&
        Object.hasOwn(val, "isCompleted") &&
        typeof val.isCompleted === "boolean" &&
        Object.hasOwn(val, "id") &&
        typeof val.id === "string"
    );
  } catch (e) {
    if (e instanceof Error) {
      console.warn(ERROR_MESSAGES[e.message]);
    }
    return defaultState;
  }
}
