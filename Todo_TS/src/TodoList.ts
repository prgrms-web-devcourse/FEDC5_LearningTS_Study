import { ITodoList, ITodo, ICreateTodo } from '../types/todoTypes';
import { createTodoElement } from '../utils/createElement';

export default function TodoList({
  $target,
  initialState,
  handleComplete,
  handleDelete,
}: ITodoList) {
  const $listWrap = document.createElement('ul');
  $target && $target.appendChild($listWrap);

  let state: ITodo[] = initialState;
  let isInit = false;

  const setState = (nextState: ITodo[]) => {
    state = nextState;

    if (!isInit) {
      $listWrap.innerHTML = '';
    }

    state &&
      state.map(({ text, isCompleted, idx }: ITodo) => {
        const todoDiv = document.createElement('div');
        todoDiv.className = 'list_div';

        // prettier-ignore
        const todoLi = createTodoElement({$target: todoDiv,element: "li",idx,text});
        if (isCompleted) {
          todoLi.className = 'done';
        }
        todoLi.addEventListener('click', (e: MouseEvent) => {
          // 이벤트에 대한 타입은 MouseEvent가 맞나요?
          // 이후에 e.target 등으로 접근하기 위해 항상 as HTMLLiElement 처럼 단언하는 방법밖에 없을까요..?
          const idx = (e.target as HTMLLIElement).dataset.idx;
          if (idx) handleComplete(parseInt(idx));
        });

        // prettier-ignore
        const newTodoBtn = createTodoElement({$target: todoDiv, element:"button", idx, text:"🗑️"})
        newTodoBtn.addEventListener('click', (e: MouseEvent) => {
          const idx = (e.target as HTMLButtonElement).dataset.idx;
          if (idx) handleDelete(parseInt(idx));
        });

        $listWrap && $listWrap.appendChild(todoDiv);
      });
    $listWrap && $listWrap.before($listWrap);
  };

  setState(initialState);

  return { state, setState };
}
