import {
  TodoComponentStatelessContext,
  TodoFormProps,
} from "../types/components";

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

        const $todo = $form.querySelector<HTMLInputElement>(`input[name=todo]`);

        let text = "";
        if ($todo && $todo.value) {
          text = $todo.value;
        }

        if (text.length > 1 && text.trim()) {
          if ($todo) {
            $todo.value = "";
            onSubmit(text);
          }
        }
      });
    }
  };

  this.render();
} as any as { new (props: TodoFormProps): TodoComponentStatelessContext };

export default TodoForm;
