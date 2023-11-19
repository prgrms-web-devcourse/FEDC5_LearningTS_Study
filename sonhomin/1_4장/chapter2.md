## CHAPTER 1

#### 타입스크립트

> 프로그래밍 언어 - 자바스크립트의 모든 구문 및 타입을 정의하고 사용하기 위한 타입스크립트 고유 구문이 포함된 언어
> 타입 검사기 : 타입스크립트로 작성된 일련의 파일에서 생성된 모든 구성 요소를 이해하며 , 잘못 구성된 부분을 알려주는 프로그램
> 컴파일러 : 타입 검사기를 실행 후 상응하는 자바스크립트 코드를 생성하는 프로그램
> 언어 서비스 : VS Code 와 같은 편집기에 개발자에게 유용한 유틸리티를 제공하는 프로그램

코드의 진행은 [플레이그라운드](https://www.typescriptlang.org/play?#code/MYewdgzgLgBAhjAXDaAnAlmA5jAvDAcgAsQAjAU1QIChrRIQAbcgOkZCwAo4BKIA) 에서 해볼 것

## CHAPTER 2

### 타입의 종류

**타입**은 자바스크립트에서 다루는 값의 형태를 말하며 , 값에 존재하는 속성 및 메서드와 내장되어있는 `typeof` 연산자가 설명하는것을 의미한다.

| 원시타입의 종류 |
| :-------------: |
|      null       |
|    undefined    |
|     string      |
|     number      |
|     boolean     |
|     bigint      |
|     symbol      |

#### 2.1.1 타입 시스템

타입 시스템이란 프로그래밍 언어가 프로그램에서 가질 수 있는 타입을 이해하는 방법에 대한 규칙

1. 코드를 해석하고 타입과 값을 이해한다.
2. 초기 선언에서 가질 수 있는 타입을 확인
3. 각각의 값들이 코드에서 어떻게 사용되는지를 확인
4. 값의 사용과 타입이 일치하지 않으면 오류를 표시

#### 2.1.2 오류의 종류

구문오류

> 타입스크립트가 코드로 이해할 수 없는 잘못된 구문을 감지할 때 발생하며 자바스크립트 파일을 생성하는것을 차단한다.

타입오류

> 타입스크립트의 타입 검사기가 타입에서 오류를 감지했을 때 발생하며 자바스크립트로 변환되는것을 차단하진 않지만 코드가 실행됐을 때 예기치 않은 오류가 발생할 수 있음을 보여준다.

### 2.2 할당 가능성

타입스크립트는 변수의 초기값을 해석하고 변수에 허용되는 타입을 결정

해당 변수에 새로운 값이 할당되면 새롭게 할당된 값의 타입과 기존의 타입이 동일한지 확인

```ts
let first = "h0ber";
first = "second";

let second = "h0ber";
second = true; // Error
```

**할당가능성** : 함수 호출 및 변수에 값을 제공할 수 있는지 여부를 확인하는 것

#### 2.2.1 할당 가능성 오류 이해

`Type ... is not assignable to type ...` 형태의 에러는 가장 빈번하게 발생하는 오류 중 하나이며 첫번째 타입은 변수에 할당하려고 시도하는 값이고 두번째 type은 값이 할당되는 변수를 말한다.

### 2.3 타입 애너테이션

때로 변수에 타입스크립트가 읽어야 할 초기값이 없는 경우도 있다. 이때 기본적으로 any 타입으로 간주하며 어떠한 타입이 할당되도 상관없다.

```ts
let annotation;

annotation = "h0ber"; // 타입 string
console.log(annotation.length);

annotation = 123; // 타입 number
console.log(annotation.length); // Error

let annotation: string; // 애너테이션
annotation = 123; // Error
```

타입 시스템에만 존재하는 것은 컴파일 된 자바스크립트로 변환되지 않는다. 타입스크립트 타입은 컴파일을 통해 자바스크립트에 어떠한 영향도 미치지 않는다.

왜 어노테이션이 아니고 애너테이션이죠..?

#### 2.3.1 불필요한 애너테이션

초기값에 의해 타입추론이 가능할 땐 , 너무 많은 애너테이션이 코드를 복잡하게 만들 수 있다. 명시적으로 포함하는 것이 경우에따라 유용할 수도 있다.

```ts
let firstName: string = "h0ber";

let secondName = "h0ber";

// 두개의 코드가 동작하는데 전혀 문제가 없다.
```

### 2.4 타입형태

타입스크립트는 타입일치를 확인하는 것 외에 많은 역할을 수행한다

```ts
let rapper = "hell0";
rapper.length; // ok

rapper.push("!"); // rapper는 push프로퍼티를 갖지 않는다.
```

위의 예시와 같이 string타입에서 작동하는지 알 수 없는 동작은 허용되지 않는다.

#### 2.4.1 모듈

```ts
import { value } from "./values";

export const double = value * 2;
```

타입스크립트는 파일이 스크립트면 해당 파일을 전역스코프로 간주하고 모든 스크립트가 파일의 내용에 접근할 수 있다. 이는 다른 스크립트에서 선언된 변수와 동일한 네이밍을 가질 수 없다는것을 말한다.

## 유니언 리터럴

유니언 : 값에 허용된 타입을 두개 이상의 타입을 허용하도록 확장하는 것
내로잉 : 값에 허용된 타입이나 하나 이상의 타입이 가능하지 않도록 축소시키는 것

### 3.1 유니언 타입

```ts
let machine = Math.random() > 0.5 ? undefined : "h0ber";

let machine2: string | undefined;
machine2 = Math.random() > 0.5 ? undefined : "h0ber";
```

유니언이란 정확히 어떤타입일지 모르지만 두 개 이상의 옵션 중 하나를 정의할 때 좋다.
`|` 를 통해 유니언타입을 지정할 수 있다.

다만 두가지 타입 모두 갖고있는 프로퍼티는 사용할 수 있지만, 특정타입에는 존재하고 나머지에는 존재하지 않는다면 해당 프로퍼티는 사용할 수 없다.

### 3.2 내로잉

타입스크립트가 값의 타입이 이전에 알려진 것 보다 더 좁혀졌다는것을 알게되면 타입가드를 통해 논리적검사를 진행한다.

```ts
// 할당을 통한 내로잉
let check: number | string;
check = "h0ber";

check.toFixed(); // Error

// 조건검사를 통한 내로잉
let check2 = Math.random() > 0.5 ? "h0ber" : 123;
if (check2 === "h0ber") {
  check2.toUpperCase();
}

check2.toUpperCase(); // Error

// typeof 검사를 통한 내로잉

let check3 = Math.random() > 0.5 ? "h0ber" : 123;
typeof check3 === "string" ? check3.toUpperCase() : check3.toFixed();
```

**할당을 통한 내로잉**

> 초기에 number | string 으로 선언했지만 string을 할당하면서 string타입이라는 것을 인지하게 된다.

**조건 검사를 통한 내로잉**

> if조건문이 동작하면 check2는 string이라는 타입이 확정되지만 그렇지 않다면 number | string이기에 에러가 발생

**typeof 검사를 통한 내로잉**

> typeof검사를 통해 타입이 확정되고 난 이후의 코드가 동작

### 3.3 리터럴 타입

리터럴 타입이란 구체적인 버전의 원시타입이며 예를들어 string은 존재할 수 있는 모든 문자열의 집합을 나타내지만

```ts
const check = "h0ber";
```

check는 'h0ber'이라는 문자열만을 갖는다.

유니언 타입에 리터럴과 원시타입을 섞어서 사용할 수 있다.

### 3.4 엄격한 null

**strictNullChecks**를 활성화하면 모든 타입에 | null | undefined를 해줘야 한다.

해당 옵션을 false로 하는것이 더 안전하다고 주장하지만 실질적으로 undefined.toLowerCase() 는 잘못된 것이다.

자바스크립트에서는 잠재적인 true / truthy 가 true로 간주된다.

타입스크립트는 잠재적인 값중 truthy로 확인된 일부에 한해서만 타입을 좁힐 수 잇다.

```ts
let checkNull = Math.random() > 0.5 ? "h0ber" : undefined;

if (checkNull) {
  console.log(checkNull.toUpperCase());
}
checkNull.toLLowerCase(); //  undefined일 수 있기에 에러가 발생한다.
```

위와같은 예제에서 if문 내에서는 string으로 한정되지만 if문 밖에서는 정확한 타입을 좁힐 수 없다.

### 3.5 타입 별칭

**type name = 타입** 과 같은형태로 재사용하는 타입에 타입별칭을 지정해 줄 수 있으며 네이밍은 파스칼 케이스로 이름을 지정합니다.

타입별칭은 자바스크립트가 아니기 때문에 자바스크립트로 변환되지 않는다. 타입별칭은 '개발 시' 에만 존재한다.

타입별칭은 결합또한 가능하다. 순서는 중요하지 않다.

```ts
type id = number | string;
type checkId = id | null | undefined;
```

## 객체

{...} 구문을 통해 객체 리터럴을 생성하면 value.멤버 , value['멤버']를 통해 프로퍼티에 접근할 수 있다.

```ts
const test = {
  name: "h0ber",
  age: 26,
};

test.name; // string
test.age; // number

test.end; // Error
```

### 4.1 객체 타입 선언

```ts
const test: {
  name: string;
  age: number;
};

test = {
  name: "h0ber",
  age: 26,
};
```

위와같은 방법으로 모든 객체의 타입을 지정해주는것은 매우 귀찮은 일이기에 별칭 객체 타입을 이용해 재활용성을 높인다.

```ts
type first = {
  first: string;
};

type second = {
  second: string;
};

const has = {
  first: "h0",
  second: 123,
};

const withName: first = has;

console.log(withName);
```

**질문?** 해당코드에서 second에 대한 타입지정을 안해줬는데 어떻게 코드가 동작하는지 모르겠어요..

first에 대한 타입만 명시하고 second는 추론에 의해 타입이 지정된다 < 이게 맞는 내용인가?

#### 4.2.1 선택적 속성

애너테이션 앞에 ? 를 추가하면 선택적 속성임을 나타낼 수 있다.

```ts
type book = {
  name: string;
  pages?: number;
};

const ok: book = {
  name: "h0ber",
};
```

### 4.3 객체 타입 유니언

타입스크립트 코드에서는 속성이 다른 객체타입이 될 수 있는 타입을 설명할 수 있어야 한다.

#### 4.3.1 유추된 객체타입 유니언

초기값을 할당함으로 인해 객체 타입을 객체 타입 유니언으로 유추

#### 4.3.2 명시된 객체타입 유니언

```ts
type first = {
  name: string;
  page: number;
};

type second = {
  name: string;
  thymes: boolean;
};

// ... 중략

poem.page; // poem 이 second타입이라면 page에 접근할 수 없다.
```

와 같이 명시적으로 타입을 지정할 수 있다. 하지만 잠재적으로 존재하지 않는 객체의 멤버에 접근하려 했을 때 에러코드가 반환된다.

#### 4.3.4 판별된 유니언

```ts
// ... 중략

type Poem = first | second;

const poem: Poem = {
  // ... 중략
};

//... 내로잉
```

위같은 예제에서 **Poem** 은 판별된 유니언이라 부르고 first/second 중 실제 객체가 가리키는 타입을 판별값이라 한다.

### 4.4 교차타입

교차타입이란 & 기호를 사용해 결합하고 확장하는것을 말한다.

```ts
type first = {
  name: string;
  age: number;
};

type second = {
  check: boolean;
};

type third = first & second;

// type third = {
//   name: string;
//   age: number;
//   check: boolean;
// };
```

교차타입은 유용한 개념이지만 컴파일러를 혼동시키는 방식으로 사용할 수 있기에 주의해야 한다.

#### 교차타입의 위험성 (never타입)

```ts
type notPossible = number & string;
```

위와같은 예제에서 notPossible은 never타입이 된다. never타입은 자주사용하지 않지만 가끔 불가능한 상태를 표현하기 위해 등장한다.
