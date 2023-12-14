import { ITodoForm } from '../types/todoTypes';

export default function TodoForm({ $target, onSubmit }: ITodoForm) {
  const $form = document.createElement('form');
  $target && $target.appendChild($form);

  let isInit = false;

  const render = () => {
    $form.innerHTML = `
      <input type = "text" name = "todo"/>
      <button>➕</button>`;
    if (!isInit) {
      $form.addEventListener('submit', (e) => {
        e.preventDefault();

        const $input =
          $form.querySelector<HTMLInputElement>('input[name=todo]');
        const text = $input ? $input.value : '';
        if (text.length > 1) {
          if ($input) $input.value = '';

          onSubmit(text);
        }
      });
    }
    isInit = !isInit;
  };
  render();
}
