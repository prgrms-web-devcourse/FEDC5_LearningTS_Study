/*
  4 - Pick
  -------
  by Anthony Fu (@antfu) #쉬움 #union #built-in

  ### 질문

  `T`에서 `K` 프로퍼티만 선택해 새로운 오브젝트 타입을 만드는 내장 제네릭 `Pick<T, K>`을 이를 사용하지 않고 구현하세요.

  예시:

  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  type TodoPreview = MyPick<Todo, 'title' | 'completed'>

  const todo: TodoPreview = {
      title: 'Clean room',
      completed: false,
  }
  ```

  > GitHub에서 보기: https://tsch.js.org/4/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

type MyPick<T, K extends keyof T> = {
  [key in K]: T[key];
};
