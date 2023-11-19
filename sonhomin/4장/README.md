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
