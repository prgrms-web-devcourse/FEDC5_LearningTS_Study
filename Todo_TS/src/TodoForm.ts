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

        const $input = <HTMLInputElement>(
          $form.querySelector('input[name=todo]')
        );
        const text = $input.value;
        if (text.length > 1) {
          $input.value = '';

          onSubmit(text);
        }
      });
    }
    isInit = !isInit;
  };
  render();
}
