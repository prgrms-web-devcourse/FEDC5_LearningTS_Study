import { QuerySelectType } from '../globalTypes';

interface TodoFormParams {
  $target: HTMLElement;
  onSubmit: (text: string) => void;
}

export default function TodoForm(
  this: any,
  { $target, onSubmit }: TodoFormParams
) {
  // new 미사용 방어코드
  if (!new.target) {
    throw new Error('new 키워드를 사용하여야 합니다.');
  }

  const $form = document.createElement('form');
  $form.className = 'todoForm';

  $target.appendChild($form);

  let isInit = false;

  this.render = () => {
    $form.innerHTML = `
      <input type="text" name="todo" />
      <button>Add</button>
      `;

    if (!isInit) {
      $form.addEventListener('submit', (e) => {
        e.preventDefault();
        // 이건 강사님이 수정한 코드
        const $todo: QuerySelectType<HTMLInputElement> =
          $form.querySelector('input[name="todo"]');

        if ($todo) {
          const text = $todo.value;
          // 입력값이 있을 경우만 추가
          if (text.length > 0) {
            $todo.value = '';
            onSubmit(text);
          }
        }
      });

      isInit = true;
    }
  };

  this.render();
}
