# 10장 제네릭

## 10.1 제네릭 함수

### 10.1.1 명시적 제네릭 호출 타입

```jsx
function identity<T>(arg: T): T {
  return arg;
}

// 명시적 제네릭 타입 인수 <string>
let result = identity < string > "Hello, TypeScript!";
```

### 10.1.2 다중 함수 타입 매개변수

```jsx
function printPair<A, B>(value1: A, value2: B): void {
  console.log(value1, value2);
}

printPair < string, number > ("Hello", 42);
printPair < number, boolean > (123, true);
```

## 10.2 제네릭 인터페이스

특정 타입을 고정하지 않고 동적으로 타입을 사용할 수 있도록 하는 기능

```jsx
interface Box<T> {
  inside: T;
}

let stringBox: Box<string> = { inside: "abc" };
let numberBox: Box<number> = { inside: 123 };

// 유추된 제네릭 인터페이스 타입
// <string>
let stringBox = { inside: "abc" };
// <number>
let numberBox = { inside: 123 };
```

## 10.3 제네릭 클래스

클래스 내에서 사용되는 타입을 동적으로 지정 가능

```jsx
class MyGenericClass<T> {
  private value: T;

  constructor(initialValue: T) {
    this.value = initialValue;
  }

  getValue(): T {
    return this.value;
  }
}

// 명시적 제네릭 클래스 타입 <string>
const stringContainer = new MyGenericClass<string>("Hello, TypeScript!");
console.log(stringContainer.getValue()); // "Hello, TypeScript!"

// 명시적 제네릭 클래스 타입 <number>
const numberContainer = new MyGenericClass<number>(42);
console.log(numberContainer.getValue()); // 42
```

`extends` 키워드를 이용해 제네릭 클래스 확장 가능

## 10.4 제네릭 타입 별칭

```jsx
type Nullish<T> = T | null | undefined;

type CreatesValue<Input, Output> = (input: Input) => Output;

let creator: CreatesValue<string, number>;

creator = (text) => text.length; // OK
creator = (text) => text.toUpperCase(); // Error!
```

## 10.5 제네릭 제한자

특정 조건을 만족하는 타입만 허용하고 싶을 때 사용

```jsx
interface Quote<T = string> {
  value: T;
}

let explicit: Quote<number> = { value: 123 };
let implicit: Quote = { value: "t" };
let miss: Quote = { 123 } // 에러
```
