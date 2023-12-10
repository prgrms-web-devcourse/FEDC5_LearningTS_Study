import { StateArray, StateArrayItem } from '../globalTypes';
import validation from '../utils/validation';

export default function TodoCount(this: any, { $target, initialState }) {
  // new 미사용 방어코드
  if (!new.target) {
    throw new Error('new 키워드를 사용하여야 합니다.');
  }

  const $todoCount = document.createElement('div');
  $todoCount.className = 'todoCount';

  $target.appendChild($todoCount);

  // state 유효성 검사
  this.state = validation(initialState);

  this.render = () => {
    const totalTodos = this.state.length;
    const completedTodos = this.state.filter(
      (todo: StateArrayItem) => todo.isCompleted
    ).length;
    $todoCount.innerHTML = `완료된 Todo의 갯수 : ${completedTodos} / 전체 Todo 갯수 : ${totalTodos}  `;
  };

  this.setState = (nextState: StateArray) => {
    this.state = validation(nextState);
    this.render();
  };

  this.render();
}
