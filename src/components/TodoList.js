import { setItem } from '../util/storage.js';
const STORAGE_KEY = 'todo';
export default class TodoList {
    constructor({ $app, initialState, updateTodoCounter, onRemoveTodo, onToggleTodo, }) {
        this.$todoList = document.createElement('div');
        $app.appendChild(this.$todoList);
        this.onRemoveTodo = onRemoveTodo;
        this.onToggleTodo = onToggleTodo;
        this.updateTodoCounter = updateTodoCounter;
        this.state = initialState;
        this.setEvent();
        this.render();
    }
    setState(nextState) {
        setItem(STORAGE_KEY, JSON.stringify(nextState));
        this.updateTodoCounter(nextState);
        this.state = nextState;
        this.render();
    }
    render() {
        this.$todoList.innerHTML = `
      <ul>
      ${this.state
            .map(({ title, isCompleted, id }) => {
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
    setEvent() {
        this.$todoList.addEventListener('click', (event) => {
            const target = event.target;
            const id = target.dataset.id;
            if (id) {
                target.className === 'toggled-text' && this.onToggleTodo(id);
                target.className === 'remove-button' && this.onRemoveTodo(id);
            }
        });
    }
}
