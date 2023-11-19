# 7장 인터페이스

## 7.1 타입 별칭 vs 인터페이스

- 타입 별칭
  ```jsx
  type Poet = {
    born: number,
    name: string,
  };
  ```
- 인터페이스
  ```jsx
  interface Poet {
    born: number;
    name: string;
  }
  ```
- 차이점
  - 인터페이스
    - 속성 증가를 위해 병합 가능
    - 클래스가 선언된 구조의 타입을 확인하는데 사용 가능
    - 타입 별칭보다 더 빨리 작동
    - 오류 메세지를 더 쉽게 읽을 수 있음

## 7.2 속성 타입

### 7.2.2 읽기 전용 속성

- `readonly`: 정의된 객체의 속성 재할당 방지

### 7.2.3 함수와 메서드

- 메서드 구문: `member(): void` 객체의 멤버로 호출되는 함수로 선언
- 속성 구문: `member: () ⇒ void` 독립 함수와 동일하게 선언

### 7.2.4 호출 시그니처

- 값을 함수처럼 호출하는 방식에 대한 타입 시스템의 설명
  - 할당 가능한 매개변수와 반환 타입을 가진 함수

```jsx
type FunctionAlias = (input: string) => number;

interface CallSignature {
  (input: string): number;
}

const typedFunctionAlias: FunctionAlias = (input) => input.length; // OK
const typedCallSignature: CallSignature = (input) => input.length; // OK
```

### 7.2.5 인덱스 시그니처

객체의 속성에 동적으로 액세스하기 위한 특별한 유형의 선언

```jsx
interface Fruits {
  [key: string]: number;
}

const fruits: Fruits = {
  apple: 0,
  banana: 10,
  // cherry: false // Error!
};
```

### 7.2.6 중첩 인터페이스

```jsx
interface User {
  name: string;
  age: number;
  addr: Addr;
}

interface Addr {
  city: string;
}

let user: User;

user = {
  name: "h",
  age: 20,
  addr: {
    city: "seoul",
  },
};
```

## 7.3 인터페이스 확장

```jsx
interface Writing {
  title: string | null;
  giveNumber(): number;
}

interface GivesString {
  giveString(): number;
}

interface N extends Writing {
  pages: number;
}

// 7.3.1 재정의된 속성
interface N extends Writing {
  title: string;
}

// 7.3.2 다중 인터페이스 확장
interface info extends Writing, GivesString {
  giveEither(): number | string;
}
```

## 7.4 인터페이스 병합

```jsx
interface Writing {
  title: string;
}

interface Writing {
  // title: number;   // 동일한 이름의 속성 사용 불가능 or 동일한 타입 사용
  pages: number;
}

const book: Writing = {
  title: "h",
  pages: 100,
};
```
