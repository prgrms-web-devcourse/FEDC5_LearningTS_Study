# 6장 배열

타입스크립트는 배열에 특정 데이터 타입을 강제하고 유지할 수 있어 프로그램의 안정성을 높이는 데 도움이 된다.

## 6.1 배열 타입

```jsx
let arr = number[];
arr = [1, 2, 3, 4, 5];
```

> 💡 `Array<number>`로도 작성 가능하지만 `number[]`을 더 선호

### 6.1.1 배열과 함수 타입

```jsx
// 타입은 string 배열을 반환하는 함수
let createStrings: () => string[];

// 타입은 각각의 string을 반환하는 함수 배열
let stringCreators: (() => string)[];
```

### 6.1.2 유니언 타입 배열

```jsx
// 타입은 string 또는 number의 배열
let stringOrArrayOfNumbers: string | number[];

// 타입은 각각 number 또는 string인 요소의 배열
let arrayOfStringOrNumbers: (string | number)[];
```

### 6.1.3 any 배열의 진화

```jsx
// 초기 타입 애너테이션이 포함되어있지않아 배열 타입은 any[]이다.
let values = [];

// 타입: string[]
valuese.push("");

// 타입: (number | string)[]
values[0] = 0;
```

- 타입 애너테이션이 없기 때문에 TypeScript가 해당 배열을 `any[]`로 추론
  → TypeScript의 타입 검사 기능을 최대한 활용할 수 없으며, 잘못된 값이 배열에 추가될 가능성이 높아짐

### 6.1.4 다차원 배열

```jsx
let arr: number[][];
// or
let arr: number[][];
```

→ 원래의 타입에 `[]` 추가

## 6.2 배열 멤버

### 6.2.1 주의 사항: 불안정한 멤버

- 자바스크립트: 배열의 길이보다 큰 인덱스로 배열 요소에 접근하면 **undefined**를 반환
- 타입스크립트: 컴파일러의 기본 설정에서는 이러한 상황에 대해 오류 발생 안함

```jsx
const arr = ["1", "2", "3"];
console.log(arr[1000].length); // 타입 오류 없음
```

## 6.3 스프레드와 나머지 매개변수

### 6.3.1 스프레드

```jsx
const arr1 = ["A", "B", "C"];
const arr2 = [10, 20, 30];
// 타입: (string | number)[]
const joined = [...arr1, ...arr2];
```

### 6.3.2 나머지 매개변수 스프레드

- 나머지 매개변수 스프레드는 함수에서 가변 인자를 처리하는데 사용되는 구문
- 사용 시, 배열 타입은 나머지 매개변수와 동일한 타입을 가져야 함

## 6.4 튜플

- 고정된 크기와 고정된 타입 순서를 갖는 배열의 특별한 형태
  - 각 위치에 명시된 타입에 맞는 값만을 허용하며, 일치하지 않을 경우 타입 에러가 발생
- 유니언 타입보다 더 구체적인 정보를 갖고있음

```jsx
let arr: [number, string];
arr = [10, "A"]; // OK
arr = [false, "B"]; // Error!
```

- 구조 분해 할당을 통해 튜플의 각 요소를 추출할 수 있음

```jsx
let [year, warrior] = Math.random() > 0.5 ? [340, "A"] : [102, "B"];
```

### 6.4.1 튜플 할당 가능성

- 튜플의 길이와 각 위치의 타입이 일치
- 가변 길이의 배열 타입보다 더 구체적으로 처리되며, 길이가 다른 튜플 간에는 서로 할당이 불가능

```jsx
// 타입: (boolean | number)[]
const arr = [false, 123];
const arr2: [boolean, number] = arr;
```

**나머지 매개변수로서의 튜플**

```jsx
function logPair(name: string, value: number) {
  console.log("${name} has ${value|");
}

const pairArray = ["Amage", 1];
logPair(...pairArray);
// Error: A spread argument must either have a tuple type or be passed to a rest parameter.

const pairTupleIncorrect: [number, string] = [1, "A"];
logPair(...pairTupleIncorrect);
// Error: Argument of type 'number' is not assignable to parameter of type 'string'

// 값이 [string, number] 튜플이라고 알고 있다면 값이 일치한다는 것을 알 수 있다.
const pairTupleCorrect: [string, number] = ["A", 1];
logPair(...pairTupleCorrect); // OK!
```

```tsx
function logTrio(name: string, value: [number, boolean]) {
  console.log("${name} has ${value[0]} (${value[1]}");
}

const trios: [string, [number, boolean]][] = [
  ["A", [1, true]],
  ["B", [2, false]],
  ["C", [3, true]],
];

trios.forEach((trio) => logTrio(...trio));
```

### 6.4.2 튜플 추론

- 타입스크립트가 생성된 배열을 튜플이 아닌 가변 길이의 배열로 취급하는 현상

```jsx
// 반환 타입: (string | number)[]
function firstCharAndSize(input: string) {
  return [input[0], input.length];
}

// firstChar 타입: string | number
// size 타입: string | number
const [firstChar, size] = firstCharAndSize("G");
```

- 명시적 튜플 타입 또는 const 어서션을 사용하여 튜플로 추론될 수 있도록 할 수 있음

**명시적 튜플 타입**

- 타입 애너테이션 사용

```jsx
function firstCharAndSize(input: string): [string, number] {
  return [input[0], input.length];
}

// firstChar 타입: string
// size 타입: number
const [firstChar, size] = firstCharAndSize("G");
```

**const 어서션**

- `as const`는 값의 형태를 읽기 전용이 가능한 형식으로 지정하므로 튜플로 추론될 수 있음

```jsx
// (string | number)[]
const unionArr = [11, 'T'];

// readonly [11, 'T]
const readOnlyTuple = [11, 'T'] as const;
```

→ 읽기 전용이 되며 값 수정이 불가능
