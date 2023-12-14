import { InputParamsType } from "../Utils/TypeDeclare.ts";

const InputBox = ({ $target, onSubmit }: InputParamsType) => {
  const $form = document.createElement("form");

  if ($target) $target.appendChild($form);

  const render = () => {
    let isInit = false;
    $form.innerHTML = `
     <input type="text" name="todo" placeholder="할 일을 입력하세요!"/>
     <button>Add</button> 
    `;

    if (!isInit) {
      $form.addEventListener("submit", (e) => {
        e.preventDefault();
        const $todo = $form.querySelector<HTMLInputElement>("input[name = todo]");

        if ($todo) {
          const text = $todo.value;
          if (text.length > 1) {
            $todo.value = "";
            onSubmit(text);
          }
        }
      });
      isInit = true;
    }
  };

  render();
};

export { InputBox };
