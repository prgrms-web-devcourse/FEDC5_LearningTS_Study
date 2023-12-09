import { InputParamsType } from "../Utils/TypeDeclare";

const InputBox = ({ $target, onSubmit }: InputParamsType) => {
  const $form = document.createElement("form");

  if ($target) $target.appendChild($form);

  const render = () => {
    console.log(`렌더링 됨`);
    let isInit = false;
    $form.innerHTML = `
     <input type="text" name="todo" placeholder="할 일을 입력하세요!"/>
     <button>Add</button> 
    `;

    if (!isInit) {
      $form.addEventListener("submit", (e) => {
        e.preventDefault(); //기본 동작을 방지하는 것
        const $todo = $form.querySelector("input[name = todo]") as HTMLInputElement;
        const text = $todo.value;

        if (text.length > 1) {
          $todo.value = "";
          onSubmit(text);
        }
      });
      isInit = true;
    }
  };

  render();
};

export { InputBox };
