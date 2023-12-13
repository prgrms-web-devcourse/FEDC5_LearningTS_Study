import { setItem } from '../util/storage.js';
import { TodoListProps, Todo } from '../util/types.js';

const STORAGE_KEY = 'todo';

export default class TodoList {
  private readonly $todoList: HTMLDivElement;
  private state: Todo[];
  private readonly updateTodoCounter: (nextState: Todo[]) => void;
  private readonly onRemoveTodo: (id: string) => void;
  private readonly onToggleTodo: (id: string) => void;
  constructor({
    $app,
    initialState,
    updateTodoCounter,
    onRemoveTodo,
    onToggleTodo,
  }: TodoListProps) {
    this.$todoList = document.createElement('div');
    $app.appendChild(this.$todoList);

    this.onRemoveTodo = onRemoveTodo;
    this.onToggleTodo = onToggleTodo;
    this.updateTodoCounter = updateTodoCounter;

    this.state = initialState;
    this.setEvent();
    this.render();
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
      const id = target.dataset.id as string;
      if (id) {
        target.className === 'toggled-text' && this.onToggleTodo(id);
        target.className === 'remove-button' && this.onRemoveTodo(id);
      }
    });
  }
}
