import { setItem } from "../utils/storage.js";
import validation from "../utils/validation.js";
import { TodoList as TodoLi } from "../types/todo.js";

export default class TodoList {
  state: TodoLi;
  private readonly $todoList = document.createElement("div");

  constructor(
    private readonly $target: HTMLElement,
    private readonly initialState: TodoLi,
    private readonly updateCount: (state: TodoLi) => void
  ) {
    $target.appendChild(this.$todoList);
    this.state = initialState;
    this.render();
    this.setEvent();
  }

  setState(nextState: TodoLi) {
    const newState = validation.state(nextState);
    this.state = newState;
    setItem("todo", JSON.stringify(newState));
    this.updateCount(newState);
    this.render();
  };

  private render() {
    this.$todoList.innerHTML = `
      <ul>
        ${this.state
        .map(
          ({ text, isCompleted }, index) => `
              <li data-index=${index} class="todoList ${isCompleted ? "completed" : ""
            }">
                ${text}
                <button class="deleteBtn">삭제</button>
              </li>
            `
        )
        .join("")}
      </ul>
    `;
  };

  private setEvent() {
    this.$todoList.addEventListener("click", (e) => {
      const target = e.target as HTMLLIElement;
      const $li = target.closest("li");

      if (!$li) return;

      const newState = [...this.state];
      if (typeof $li.dataset.index !== "string") return;
      const index = +$li.dataset.index;

      if (target.className === "deleteBtn") {
        newState.splice(index, 1);
        this.setState(newState);
      } else if (target.className.includes("todoList")) {
        const isCompleted = target.className.includes("completed");
        if (isCompleted) target.classList.remove("completed");
        else target.classList.add("completed");
        newState[index] = {
          ...newState[index],
          isCompleted: !isCompleted,
        };
        this.setState(newState);
      }
    });
  }
}
