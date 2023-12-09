import Header from "./components/Header.js";
import TodoForm from "./components/TodoForm.js";
import TodoList from "./components/TodoList.js";
import TodoCount from "./components/TodoCount.js";
import { setItem } from "./utils/storage.js";
import { TodoCount as TodoCnt, TodoItem } from "./types/todo.js";

export default class App {
  // todoList: TodoList;
  // todoCount: TodoCount;

  constructor(
    protected readonly $target: HTMLElement,
    protected readonly initialState: TodoItem[],
    protected readonly initialCount: TodoCnt
  ) {

    // new TodoForm({
    //   $target: this.$target,
    //   onSubmit: (text: string) => {
    //     const nextState = [...this.todoList.state, { text, isCompleted: false }];
    //     this.todoList.setState(nextState);
    //   },
    // });

    // this.todoList = new TodoList({
    //   $target: this.$target,
    //   initialState: this.initialState,
    //   updateCount: (state: TodoItem[]) => this.updateCount(state),
    // });

    // this.todoCount = new TodoCount({
    //   $target: this.$target,
    //   initialCount: this.initialCount,
    // });
  }

  // 카운트 업데이트
  // updateCount(todoList: TodoItem[]) {
  // const done = todoList.filter((todo) => todo.isCompleted).length;
  // const nextState = { total: todoList.length, done };
  // this.todoCount.setState(nextState);
  // setItem("count", JSON.stringify(nextState));
  // };
}
