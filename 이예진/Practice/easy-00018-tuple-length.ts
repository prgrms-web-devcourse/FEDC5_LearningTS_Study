/*
  18 - Length of Tuple
  -------
  by sinoon (@sinoon) #쉬움 #tuple

  ### 질문

  배열(튜플)을 받아 길이를 반환하는 제네릭 `Length<T>`를 구현하세요.

  예시:

  ```ts
  type tesla = ['tesla', 'model 3', 'model X', 'model Y']
  type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']

  type teslaLength = Length<tesla>  // expected 4
  type spaceXLength = Length<spaceX> // expected 5
  ```

  > GitHub에서 보기: https://tsch.js.org/18/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

type Length<T extends any[]> = T["length"];
