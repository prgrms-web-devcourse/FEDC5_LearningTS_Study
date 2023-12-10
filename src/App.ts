import { NewFuncParams, StateArray } from './Type';

export default function App({ $target, initialState }: NewFuncParams) {
  // new 미사용 방어코드
  if (!new.target) {
    throw new Error('new 키워드를 사용하여야 합니다.');
  }
  this.state = initialState;

  this.setState = (nextState: StateArray) => {
    this.state = nextState;
  };
}
