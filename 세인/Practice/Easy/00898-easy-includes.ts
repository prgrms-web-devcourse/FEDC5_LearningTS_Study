/*
  898 - Includes
  -------
  by null (@kynefuk) #쉬움 #array

  ### 질문

  JavaScript의 `Array.includes` 함수를 타입 시스템에서 구현하세요. 타입은 두 인수를 받고, `true` 또는 `false`를 반환해야 합니다.

  예시:

  ```ts
  type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`
  ```

  > GitHub에서 보기: https://tsch.js.org/898/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

// type Includes<T extends readonly any[], U> = {
//   [P in T[number]]: true
// }[U] extends true ? true : false;

/*
- T 배열의 각 요소를 true로 매핑하는 객체를 생성함
- P는 배열 T의 모든 요소를 반복하면서 해당 요소를 키로 가지는 속성을 true로 설정한 객체가 생성
- 만약 T가 [1, 2, 3]이라면, {1: true, 2: true, 3: true}와 같은 객체가 생성
- U라는 키가 true로 매핑되어 있는지를 검사
*/
// https://github.com/type-challenges/type-challenges/issues/1568
// 두번째 코드가 이해가 안됨

type IsEqual<T, U> =
	(<G>() => G extends T ? 1 : 2) extends
	(<G>() => G extends U ? 1 : 2)
		? true
		: false;

type Includes<Value extends any[], Item> =
    IsEqual<Value[0], Item> extends true
        ? true
        : Value extends [Value[0], ...infer rest]
            ? Includes<rest, Item>
            : false;

/*
- IsEqual<Value[0], Item>을 사용하여 배열의 첫 번째 요소와 Item이 같은지를 확인
  - 같으면 true 반환하고 종료
- 그렇지 않은 경우, Value가 [Value[0], ...infer rest]와 같은 구조인지 확인
  - 첫 번째 요소를 제외하고 나머지를 rest로 추출
- 그 후, 재귀적으로 Includes<rest, Item>를 호출하여 나머지 배열 부분에 대해 같은 과정을 반복
- 배열에 Item이 포함되어 있는지를 확인하고 결과로 true 또는 false 반환
*/

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>, true>>,
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>, false>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
  Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
  Expect<Equal<Includes<[{}], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
  Expect<Equal<Includes<[{ a: 'A' }], { readonly a: 'A' }>, false>>,
  Expect<Equal<Includes<[{ readonly a: 'A' }], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[1], 1 | 2>, false>>,
  Expect<Equal<Includes<[1 | 2], 1>, false>>,
  Expect<Equal<Includes<[null], undefined>, false>>,
  Expect<Equal<Includes<[undefined], null>, false>>,
]

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/898/answer/ko
  > 정답 보기: https://tsch.js.org/898/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
