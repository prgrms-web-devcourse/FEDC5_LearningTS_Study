import { ITodoCount, ITodo } from '../types/todoTypes';

export default function TodoCount({ $target, initialState }: ITodoCount) {
  const $count = document.createElement('div');
  $target && $target.appendChild($count);

  const render = (newState: ITodo[]) => {
    if (newState) {
      const lenAll = newState.length;
      const lenCompleted = newState.filter(
        (todo: ITodo) => todo.isCompleted,
      ).length;

      $count.innerHTML = lenAll
        ? `You did ${lenCompleted} out of ${lenAll} !`
        : '';
    }
  };
  render(initialState);
  return { render };
  // 그냥 return render 했더니 TodoCount 자체가 render인 ()=>voidd 함수가 리턴됨..
}
