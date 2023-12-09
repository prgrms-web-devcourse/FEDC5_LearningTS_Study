import { TodoCount as TodoCnt } from "../types/todo.js";

export default class TodoCount {
  private readonly $container = document.createElement("div");
  private state: TodoCnt;

  constructor(
    private readonly $target: HTMLElement,
    private readonly initialCount: TodoCnt
  ) {
    this.$target.appendChild(this.$container);

    if (this.initialCount.total) {
      this.state = this.initialCount;
    } else this.state = { total: 0, done: 0 };

    this.render();
  }

  setState(nextState: TodoCnt) {
    this.state = nextState;
    this.render();
  };

  private render() {
    this.$container.textContent = `완료 ${this.state.done}개 / 총 ${this.state.total}개`;
  };
}
