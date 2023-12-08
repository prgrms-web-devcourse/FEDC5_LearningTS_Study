export default class TodoCounter {
    constructor({ $app, initialState }) {
        this.$counter = document.createElement('div');
        $app.appendChild(this.$counter);
        this.state = initialState;
        this.render();
    }
    setState(nextState) {
        this.state = nextState;
        this.render();
    }
    render() {
        this.$counter.innerHTML = `
      <div class="todo-counter">Total: ${this.state.length}</div>
      <div class="done-counter">Done: ${this.state.filter((e) => e.isCompleted).length}</div>
    `;
    }
}
