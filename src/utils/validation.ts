import { TodoItem } from "../types/todo.js";

const validation = {
  newTarget(target) {
    if (!target) {
      throw new Error("You must use new keyword");
    }
  },
  state(todoList: TodoItem[]) {
    return todoList.filter(
      (todo) =>
        typeof todo?.text === "string" && typeof todo?.isCompleted === "boolean"
    );
  },
};

export default validation;
