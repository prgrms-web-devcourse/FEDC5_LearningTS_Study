// params.$target - 해당 컴포넌트가 추가될 DOM 앨리먼트
// params.initialState - 해당 컴포넌트의 초기 상태
export default function TodoList({ $target, initialState }) {
  if (!new.target) {
    throw new Error('You must use new with TodoList');
  }

  const $todoList = document.createElement('div');
  $target.appendChild($todoList);

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  }

  this.render = () => {
    $todoList.innerHTML = `
      <ul>
        ${this.state.map(({ text }) => `<li>${text}</li>`).join('')}
      </ul>
    `;
  }

  this.render();
}