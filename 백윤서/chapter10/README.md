# 10장 제네릭

## 10.3 제네릭 클래스

```ts
class Secret<Key, Value> {
  key: Key;
  value: Value;

  constructor(key: Key, value: Value) {
    this.key = key;
    this.value = value;
  }

  getValue(key: Key): Value | undefined {
    return this.key === key ? this.value : undefined;
  }
}

const storage = new Secret(12345, 'luggage'); // 타입: Secret<number, string>
storage.getValue(1987)  // 타입: string | undefined
```

`Secret` 클래스는 `Key`, `Value` 타입 매개변수를 선언한 다음 `Key`, `Value` 타입 매개변수를 멤버 속성, `constructor` 매개변수 타입, 메서드의 매개변수와 반환 타입으로 사용한다. 클래스를 타입 애너테이션으로 사용할 때는 해당 클래스의 제네릭 타입이 무엇인지를 타입스크립트에 나타내야 한다.

### 명시적 제네릭 클래스 타입

생성자에 전달된 인수에서 클래스 타입 인수를 유추할 수 없는 경우에는 타입 인수의 기본값은 `unknown`이 된다. 클래스 인스턴스는 다른 제네릭 함수 호출과 동일한 방식으로 명시적 타입 인수를 제공해서 기본값 `unknown`이 되는 것을 피할 수 있다.

### 정적 클래스 제네릭

클래스의 정적 멤버는 인스턴스 멤버와 구별되고 클래스의 특정 인스턴스와 연결되어 있지 않다. 클래스의 정적 멤버는 클래스 인스턴스에 접근할 수 없거나 타입 정보를 지정할 수 없다. 따라서 정적 클래스 메서드는 자체 타입 매개변수를 선언할 수 있지만 클래스에 선언된 어떤 타입 매개변수에도 접근할 수 없다.

## 10.5 제네릭 제한자

### 제네릭 기본값

타입 매개변수 뒤에 =와 기본 타입을 배치해 타입 인수를 명시적으로 제공할 수 있다. 기본값은 타입 인수가 명시적으로 선언되지 않고 유추할 수 없는 모든 후속 타입에 사용된다.

```ts
interface Quote<T = string> {
  value: T;
}

let explicit: Quote<number> = { value: 123 };

let implicit: Quote = { value: '123' };

let mismatch: Quote = { value: 123 };
// Error: Type 'number' is not assignable to type 'string'
```

모든 기본 타입 매개변수는 기본 함수 매개변수처럼 선언 목록의 맨 마지막에 와야 한다. 기본값이 없는 제네릭 타입은 기본값이 있는 제네릭 타입 뒤에 오면 안 된다.

## 10.6 제한된 제네릭 타입

타입스크립트는 타입 매개변수가 타입을 확장해야 한다고 선언할 수 있으며 별칭 타입에만 허용되는 작업이다. 타입 매개변수를 제한하는 구문은 매개변수 이름 뒤에 `extends` 키워드를 배치하고 그 뒤에 이를 제한할 타입을 배치한다.

`length: number`를 가진 모든 것을 설명하기 위해 `WithLength` 인터페이스를 생성하면 제네릭 함수가 `T` 제네릭에 대한 length를 가진 모든 타입을 받도록 구현할 수 있다.
문자열, 배열 그리고 `length: number`를 가진 객체가 인자로 들어오는 것을 허용하지만 Date와 같은 형태에는 length 멤버가 없으므로 타입 오류가 발생한다.

```ts
interface WithLength {
  length: number;
}

function logWithLength<T extends WithLength>(input: T) {
  console.log(`Length: ${input.length}`);
  return input;
}

logWithLength('123'); // 타입: string
logWithLength([false, true]); // 타입: boolean[]
logWithLength({ length: 123 }); // 타입: {length: number}

logWithLength(new Date());
// Error: Argument of type 'Date' is not assignable to parameter of type 'WithLength'
//  Property 'length' is missing in type 'Date' but required in type 'WithLength'.
```

## 10.7 Promise

### async 함수

자바스크립트에서 `async` 키워드를 사용해 선언한 모든 함수는 `Promise`를 반환한다.
자바스크립트에서 `async` 함수에 따라서 반환된 값이 `Thenable`(`.then()` 메서드가 있는 객체, 실제로는 거의 항상 `Promise`)이 아닌 경우, `Promise.resolve`가 호출된 것처럼 `Promise`로 래핑된다.


```ts
// 타입: (text: string) => Promise<number>
async function lengthAfterSecond(text: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return text.length;
}

// 타입: (text: string) => Promise<number>
async function lengthImmediately(text: string) {
  return text.length;
}
```

`Promise`를 명시적으로 언급하지 않더라도 `async` 함수에서 수동으로 선언된 반환 타입은 항상 `Promise` 타입이 된다.

```ts
// OK
async function givesPromiseForString(): Promise<string> {
  return 'Done!';
}

async function givesString(): string {
  // Error: The return type of an async function or method must be the global Promise<T> type.
  return 'Done!';
}
```