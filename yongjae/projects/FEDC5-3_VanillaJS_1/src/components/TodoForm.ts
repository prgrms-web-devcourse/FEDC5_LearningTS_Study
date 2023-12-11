import { TodoComponentStatelessContext } from "../types/todo";

interface TodoFormProps {
  $target: HTMLElement;
  onSubmit: (text: string) => void;
}

const TodoForm = function (
  this: TodoComponentStatelessContext,
  { $target, onSubmit }: TodoFormProps
) {
  const $form = document.createElement("form");
  let isInit = false;
  $target.appendChild($form);

  this.render = () => {
    $form.innerHTML = `
      <input type='text' name=todo />
    `;
    if (!isInit) {
      $form.addEventListener("submit", (e) => {
        e.preventDefault();

        const $todo = $form.querySelector(
          `input[name=todo]`
        ) as HTMLInputElement;

        let text = "";
        if ($todo && $todo.value) {
          text = $todo.value;
        }

        if (text.length > 1 && text.trim()) {
          $todo.value = "";
          onSubmit(text);
        }
      });
    }
  };

  this.render();
} as any as { new (props: TodoFormProps): TodoComponentStatelessContext };

export default TodoForm;
