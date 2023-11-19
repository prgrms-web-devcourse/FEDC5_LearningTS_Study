## 배열

자바스크립트 배열은 매우 유연하고 내부의 모든 타입을 혼합해서 저장 할 수 있다.

타입스크립트는 초기 배열에 어떤 데이터 타입이 있는지 기억하고 해당 데이터 타입에서만 작동하도록 제한한다.

```ts
const name = ["h0ber", "hello"];

name.push(true); // Error
```

### 6.1 배열 타입

다른변수선언과 마찬가지로 배열을 저장하기 위한 변수는 초기값이 필요하지 않다.

#### 6.1.1 배열 & 함수타입

배열 타입은 함수 타입에 무엇이 있는지를 구별하는 괄호가 필요한 구문 컨테이너의 예시이다.

```ts
const createStrings: () => string[] = () => {};

const makeStringArray: (() => string)[];
```

둘의 차이는 string배열을 반환하는 함수 / string을 반환하는 함수가 담겨있는 배열 의 차이다.

#### 6.1.2 유니언 타입 배열

```ts
let stringArray: string | number[];
let stringOrNumber: (string | number)[];
```

두 예시의 차이는 string과 숫자로 된 배열인지 , 배열에 문자열 또는 숫자인지의 차이이다.

#### 6.1.3 any 배열의 진화

초기에 빈배열로 설정된 변수에서 타입애너테이션을 포함하지 않으면 배열은 `any[]`로 취급하고 모든 콘텐츠를 받을 수 있다
또한, 변수가 변경됨에 따라 타입도 끊임없이 변화하기 때문에 좋지 않다.

```ts
const values = []; // any[]
values.push("h0ber"); // string[]
values[0] = 0; // (string|number)[]
```

#### 6.1.4 다차원 배열

다차원 배열은 배열타입에 새로운 개념을 도입하는 것이 아니라 원래의 타입을 가지며 차원이 하나씩 늘어간다고 생각하면 된다.

### 6.2 배열 멤버

유니언 타입으로 된 배열의 멤버는 그 자체로 동일한 유니온 타입

`const test = ['h0ber' , 123] // string | number `

#### 6.2.1 불안정한 멤버

타입스크립트 타입 시스템은 기술적으로 불안정하다고 알려져있다. 대부분 올바른 타입을 얻을 수 있지만 때로는 값 타입에 대한 타입 시스템의 이해가 올바르지 않을 수 있다.

```ts
function test(element: string[]) {
  console.log(element[500].length);
}

test(["h0ber", "1234"]);
```

위와같은 예시에서 test[500]은 undefined지만 string타입으로 간주되기에 오류를 표시하지 않는다.

### 6.3 스프레드와 나머지 매개변수

...연산자를 사용하는 나머지 매개변수와 스프레드는 배열과 상호작용하는 핵심방법

#### 6.3.1 스프레드

```ts
const stringArr = ["h0ber", "qwEr"];
const numberArr = [1, 2, 3, 4];

const joinArr = [...stringArr, ...numberArr];
```

joinArr의 타입은 `(string|number)[]` 이다.

### 6.4 튜플

```ts
let tupleTest: [number, string];

tupleTest = [530, "h0ber"];

tupleTest = ["h0ber", 320]; // Error
```

튜플은 여러 값을 할당하기 위해 튜플과 배열 구조분해 할당을 함께 자주사용한다.

#### 6.4.1 튜플 할당 가능성

튜플 타입은 가변 길이의 배열타입보다 더 구체적으로 처리된다.

**나머지 매개변수로서의 튜플**

매개변수가 `(name : string , value : number)` 인 경우 `(string|number)[]`의 타입을 가진 배열은 안전을 보장할 수 없기에 `[string , number]`형태의 튜플만이 나머지매개변수를 통해 호출 할 수 있다.

#### 6.4.2 튜플추론

타입스크립트는 생성된 배열을 튜플이 아닌 가변 길이의 배열로 취급한다.

함수 호출을 통해 [number , string]을 반환하는 경우 튜플이 아닌 일반적으로 (string|number)[]의 배열을 반환한다.

타입스크립트에서 명시적 튜플 타입과 const 어서션을 통해 조금 더 구체적으로 튜플타입을 지정한다.

**명시적 튜플 타입**
튜플타입도 타입 애너테이션을 사용할 수 있다.

`:[string , number]`를 통해 명시적으로 타입을 지정해줘야 한다.

**const어서션**

as const 연산자를 제공해 읽기전용이 가능한 값형식을 사용하도록 지시한다.

`const readOnlyTuple = [123,'h0ber'] as const `

유연한 크기의 배열을 고정된 크기의 튜플로 전환하는것을 넘어서서 읽기전용이고 값 수정이 예상되는 곳에서 사용할 수 없음을 나타낸다.
