import { setItem } from "../utils/storage.js";
import validation from "../utils/validation.js";

// params.$target - 해당 컴포넌트가 추가될 DOM 앨리먼트
// params.initialState - 해당 컴포넌트의 초기 상태
export default function TodoList({ $target, initialState, updateCount }) {
  validation.newTarget(new.target);

  const $todoList = document.createElement("div");
  $target.appendChild($todoList);

  if (Array.isArray(initialState)) this.state = initialState;
  else this.state = [];

  this.setState = (nextState) => {
    const newState = validation.state(nextState);
    this.state = newState;
    setItem("todo", JSON.stringify(newState));
    updateCount(newState);
    this.render();
  };

  this.render = () => {
    $todoList.innerHTML = `
      <ul>
        ${this.state
          .map(
            ({ text, isCompleted }, index) => `
              <li data-index=${index} class="todoList ${
                isCompleted ? "completed" : ""
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

  $todoList.addEventListener("click", (e) => {
    const { target } = e;
    const $li = target.closest("li");

    if ($li) {
      const newState = [...this.state];
      const { index } = $li.dataset;

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
    }
  });

  this.render();
}
