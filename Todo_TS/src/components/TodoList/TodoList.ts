import { validation } from "../Utils/Validation.ts";
import type { TodoListParamsType, StateType } from "../Utils/TypeDeclare.ts";

const TodoList = ({ $target, initialState, toggleCheck, removeFunction }: TodoListParamsType) => {
  let state = initialState;
  const $todoList = document.createElement("div");

  if ($target) $target.appendChild($todoList);

  const setState = (nextState: StateType) => {
    validation(nextState);
    state = nextState;
    render();
  };

  const render = () => {
    $todoList.innerHTML = `
              <ul>
                  ${state
                    .map(
                      ({ text, isCompleted }, index) =>
                        `<li id=${index} style=${isCompleted ? "color:#aaa;" : ""}${
                          isCompleted ? "text-decoration:line-through" : "text-decoration:none"
                        }><button>delete</button>${text}</li>`
                    )
                    .join("")}
              </ul>
          `;
    $todoList.querySelectorAll("li").forEach(($list) => {
      $list.addEventListener("click", (e: Event) => {
        const toggleText = e.target as HTMLLIElement;
        if (toggleText) {
          if (toggleText.tagName === "LI") {
            toggleCheck(Number(toggleText.id));
          }
        }
      });
    });

    $todoList.querySelectorAll("button").forEach(($button) => {
      $button.addEventListener("click", (e: Event) => {
        const target = e.target as HTMLButtonElement;
        const removeText = target.parentElement;
        if (removeText) {
          removeText.remove();
          removeFunction(Number(removeText.id));
        }
      });
    });
  };

  render();

  return {
    state,
    setState,
  };
};

export { TodoList };
