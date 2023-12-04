# 15장

## 15.1 매핑된 타입

타입스크립트의 매핑된 타입은 다른 타입을 가져와서 해당 타입의 각 속성에 대해 일부 작업을 수행하는 타입이다. 매핑된 타입은 키 집합의 각 키에 대한 새로운 속성을 만들어 새로운 타입을 생성한다.

```ts
type Animals = "dog" | "cat" | "rabbit";

type AnimalCounts = {
  [K in Animals]: number;
};

// 다음과 같다
// {
//   "dog": number;
//   "cat": number;
//   "rabbit": number;
// }
```

매핑된 타입은 인덱스 시그니처와 유사한 구문을 사용하지만 정적 키 타입을 사용하는 대신 in을 사용해 다른 타입으로부터 계산된 타입을 사용한다.

### 타입에서 매핑된 타입

```ts
interface Animals = {
  "dog": string;
  "cat": boolean;
  "rabbit": number;
};

type AnimalCounts = {
  [K in keyof Animals]: Animals[K] | null;
};

// 다음과 같다
// {
//   "dog": string | null;
//   "cat": boolean | null;
//   "rabbit": number | null;
// }
```

매핑된 타입의 각 멤버는 `Animals[K]`로 참조할 수 있다. 매핑된 타입은 멤버 집합을 한 번 정의하고 필요한 만큼 여러 번 새로운 버전을 다시 생성할 수 있다.

## 15.2 조건부 타입

조건부 타입에서 논리적 검사는 항상 `extends`의 왼쪽 타입이 오른쪽 타입이 되는지 또는 할당 가능한지 여부에 있다.

### 제네릭 조건부 타입

```ts
interface QueryOptions {
  throwIfNotFound: boolean;
}

type QueryResult<Options extends QueryOptions> = {
  Options["throwIfNotFound"] extends true ? string : string | undefined;
}
```

`QueryResult` 타입은 `Options["throwIfNotFound"]`가 `true`인 것으로 명확하게 밝혀지면 더 좁은 `string` 타입이 되도록 모델링한다.

## 15.3 never

### never와 조건부 타입

제네릭 조건부 타입은 일반적으로 유니언에서 타입을 필터링하기 위해 `never`를 사용한다.

```ts
type OnlyString<T> = T extends string ? T : never;

type RedOrBlue = OnlyString<"red" | "blue" | 0 | false>; // "red" | "blue"
```

## 15.4 템플릿 리터럴 타입

```ts
type Greeting = "Hello${string}";

let matches: Greeting = "Hello world";
let outOfOrder: Greeting = "World hello"; // Error
```

템플릿 리터럴 타입은 문자열 타입이 패턴에 맞는지를 나타낸다. 템플릿 리터럴 타입인 `Greeting`은 문자열이 Hello로 시작해야 함을 뜻한다. 템플릿 리터럴 타입은 제한된 허용 문자열 집합과 일치해야 하는 문자열을 설명하는데 매우 유용하다.

```ts
type Brightness = "dark" | "light";
type Color = "blue" | "red";

type BrightnessAndColor = `${Brightness}-${Color}`;

let colorOk: BrightnessAndColor = "dark-blue";
```

`BrightnessAndColor`는 `Brightness`로 시작하고 `Color`로 끝나며 그 사이에 하이픈(-)이 있는 문자열만 일치한다.

### 고유 문자열 조작 타입

문자열 타입 작업을 지원하기 위해 타입스크립트는 문자열을 가져와 문자열에 일부 조작을 젹용하는 고유 제네릭 유틸리티 타입을 제공한다.

- Uppercase
- Lowercase
- Capitalize
- Uncapitalize

```ts
type FormalGreeting = Capitalize<"hello">; // 타입 : "Hello"
```

### 템플릿 리터럴 키

```ts
type Key = "location" | "name" | "year";

type ExistenceChecks = {
  [K in "check${Capitalize<Key>}"]: () => boolean;
};

// 다음과 같다.
// {
//   "checkLocation": () => boolean;
//   "checkName": () => boolean;
//   "checkYear": () => boolean;
// }
```
