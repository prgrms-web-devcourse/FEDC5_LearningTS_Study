
export default class TodoForm {
  private readonly $form = document.createElement("form");
  private isInit = false;

  constructor(
    private readonly $target: HTMLElement,
    private readonly onSubmit: (text: string) => void
  ) {
    this.$target.appendChild(this.$form);
    this.render();
  }

  private render() {
    this.$form.innerHTML = `
      <input type="text" placeholder="할 일을 입력하세요" name="todo" />
      <button>추가</button>
    `;

    if (!this.isInit) {
      this.$form.addEventListener("submit", (e) => {
        e.preventDefault();
        const $todo = this.$form.querySelector<HTMLInputElement>("input[name=todo]");
        if (!$todo) return;
        const text = $todo.value;
        if (text.length > 1) {
          $todo.value = "";
          this.onSubmit(text);
        } else alert("두 글자 이상 입력해주세요");
      });
    }
  };
}
