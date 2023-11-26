/*
  189 - Awaited
  -------
  by Maciej Sikora (@maciejsikora) #쉬움 #promise #built-in

  ### 질문

  Promise와 같은 타입에 감싸인 타입이 있을 때, 안에 감싸인 타입이 무엇인지 어떻게 알 수 있을까요?

  예시: 들어 `Promise<ExampleType>`이 있을 때, `ExampleType`을 어떻게 얻을 수 있을까요?

  ```ts
  type ExampleType = Promise<string>

  type Result = MyAwaited<ExampleType> // string
  ```

  > 출처: [original article](https://dev.to/macsikora/advanced-typescript-exercises-question-1-45k4) by [@maciejsikora](https://github.com/maciejsikora)

  > GitHub에서 보기: https://tsch.js.org/189/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

// 실제 함수 만들 때 많이 사용하는 타입이다.
// 콜백함수가 일반 함수 vs 비동기 함수냐에 따라 타이핑 해야할 때 사용.

type MyAwaited<T extends PromiseLike<any>> =
  T extends PromiseLike<infer K>
    ? K extends Promise<infer Q>
      ? MyAwaited<K>
      : K
    : never;

/* _____________ 테스트 케이스 _____________ */
import type {
  Equal,
  Expect,
} from "@type-challenges/utils";

type X = Promise<string>;
type Y = Promise<{ field: number }>;
type Z = Promise<Promise<string | number>>;
type Z1 = Promise<
  Promise<Promise<string | boolean>>
>;
type T = {
  then: (
    onfulfilled: (arg: number) => any
  ) => any;
};

// T 는 Promise<number>((resolve) => any)
// PromiseLike를 사용해야 하는 이유는 실제 Promise의 내부속성들을 모두갖고있지 않다.

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>,
  Expect<Equal<MyAwaited<T>, number>>
];

// @ts-expect-error
type error = MyAwaited<number>;

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/189/answer/ko
  > 정답 보기: https://tsch.js.org/189/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
