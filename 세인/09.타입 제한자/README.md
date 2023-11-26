# 9장 타입 제한자

## 9.1 top 타입

| bottom 타입                                   | top 타입                        |
| --------------------------------------------- | ------------------------------- |
| 객체에서 가능한 값이 없고, 접근 불가능한 타입 | 가능 한 모든 값을 나타내는 타입 |

### 9.1.1 any 다시보기

`any` 타입은 모든 타입의 값을 나타낼 수 있지만, 이는 타입스크립트의 강력한 타입 시스템의 이점을 잃게 된다.

### 9.1.2 unknown

- `unknown` 타입 값의 속성에 직접 접근할 수 없다 (→ 명시적인 타입 체크나 변환을 해야한다!)
- `unknwon` 타입은 `top` 타입이 아닌 타입에는 할당할 수 없다

```jsx
let value: unknown = 42;

// 에러: 속성에 직접 접근 불가
// console.log(value.toFixed(2));

// typeof를 사용한 타입 확인
if (typeof value === "number") {
  console.log(value.toFixed(2)); // 이제 안전하게 사용 가능
}
```

- `instanceof,typeof, 타입 어서션 사용` → 타입을 좀 더 구체적인 타입으로 좁히고, 안전하게 속성에 접근할 수 있다.

> 💡 `unknown`의 두 가지 제한으로 인해 `any` 보다 타입 안정성이 높다.
> `any`대신 `unknown`을 사용하는 것을 추천!

## 9.2 타입 서술어

- 인수가 특정 타입인지 여부를 나타내기 위해 `boolean` 값을 반환하는 함수를 위한 특별한 구문이다.

## 9.3 타입 연산자

기존 타입의 일부를 변환하여 새로운 타입을 생성하거나 타입 간의 관계를 나타내는 데 사용한다.

### 9.3.1 keyof

- 인터페이스의 모든 속성 키를 문자열 리터럴 유니온으로 가져온다.
- 객체의 키를 동적으로 참조해야 하는 경우 사용한다.

```jsx
interface Ratings {
    audience: number;
    critics: number;
}
// audience | critics
// 작성하는 것이 훨씬 빠르고 Ratings 인터페이스가 변경되더라도 수동으로 업데이트 x
function getCountKeyOf(ratings: Ratings, key: keyof Ratings): number {
    return ratings[key];
}
```

### 9.3.2 typeof

- 변수의 실제 값을 참조하는 것이 아니라, 변수의 타입을 검사하여 타입을 생성한다.
- 값의 타입을 기반으로 새로운 변수를 선언하거나, 기존 변수의 타입을 참조할 때 사용한다.

```tsx
const original = {
  medium: "movie",
  title: "Mean Girls",
};

let adaptation: typeof original;

if (Math.random() > 0.5) {
  adaptation = { ...original, medium: "play" }; // OK
} else {
  adaptation = { ...original, medium: 2 }; // Error!
  // Type 'number' is not assignable to type 'string'.
}
```

타입스크립트의 typeof연산자 ≠ 자바스크립트의 typeof 연산자

**keyof + typeof**

- 값의 타입에 허용된 키를 나타내는 타입을 생성할 수 있다.
- 명시적 인터페이스 타입이 없는 객체에 허용된 키를 나타내는 타입을 간단하게 작성하고 업데이트하는 데 유용하다.

```jsx
const ratings = {
    imdb: 8.4,
    metacritic: 82,
};

function logRating(key: keyof typeof ratings) {
    console.log(ratings[key])
}

logRating('imdb'); // ok
logRating('invalid'); // Error!
// Argument of type '"inval"' is not assignable to parameter of type '"imdb" | "metacritic"'.
```

## 9.4 타입 어서션

- 특정 값의 타입을 명시적으로 지정하는 것을 말한다.
- 값의 타입에 대한 타입 시스템의 이해를 더 정확하게 전달하고자 할 때 사용한다.
- as 키워드를 사용한 타입 어서션

```tsx
const rawData = '["grace", "h"]';

// 타입 any
const parsedData: any = JSON.parse(rawData);

// 타입 string[]
const parsedArray: string[] = JSON.parse(rawData) as string[];

// 타입 [string, string]
const tupleArray: [string, string] = JSON.parse(rawData) as [string, string];

// 타입 ["grace", "h"]
const specificArray: ["grace", "h"] = JSON.parse(rawData) as ["grace", "h"];
```

- _타입어서션은 TS에만 존재하고, 자바스크립트로 컴파일 할 경우 사라진다._

> 💡 타입 어서션을 남용하면 타입 시스템의 이점을 잃을 수 있으므로, 사용을 지양하는 것이 좋다!

## 9.5 const 어서션

- 배열, 원시타입, 값, 별칭 등 모든 값을 상수로 취급할 때 사용한다.

### 배열에서의 const 어서션

- **읽기 전용** 튜플로 취급한다.

```jsx
// 타입 (number | string)[]
[0, '']

// 타입 readonly [0, '']
[0, ''] as const;
```

### 리터럴에서의 const 어서션

- 일반적인 원시 타입 대신 **고유한 리터럴 타입**으로 간주하여 구체적인 값을 반환한다.

```tsx
// 타입: () => string
const getName = () => "Hyun";

// 타입: () => 'Hyun'
const getNameConst = () => "Hyun" as const;
```

### 읽기 전용 객체

- 객체의 모든 속성이 **읽기 전용**으로 취급된다.

```tsx
/* 타입
    const user: {
        readonly name: "h";
        readonly age: 20;
    } 
*/

const user = {
  name: "h",
  age: 20,
} as const;
```

> 💡 `const` 어서션을 통해 값을 불변하게 유지하고 타입 시스템이 더욱 강력하게 동작할 수 있다!
