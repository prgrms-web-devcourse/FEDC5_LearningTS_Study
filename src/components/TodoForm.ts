
export default class TodoForm {
  private readonly $form = document.createElement("form");

  constructor(
    private readonly $target: HTMLElement,
    private readonly onSubmit: (text: string) => void
  ) {
    $target.appendChild(this.$form);
    this.render();
    this.setEvent();
  }

  private render() {
    this.$form.innerHTML = `
      <input type="text" placeholder="할 일을 입력하세요" name="todo" minLength="2" autocomplete="off" />
      <button>추가</button>
    `;
  };

  private setEvent() {
    this.$form.addEventListener("submit", (e) => {
      e.preventDefault();
      const $todo = this.$form.querySelector<HTMLInputElement>("input[name=todo]");
      if (!$todo) return;
      const text = $todo.value;
      $todo.value = "";
      this.onSubmit(text);
    });
  }
}
