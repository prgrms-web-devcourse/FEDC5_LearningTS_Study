import { NewFuncParams, StateArray } from '../globalTypes';
import Header from './Header';

interface NewApp {
  state: StateArray;
  setState: (nextState: StateArray) => void;
}

export default function App(
  this: NewApp,
  { $target, initialState }: NewFuncParams
) {
  // new 미사용 방어코드
  if (!new.target) {
    throw new Error('new 키워드를 사용하여야 합니다.');
  }
  this.state = initialState;

  this.setState = (nextState: StateArray) => {
    this.state = nextState;
  };

  // 헤더
  new Header({
    $target,
    text: 'Simple Todo List',
  });
}
