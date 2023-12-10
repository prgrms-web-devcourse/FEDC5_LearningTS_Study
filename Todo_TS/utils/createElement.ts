import { ICreateTodo } from '../types/todoTypes';

export const createTodoElement = ({
  $target,
  element,
  idx,
  text,
}: ICreateTodo) => {
  const $element: any = document.createElement(element);
  ////// :HTMLElement 를 주면 Type 'number' is not assignable to type 'string'.ts(2322)
  $element.dataset.idx = idx;
  $element.innerHTML = text;
  $target && $target.appendChild($element);

  return $element;
};
