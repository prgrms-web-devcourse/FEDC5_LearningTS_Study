import { setItem } from '../util/storage.js';
import { TodoListProps, Todo } from '../util/types.js';

const STORAGE_KEY = 'todo';

export default class TodoList {
  $todoList: HTMLDivElement;
  state: Todo[];
  updateTodoCounter: (nextState: Todo[]) => void;

  constructor({ $app, todoInitialState, updateTodoCounter }: TodoListProps) {
    this.$todoList = document.createElement('div');
    $app.appendChild(this.$todoList);

    this.updateTodoCounter = updateTodoCounter;
    this.state = todoInitialState;
    this.setEvent();
    this.render();
  }

  completedTodo(id: string): void {
    const nextState = this.state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
      return todo;
    });
    this.setState(nextState);
  }

  removeTodo(id: string): void {
    const nextState = this.state.filter((todo) => todo.id !== id);
    this.setState(nextState);
  }

  setState(nextState: Todo[]): void {
    setItem(STORAGE_KEY, JSON.stringify(nextState));
    this.updateTodoCounter(nextState);
    this.state = nextState;
    this.render();
  }

  render(): void {
    this.$todoList.innerHTML = `
      <ul>
      ${this.state
        .map(({ title, isCompleted, id }: Todo) => {
          return `
          <li class="toggled-text" data-id="${id}" 
          style="text-decoration: ${isCompleted ? 'line-through' : 'none'}">
            ${title} 
              <button class="remove-button" data-id="${id}">
                Remove
              </button> 
          </li>
            `;
        })
        .join('')}
      </ul>
      `;
  }

  setEvent(): void {
    this.$todoList.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const id = target.dataset.id as string | null;
      if (id !== null) {
        target.className === 'toggled-text' && this.completedTodo(id);
        target.className === 'remove-button' && this.removeTodo(id);
      }
    });
  }
}
