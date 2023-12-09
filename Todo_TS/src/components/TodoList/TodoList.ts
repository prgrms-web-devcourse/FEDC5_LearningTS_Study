import type { TodoListParamsType, StateType } from "../Utils/TypeDeclare";

const TodoList = ({ $target, initialState, toggleCheck, removeFunction }: TodoListParamsType) => {
  //   if (!new.target) {
  //     throw new TypeError("calling TodoList without new is invalid");
  //   }
  const $todoList = document.createElement("div");

  if ($target) $target.appendChild($todoList);
  let state = initialState;

  const setState = (nextState: StateType) => {
    // validation(nextState);
    state = nextState as StateType;
    render();
    console.log(state);
  };

  const render = () => {
    console.log(`rendered!`, state);
    $todoList.innerHTML = ``;
    $todoList.innerHTML = `
              <ul>
                  ${state
                    .map(
                      ({ text, isCompleted }, index) =>
                        `<li id=${index} style=${
                          isCompleted ? "text-Decoration:line-through" : "text-Decoration:none"
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
    console.log(`render end`, state);
  };

  render();

  return {
    state,
    setState,
  };
};

export { TodoList };
