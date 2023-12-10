import { NewFuncParams, StateArray } from '../globalTypes';
import { $app } from '../main';
import { storage } from '../utils/storage';
import validation from '../utils/validation';
import Header from './Header';
import TodoCount from './TodoCount';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

export default function App(
  this: any,
  { $target, initialState }: NewFuncParams
) {
  // new 미사용 방어코드
  if (!new.target) {
    throw new Error('new 키워드를 사용하여야 합니다.');
  }
  this.state = initialState;

  this.setState = (nextState: StateArray) => {
    this.state = nextState;
    todoCount.setState(this.state);
    todoList.setState(this.state);
  };

  // 헤더
  new Header({
    $target,
    text: 'Simple Todo List',
  });

  // Todo 입력폼
  new TodoForm({
    $target,
    onSubmit: (text: string) => {
      const nextState = [
        ...todoList.state,
        {
          text,
          isCompleted: false,
        },
      ];

      // state 유효성 검사 후 업데이트
      this.setState(validation(nextState));
      storage.setItem('todos', JSON.stringify(nextState));
    },
  });

  // Todo 리스트
  const todoList = new TodoList({
    $target,
    initialState: validation(initialState),
    onClick: (text: string, id: string) => {
      const nextState = [...this.state];

      // 삭제할 값이 있을 경우 삭제
      if (text === '삭제') nextState.splice(Number(id), 1);

      nextState.forEach((task, i) => {
        if (task.text === text && i === Number(id)) {
          // 데이터 수정
          nextState[i].isCompleted = !nextState[i].isCompleted;
        }
      });

      // state 유효성 검사 후 업데이트
      this.setState(validation(nextState));
      storage.setItem('todos', JSON.stringify(nextState));
    },
  });

  // TodoCount
  const todoCount = new TodoCount({
    $target: $app,
    initialState: this.state,
  });
}
