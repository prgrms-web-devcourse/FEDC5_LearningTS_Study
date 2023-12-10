// params.$target - 해당 컴포넌트가 추가가 될 DOM element
// params.initialState - 해당 컴포넌트의 초기 상태

import { StateArray } from '../globalTypes';
import validation from '../utils/validation';

interface TodoListParams {
  $target: HTMLElement;
  initialState: StateArray;
  onClick: (arg1: string, arg2: string | undefined) => void;
}

export default function TodoList(
  this: any,
  { $target, initialState, onClick }: TodoListParams
) {
  // new 미사용 방어코드
  if (!new.target) {
    throw new Error('new 키워드를 사용하여야 합니다.');
  }

  const $todoList = document.createElement('div');
  $todoList.className = 'todoList';

  $target.appendChild($todoList);

  // state 유효성 검사
  this.state = validation(initialState);

  this.setState = (nextState: StateArray) => {
    // state 유효성 검사
    this.state = validation(nextState);

    this.render();
  };

  this.render = () => {
    $todoList.innerHTML = `
          <ul>
              ${this.state
                .map(({ text, isCompleted }, i: string) => {
                  return `<li><span data-id="${i}" class="${
                    isCompleted ? 'completed' : 'uncompleted'
                  }">${text}</span><button data-id="${i}">삭제</button></li>`;
                })
                .join('')}
          </ul>
      `;

    this.complete();
    this.delete();
  };
  // todolist 삭선 기능
  this.complete = () => {
    const $todos = document.querySelectorAll('li');

    $todos.forEach((todo) => {
      todo.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target instanceof HTMLElement) {
          // 클릭된 todo의 text와 id
          const [clickedText, clickedId] = [
            target.innerText,
            target.dataset.id,
          ];

          // 클릭 이벤트 내보내기
          onClick(clickedText, clickedId);
        }
      });
    });
  };

  // 삭제 버튼 기능
  this.delete = () => {
    // DOM element
    const $deleteButtons = document.querySelectorAll('li > button');

    $deleteButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        e.stopPropagation(); // 이벤트 버블링 방지

        const target = e.target;
        if (target && target instanceof HTMLElement) {
          const [text, id] = [target.innerText, target.dataset.id];
          // 클릭 이벤트 내보내기
          onClick(text, id);
        }
      });
    });
  };

  this.render();
}
