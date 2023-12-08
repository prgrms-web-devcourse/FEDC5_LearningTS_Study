import { Todo, TodoCounterProps } from '../util/types.js';

export default class TodoCounter {
  state: Todo[];
  $counter: HTMLDivElement;

  constructor({ $app, initialState }: TodoCounterProps) {
    this.$counter = document.createElement('div');
    $app.appendChild(this.$counter);
    this.state = initialState;
    this.render();
  }

  setState(nextState: Todo[]): void {
    this.state = nextState;
    this.render();
  }

  render(): void {
    this.$counter.innerHTML = `
      <div class="todo-counter">Total: ${this.state.length}</div>
      <div class="done-counter">Done: ${
        this.state.filter((e) => e.isCompleted).length
      }</div>
    `;
  }
}
