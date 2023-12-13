import Header from "./components/Header.js";
import TodoForm from "./components/TodoForm.js";
import TodoList from "./components/TodoList.js";
import TodoCount from "./components/TodoCount.js";
import { setItem } from "./utils/storage.js";
import { TodoCount as TodoCnt, TodoItem } from "./types/todo.js";

export default class App {
  private readonly todoList: TodoList;
  private readonly todoCount: TodoCount;

  constructor(
    private readonly $target: HTMLElement,
    private readonly initialState: TodoItem[],
    private readonly initialCount: TodoCnt
  ) {
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
      (state: TodoItem[]) => this.#updateCount(state)
      $target,
      initialState,
    );

    this.todoCount = new TodoCount($target, initialCount);
  }

  // 카운트 업데이트
  #updateCount(todoList: TodoItem[]) {
    const done = todoList.filter((todo) => todo.isCompleted).length;
    const nextState = { total: todoList.length, done };
    this.todoCount.setState(nextState);
    setItem("count", JSON.stringify(nextState));
  };
}
