import { ITodoHeader } from '../types/todoTypes';

export default function TodoHeader({ $target, text }: ITodoHeader) {
  const $header = document.createElement('h1');

  $target && $target.appendChild($header);

  const render = () => {
    $header.textContent = text;
  };
  render();
}
