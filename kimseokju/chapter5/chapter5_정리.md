# 함수

## 매개변수

```typescript
function sing(song) {
  console.log(`Singing: ${song}!`);
}
```

위 코드에서 song은 any로 정의된다. 타입을 정의해주지 않으면 모른다. 그렇기에 아래와 같이 매개변수에도 타입을 지정해주어야한다.

```typescript
function sing(song: string) {
  console.log(`Singing: ${song}!`);
}
```

보통 매개변수의 개수를 지정해야하지만 선택적 매개변수를 지정할 수 있다. **하지만 선택적 매개변수는 마지막에 위치해야하고 위치가 바뀔 시 구문오류가 발생한다**

```typescript
// 선택적 매개변수를 사용하는 함수
function greet(name: string, greeting?: string): void {
  if (greeting) {
    console.log(`${greeting}, ${name}!`);
  } else {
    console.log(`Hello, ${name}!`);
  }
}

// 함수 호출
greet("John"); // Hello, John!
greet("Jane", "Good day"); // Good day, Jane!
```

등호(=)를 통해서 기본값을 지정해줄 수 있다.

```typescript
// 매개변수에 기본값을 지정하고 undefined 할당 가능한 함수
function greet(name: string, greeting: string | undefined = "Hello"): void {
  if (greeting) {
    console.log(`${greeting}, ${name}!`);
  } else {
    console.log(`Default greeting, ${name}!`);
  }
}

// 함수 호출
greet("John"); // Hello, John!
greet("Jane", undefined); // Default greeting, Jane!
greet("Bob", "Hi"); // Hi, Bob!
```

...을 통해서 변칙적으로 입력되는 매개변수도 받을 수 있다.

```typescript
// 나머지 매개변수를 받는 함수
function displayInfo(name: string, age: number, ...otherInfo: string[]): void {
  console.log(`Name: ${name}`);
  console.log(`Age: ${age}`);
  console.log(`Other Info: ${otherInfo.join(", ")}`);
}

// 함수 호출
displayInfo("John", 25, "Male", "Developer", "JavaScript");
```

## 반환타입

TS에서 반환타입을 명시하지 않는다면 알아서 유추한다. 아래와 같이 반환타입을 명시해줄 수도 있다. 매개변수 목록이 끝나는 뒤쪽에 명시해준다. 헷갈리지 말자.

```typescript
function add(a: number, b: number): number {
  return a + b;
}
```

## void 타입

void 타입은 함수가 어떤 값도 반환하지 않음을 나타내는 타입이다. return문에서 반환값이 허용되지 않거나 아예 return문을 사용할 수 없다.

자바스크립트에서는 실제 값이 반환되지 않으면 보통 undefined가 출력되는데, **undefined !== void**이다. 타입스크립트의 문법이며 자바스크립트의 문법이 아님을 알아야 한다.

## never 타입

의도적으로 오류를 발생시키거나 무한루프를 실행하는 함수?이다. 절대 반환되지 않아야하는 함수에 사용하도록 하자.

## 함수 오버로딩

아래와 같이 하나의 함수에 대해 다양한 매개변수 타입 또는 개수에 따라 다른 동작을 정의할 수 있는 기능을 말한다.

```typescript
// 이렇게 하는게 오버로딩(적재하다. 쌓여있다.)
// function add(x: string, y: string): string;
// function add(x: number, y: number): number;
// 자바스크립트 입장에서는 위처럼 2개의 함수를 만들 필요가 없다.
// 이렇게 아우르는 함수를 만들 수 있는데
// 이것을 오버로딩으로 적용해보고자 한다.

// function add(x: string | number, y: string | number): string | number { // 이런 방식은 리턴에서 문제가 생기므로 안된다.
function add(x: string | number, y: string | number): string | number;
function add(x: any, y: any): any {
  console.log(x, y);
  // string | number으로 지정했을 때 리턴값에서 + 연산자에서 문제가 발생한다.
  return x + y;
}
```
