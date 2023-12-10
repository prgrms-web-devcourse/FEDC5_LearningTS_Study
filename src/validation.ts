import { StateArray, StateArrayItem } from './Type';

export default function validation(state: StateArray) {
  // 불가능 값
  const invalidValue = [undefined, null, ''];

  // 전체가 배열 형태인지 체크
  if (!Array.isArray(state)) {
    throw new Error('데이터 타입이 배열 형태가 아닙니다.');
  }
  // 각 요소 체크
  state.forEach((todo: StateArrayItem) => {
    // 객체 타입인지 체크
    if (!(todo instanceof Object))
      throw new Error('데이터 요소가 객체 타입이 아닙니다.');
    // 객체 키 값이 'text'가 존재하는지 체크
    if (invalidValue.indexOf(typeof todo.text) !== -1)
      throw new Error('객체 키에 "text"가 없습니다.');
    // 객체 키 값이 'isCompleted'가 존재하는지 체크
    if (invalidValue.indexOf(typeof todo.isCompleted) !== -1)
      throw new Error('객체 키에 "isCompleted"가 없습니다.');
  });

  return state; // 괜찮으면 반환
}
