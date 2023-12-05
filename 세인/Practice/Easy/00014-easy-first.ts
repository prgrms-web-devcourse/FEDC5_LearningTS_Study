/*
  14 - First of Array
  -------
  by Anthony Fu (@antfu) #쉬움 #array

  ### 질문

  배열(튜플) `T`를 받아 첫 원소의 타입을 반환하는 제네릭 `First<T>`를 구현하세요.

  예시:

  ```ts
  type arr1 = ['a', 'b', 'c']
  type arr2 = [3, 2, 1]

  type head1 = First<arr1> // expected to be 'a'
  type head2 = First<arr2> // expected to be 3
  ```

  > GitHub에서 보기: https://tsch.js.org/14/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

type First<T extends any[]> = T extends [infer A, ...infer rest] ? A : never;

/*
- [infer A, ...infer rest]: 첫번째 요소를 A에, 나머지 요소들을 rest에 할당
- 배열의 첫 번째 element를 A로 추론 나머지는 rest로 추론
- element가 없으면 infer A 실패 never
- infer A 빼고 [..infer rest] 로만 검증하면 마찬가지로 []도 항상 참
- 위 코드는 명시적으로 구현한 좋은 코드!
- type First<T extends any[]> - T extends [] > never : T[0] (묵시적)
- type First<T extends any[]> - T['length'] extends 0 ? never : T[0] (야매ㅋㅋ)
- never: A 보다 A : never로 나오는 게 좋다! common한 타입이 더 먼저나오는 게 깔끔
*/

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>,
]

type errors = [
  // @ts-expect-error
  First<'notArray'>,
  // @ts-expect-error
  First<{ 0: 'arrayLike' }>,
]

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/14/answer/ko
  > 정답 보기: https://tsch.js.org/14/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
