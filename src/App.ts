import Header from "./components/Header.js";
import TodoForm from "./components/TodoForm.js";
import TodoList from "./components/TodoList.js";
import TodoCount from "./components/TodoCount.js";
import { setItem, getItem } from "./utils/storage.js";
import { TodoCount as TodoCnt, TodoList as TodoLi } from "./types/todo.js";
export default class App {
  private readonly todoList: TodoList;
  private readonly todoCount: TodoCount;
  private readonly initialState: TodoLi;
  private readonly initialCount: TodoCnt;

  constructor(
    private readonly $target: HTMLElement,
  ) {
    this.initialState = getItem("todo", []);
    this.initialCount = getItem("count", { total: 0, done: 0 });

    new Header($target, "Todo List");

    new TodoForm(
      $target,
      (text: string) => {
        const nextState = [
          ...this.todoList.state,
          { text, isCompleted: false }
        ];
        this.todoList.setState(nextState);
      },
    );

    this.todoList = new TodoList(
      $target,
      this.initialState,
      (state: TodoLi) => this.#updateCount(state)
    );

    this.todoCount = new TodoCount($target, this.initialCount);
  }

  // 카운트 업데이트
  #updateCount(todoList: TodoLi) {
    const done = todoList.filter((todo) => todo.isCompleted).length;
    const nextState = { total: todoList.length, done };
    this.todoCount.setState(nextState);
    setItem("count", JSON.stringify(nextState));
  };
}
