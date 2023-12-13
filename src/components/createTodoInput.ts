import { createTodoProps } from '../util/types.js';

export default class createTodo {
  private readonly $form: HTMLFormElement;
  private readonly isInit: boolean;
  private readonly onSubmit: (text: string) => void;

  constructor({ $app, onSubmit }: createTodoProps) {
    this.$form = document.createElement('form');
    $app.appendChild(this.$form);
    this.isInit = false;
    this.render();
    this.onSubmit = onSubmit;
  }

  render(): void {
    this.$form.innerHTML = `
        <input type="text" name = "todo" placeholder="할 일을 입력해주세요" />
        <button>등록</button>
    `;

    if (!this.isInit) {
      this.$form.addEventListener('submit', (e) => {
        e.preventDefault();

        const $input =
          this.$form.querySelector<HTMLInputElement>('input[name="todo"]');

        if ($input) {
          const text = $input.value;
          this.onSubmit(text);
          $input.value = '';
        }
      });
    }
  }
}
