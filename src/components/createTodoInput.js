export default class createTodo {
    constructor({ $app, onSubmit }) {
        this.$form = document.createElement('form');
        $app.appendChild(this.$form);
        this.isInit = false;
        this.render();
        this.onSubmit = onSubmit;
    }
    render() {
        this.$form.innerHTML = `
        <input type="text" name = "todo" placeholder="할 일을 입력해주세요" />
        <button>등록</button>
    `;
        if (!this.isInit) {
            this.$form.addEventListener('submit', (e) => {
                e.preventDefault();
                const $input = this.$form.querySelector('input[name="todo"]');
                if ($input) {
                    const text = $input.value;
                    this.onSubmit(text);
                    $input.value = '';
                }
            });
        }
    }
}
