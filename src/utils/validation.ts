import { TodoItem } from "../types/todo.js";

const validation = {
  state(todoList: TodoItem[]) {
    return todoList.filter(
      (todo) =>
        typeof todo?.text === "string" && typeof todo?.isCompleted === "boolean"
    );
  },
};

export default validation;
