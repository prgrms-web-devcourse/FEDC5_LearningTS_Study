### 6.1 배열

- 초기 배열에 어떤 데이터 타입이 있는지 기억하고, 배열이 **해당 데이터 타입에서만 작동하도록** 제한함

```typescript
const warriors = ["Artemisa", "Boudica"];

warriors.push("Zenobia"); // Ok

warriors.push(true); // Error: boolean 타입 에러
```

- 배열에 대한 타입 애너테이션은 **배열의 요소 타입 다음**에 []가 와야 함

```typescript
let arrayOfNumbers: number[];

arrayOfNumbers = [4, 8, 15, 16, 23, 42];
```

### 6.1.1 배열과 함수 타입

- 애너테이션의 함수 반환 부분과 배열 타입 묶음을 나타내기 위해 괄호 사용

```typescript
let createStrings: () => string[]; // string 배열을 반환하는 함수

let stringCreators: (() => string)[]; // 각각의 string을 반환하는 함수 배열
```

### 6.1.2 유니언 타입 배열

- 유니언 타입: 배열의 각 요소가 여러 선택 타입 중 하나일 수 있음을 나타내기 위해 사용

```typescript
let stringOrArrayOfNumbers: string | number[]; // string 또는 (number의 배열)

let arrayOfStringOrNumbers: (string | number)[]; // (string 또는 number)의 배열
```

```typescript
const namesMaybe = [
  // 타입: (string | undefined)[]
  "Aqualtune",
  "Blenda",
  undefined,
];
```

### 6.1.3 any 배열의 진화

- any[]: 초기에 빈 배열로 설정하고 타입 애너테이션도 포함하지 않은 배열 → 잘못된 값 추가를 허용할 수 있음

```typescript
let values = []; // 타입: any[]

values.push(""); // 타입: string[]

values[0] = 0; // 타입: (number | string)[]
```

### 6.1.4 다차원 배열

- n차원 배열이면 n개의 대괄호를 가짐

```typescript
let arrayOfArraysOfNumbers: number[][];

arrayOfArraysOfNumbers = [
  [1, 2, 3],
  [2, 4, 6],
  [3, 6, 9],
];
```

```typescript
let arrayOfArraysOfNumbers: number[][]; // 위와 동일
```

### 6.2 배열 멤버

- 타입스크립트는 배열의 멤버를 찾아서 해당 배열의 타입 요소를 되돌려주는 전형적인 인덱스 기반 접근 방식을 이해하는 언어

### 6.2.1 주의 사항: 불안정한 멤버

- 배열은 타입 시스템에서 불안정한 소스임

```typescript
function withElements(elements: string[]) {
  console.log(elements[9001].length); // 타입 오류 없음
}

withElements(["It's", "over"]);
```

### 6.3 스프레드와 나머지 매개변수

- 스프레드 연산자(...)를 사용하는 나머지 매개변수와 배열 스프레드는 자바스크립트에서 배열과 상호작용하는 핵심 방법

### 6.3.1 스프레드

- 스프레드 연산자를 이용해 배열을 결합할 수 있음

① 입력된 배열의 타입이 동일한 경우: 출력 배열도 동등한 타입

② 입력된 배열의 타입이 다른 경우: 유니언 타입의 배열로 이해됨

```typescript
const soliders = ["Harriet Tubman", "Joan of Arc", "Khutulun"]; // 타입: string[]

const soliderAges = [90, 19, 45]; // 타입: number[]

const conjoined = [...soliders, ...soliderAges]; // 타입: (string | number)[]
```

### 6.3.2 나머지 매개변수 스프레드

- 나머지 매개변수를 위한 인수로 사용되는 배열은 나머지 매개변수와 동일한 배열 타입을 가져야 함

```typescript
function logWarriors(greeting: string, ...names: string[]) {
  for (const name of names) {
    console.log(`${greeting}`, `${name}!`);
  }
}

const warriors = ["Cathy Williams", "Lozen", "Nzinga"];

logWarriors("Hello", ...warriors);

const birthYears = [1884, 1840, 1583];

logWarriors("Born in", ...birthYears); // Error: 나머지 매개변수 타입 에러
```

### 6.4 튜플

- 튜플: 고정된 크기의 배열

각 인덱스에 알려진 특정 타입을 가지며 배열의 모든 가능한 멤버를 갖는 유니언 타입보다 더 구체적임

```typescript
let yearAndWarrior: [number, string];

yearAndWarrior = [530, "Tomyris"]; // Ok

yearAndWarrior = [false, "Tomyris"]; // Error: yearAndWarrior[0] 타입 에러

yearAndWarrior = [530]; // Error: 타입 & 길이 에러
```

- 한 번에 여러 값을 할당하기 위해 튜플과 배열 구조 분해 할당을 함께 자주 사용함

```typescript
let [year, warrior] =
  Math.random() > 0.5 ? [340, "Archidamia"] : [1828, "Rani of Jhansi"];
```

### 6.4.1 튜플 할당 가능성

- 가변 길이의 배열 타입은 튜플 타입에 할당할 수 없음

```typescript
const pairLoose = [false, 123]; // 타입: (boolean | number) []

const pairTupleLoose: [boolean, number] = pairLoose;
```

```typescript
const tupleThree: [boolean, number, string] = [false, 1583, "Nzinga"];

const tupleTwoExact: [boolean, number] = [tupleThree[0], tupleThree[1]]; // Ok

const tupleTwoExtra: [boolean, number] = tupleThree; // Error: 타입 에러
```

### 6.4.2 튜플 추론

- 타입스크립트는 배열을 튜플이 아닌 가변길이의 배열로 취급함 (ex: 변수이 초깃값 또는 함수에 대한 반환값으로 사용되는 경우)

```typescript
function firstCharAndSize(input: string) {
  return [input[0], input.length]; // 반환 타입: (string | number)[]
}

// firstChar 타입: string | number
// size 타입: string | number
const [firstChar, size] = firstCharAndSize("Gudit");
```

① 명시적 튜플 타입

```typescript
function firstCharAndSizeExplicit(input: string): [string, number] {
  return [input[0], input.length]; // 반환 타입: [string, number]
}

// firstChar 타입: string
// size 타입: number
const [firstChar, size] = firstCharAndSizeExplicit("Cathy Williams");
```

② const 어서션

- const 어서션은 타입스크립트에 타입을 유추할 때 읽기 전용이 가능한 값 형식을 사용하도록 지시함 → 배열이 튜플로 처리되어야 함을 나타냄

```typescript
const unionArray = [1157, "Tomoe"]; // 타입: (string | number)[]

const readonlyTuple = [1157, "Tomoe"] as const; // 타입: readonly [1157, "Tomoe"]
```

유연한 크기의 배열을 고정된 크기의 튜플로 전환하는 것을 넘어서, 해당 튜플이 읽기 전용이고 값 수정이 예상되는 곳에서 사용할 수 없음을 나타냄

```typescript
const pairMutable: [number, string] = [1157, "Tomoe"];
pairMutable[0] = 1247;

const pairAlsoMutable: [number, string] = [1157, "Tomoe"] as const; // Error : 수정가능한 튜플에는 as const 할당 불가

const pairConst = [1157, "Tomoe"] as const;
pairMutable[0] = 1247; // Error: pairConst는 readonly이므로 수정 불가
```
