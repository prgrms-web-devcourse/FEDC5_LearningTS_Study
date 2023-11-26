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

type First<T extends any[]> = T extends [] ? never : T[0]; // ¶제네릭의 조건부 타입

// 그외 다른 정답
// type First<T extends any[]> = T["length"] extends 0 ? never : T[0]; /// ['length'] ? ? ?

// type First<T extends any[]> = T extends [infer A, ...infer rest] ? A : never;
