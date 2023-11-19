## 제네릭

제네릭을 활용해 코드에서 호출하는 방식에 따라 다양한 타입으로 작동하도록 의도할 수 있다.

제네릭 타입 매개변수는 원하는만큼 선언할 수 있다.

### 10.1 제네릭 함수

```ts
function test<T>(input: T) {
  return input;
}

test("name"); // type : string
test(123); // type : number
```

#### 10.1.1 명시적 제네릭 호출 타입

```ts
function test<Input>(callback: (input: Input) => void) {
  return (input: Input) => {
    console.log("Input : ", input);
    callback(input);
  };
}

test((input: string) => {
  console.log(input.length);
});
```

해당 예시에서 이해가 잘 되지 않아서 오랜시간 사용.

> Input은 단순 매개변수로 사용될 뿐이다.

test에서 매개변수로 전달된 타입은 `(input : string) => void`인데 Input이 test 에서 매개변수로 전달된 input의 타입에 따라 바뀐단 얘기다.

```ts
test((input: number) => {
  console.log(input);
});
```

이렇게 호출한 경우 callback의 타입은 `(input:number) => void`가 된다는거다.

#### 10.1.2 다중 함수 타입 매개변수

```ts
function test<T, U>(first: T, second: U) {
  return [first, second] as const;
}

let tuple = test(true, "h0ber");
// readonly [boolean , string] 타입
```

### 10.2 제네릭 인터페이스

인터페이스도 제네릭으로 선언할 수 있다.

```ts
interface Box<T> {
  inside: T;
}

const stringBox<string> = {
    inside : 'h0BER'
}

const numberBox<number> = {
    inside : 123
}
```

#### 10.2.1 유추된 제네릭 인터페이스 타입

제네릭 함수와 마찬가지로 인터페이스도 유추해서 사용할 수 있다.

### 10.3 제네릭 클래스

인터페이스와 같이 클래스도 추후 멤버에서 사용할 임이의 수의 타입 매개변수를 선언할 수 있다. 클래스의 각 인스턴스는 각자 다른 타입 인수 집합을 갖는다.

#### 10.3.1 명시적 제네릭 클래스 타입

```ts
class test<Input> {
  #callback: (input: Input) => void;
  constructor(callback: (input: Input) => void) {
    this.#callback = (input: Input) => {
      console.log(input);
      callback(input);
    };
  }
  call(input: Input) {
    this.#callback(input);
  }
}

new test((input: string) => {
  console.log(input.length);
});
```

위의 예시에서 Input은 string으로 해석되는 것을 유추할 수 있다.

```ts
new test<string>((input) => {
  console.log(input.length);
});
```

이렇게 Input을 직접적으로 명시해주는방법도 존재한다.

#### 10.3.2 제네릭 클래스 확장

제네릭 클래스는 extends키워드 다음에 오는 기본 클래스로 사용할 수 있다.
: 이론적인 부분은 이해가 되지만 실질적으로 사용에 대한 체감이 잘 없다

#### 10.3.3 제네릭 인터페이스 구현

```ts
interface first<T> {
  role: T;
}

class second implements first<string> {
  role: boolean;
}
```

위와같은 예시에서 role에 string타입을 부여했음에도 boolean을 재선언 하려고 하면 에러가 발생한다. 재선언이 안된다는 내용인 것 같다.

#### 10.3.4 메서드 제네릭

```ts
class Test<Key> {
  key: Key;

  constructor(key: Key) {
    this.key = key;
  }

  createTest<Value>(value: Value) {
    return { key: this.key, value };
  }
}

const test = new Test("h0ber");
test.createTest(10);

// {key : string , value : number}로 유추 된다.
```

#### 10.3.5 정적 클래스 제네릭

클래스의 정적 멤버는 인스턴스 멤버와 구별되고, 클래스의 특정인스턴스와 연결되어 있지 않다. 클래스의 정적 멤버는 클래스 인스턴스에 접근할 수 없거나 타입 정보를 지정할 수 없다.

결론은 정적 클래스 메서드는 자체 매개변수를 선언할 수 있지만 클래스에서 선언된 타입 매개변수는 모두 접근이 불가능하다.

### 10.4 제네릭 타입 별칭

`type Nullish<T> = T : null : undefined`

제네릭 타입 별칭은 보통 제네릭 함수의 타입을 설명하는 함수와 함께 사용된다.

```ts
type changeValue<In, Out> = (input: In) => Out;

let change: changeValue<string, number>;

change = (text) => text.length;

change = (text) => text.toUpperCase(); // Error
```

### 10.5 제네릭 제한자

#### 10.5.1 제네릭 기본값

=와 기본타입을 통해 타입 인수를 명시적으로 제공할 수 있다.

```ts
interface Check<T = string> {
  value: T;
}

const first: Check<number> = { value: 123 };
const second: Check = { value: 531 }; // Error
```

위와같은 예시에서 number라고 지정해준 경우 상관없지만 지정해주지 않은 경우는 string으로 제한된다.

```ts
interface check<Key, Value = Key> {
  key: Key;
  value: Value;
}

let first: check<string> = {
  key: "h0ber",
  value: "qwEr",
};
```

### 10.6 제한된 제네릭 타입

기본적으로 제네릭 타입에는 클래스, 인터페이스, 유니언 , 별칭등 모든 타입을 제공하지만 extends키워드를 배치하고 제한할 타입을 배치할 수 있다.

```ts
interface check {
  length: number;
}

function first<T extends check>(input: T) {
  console.log(input);
}

first([true, false]);
first("qwEr");
first({ length: 123 });
```

위같은 모든 예제가 length속성을 가져야 한다는 예시이다.

### 10.7 Promise

#### 10.7.1 생성

Promise 생성자는 단일 매개변수를 받도록 작성되며 축소형식은 아래와 같다.

```ts
class PromiseMake<Value> {
  constructor(
    executor: (
      resolve: (value: Value) => void,
      reject: (value: Value) => void
    ) => void
  );
}
```

결과적으로 resolve하려는 Promise를 만들기 위해서는 타입 인수를 명시적으로 선언해야 한다.

Promise의 재네릭 .then메서드는 반환되는 resolve된 값을 나타내는 타입 매개변수를 받는다.

#### 10.7.2 async 함수

Promise를 명시적으로 언급하지 않더라도 async함수에서 수동으로 선언된 반환 타입은 항상 Promise타입이 된다.

### 10.8 제네릭 올바르게 사용하기

제네릭을 처음 접하면 과도하게 남발하여 코드가 복잡해질 수 있으며 사용할 때 무엇을 위해 사용하는지 명확히 애햐 한다.

#### 10.8.1 황금률

타입매개변수의 사용을 2회 이하로 해야한다.

#### 10.8.2 명명 규칙

기본적으로 첫번째 타입 변수를 T로 사용하고 후속 타입변수를 U, V등을 사용

단, T에서 명확하지 않은 경우에는 타입이 사용되는 용도를 정확하게 제네릭 타입이름을 사용하는것이 좋다.
