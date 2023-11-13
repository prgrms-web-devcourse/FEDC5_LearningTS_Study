## Chapter4. 객체

### 객체 타입

- 명시적 객체 타입 선언
  - 형식:

```ts
{
  key: type;
}

// ex
let poetLater: {
  born: number;
  name: string;
};
```

- 별칭 객체 타입
  `별칭 객체 타입`: 정의한 객체 타입을 재사용하기 위해 정의한 별칭
  형식: (별칭 객체 타입 이름) = { 객체 타입 }

```ts
type Poet = {
  born: number;
  name: string;
};
let poetLater: Poet;
```

### 구조적 타이핑

`구조적으로 타입화`: 타입을 충족하는 모든 값을 해당 타입의 값으로 사용할 수 있다
TS는 구조적으로 타입화되어 있어 변수를 특정 객체 타입으로 선언하면 변수에 할당하는 객체에는 해당 속성이 있어야 한다.

```ts
type WithFristName = {
  firstName: string;
};
type WithLastName = {
  lastName: string;
};
const hasBoth = {
  firstName: "Stardyii",
  lastName: "Mutjaengi",
};

// ok : 'hasBoth'는 'string'타입의 'firstName' 포함
let withFirstName: WithFirstName = hasBoth;
// ok : 'hasBoth'는 'string'타입의 'lastName' 포함
let withLastName: WithLastName = hasBoth;
```

> 덕 타이핑
> : 런타임에서 사용될 때까지 객체 타입을 검사하지 않는 것

> 구조적 타이핑(TS) vs 덕 타이핑(JS)
>
> - 구조적 타이핑: TS의 타입 검사기에서 정적 시스템이 타입을 검사
> - 덕 타이핑: JS의 런타임에서 사용될 때까지 객체 타입을 검사하지 않는다

#### 사용 검사

- 객체 타입으로 애너테이션된 변수에 값을 할당할 때, TS는 값에 객체 타입의 필수 속성이 있는지, 속성의 타입이 일치하는지 검사한다.
- 객체 타입에 필요한 멤버가 없거나 타입이 불일치하면 TS는 `타입 오류`를 발생시킨다

```ts
type FirstAndLastNames = {
  first: string;
  last: string;
};
const hasOnlyOne: FirstAndLastNames = {
  first: "hi",
};
// hasOnlyOne 변수는 FirstAndLastNames 타입의 필수 속성인 last 멤버가 없기 때문에 타입 오류가 발생한다

const hasOtherType: FistAndLastNames = {
  first: 3,
  last: "hi",
};
// hasOhterType 변수의 first 멤버가 number 타입이므로 타입 오류 발
```

#### 초과 속성 검사

- 초기값에 객체 타입에서 정의된 것보다 많은 멤버가 있다면 타입 오류가 발생한다
- 초과 속성 검사는 객체 타입으로 선언된 변수에 **새로 생성되는 객체 리터럴에 대해서만 일어난다!** 기존 객체 리터럴을 할당하면 `초과 속성 검사`를 건너뛴다

#### 선택적 속성

- 형식: (타임속성)? : (타입)
- 선택적 속성으로 정의한 속성은 생략할 수 있다

> 선택적 속성 ( ?: ) vs ( | undefined)
>
> - 선택적 속성으로 선언된 속성은 값에서 존재하지 않아도 되지만
> - ( | undefined ) 로 선언된 속성은 값이 undefined일지라도 반드시 객체에 존재해야 한다

```ts
type Writers = {
  author: string | undefined;
  editor?: string;
};
// ok : 필수 속성 author는 undefined로 제공된다
// editor는 선택적 속성이므로 존재하지 않아도 된다다
const hasRequired: Writers = {
  author: undefined,
};
// 오류 : 필수 속성 author가 존재하지 않는
const missingRequired: Writers = {};
```

### 객체 타입 유니언

#### 유츄된 객체 타입 유니언

변수에 여러 객체 타입 중 하나가 초깃값으로 주어지면 TS는 해당 타입을 객체 타입 유니언으로 유추한다
**이때 유추된 유니언 타입은 각 객체 타입을 구성하고 있는 요소를 모두 가질 수 있다.** 초기값이 없는 속성의 경우, `선택적 타입`으로 객체 타입의 구성 요소로 주어진다

```ts
const poem =
  Math.random() > 0.5
    ? { name: "string1", pages: 8 }
    : { name: "string2", rhymes: true };
// 유추된 객체 유니언 타입
/* 
{
	name: string;
	pages: number;
	rhymes?: boolean;
}
|
{
	name: string;
	pages?: number;
	rhymes: boolean;
}
*/
```

#### 명시된 객체 타입 유니언

객체 타입 유니언을 명시적으로 선언할 수도 있다
명시적으로 선언했을 때 타입 시스템은 **유니언 타입을 구성하는 모든 객체 타입에 존재하는 속성에 대한 접근만 허용한다**
따라서 위의 예시에서 존재가 보장되지 않는 pages, rhymes 속성에 접근하면 오류가 발생한다

```ts
type PoemWithPages = {
  name: string;
  pages: number;
};
type PoemWithRhymes = {
  name: string;
  rhymes: boolean;
};
// 명시적 객체 타입 유니언
type Poem = PoemWithPages | PoemWithRhymes;

const poem: Poem =
  Math.random() > 0.5
    ? { name: "string1", pages: 8 }
    : { name: "string2", rhymes: true };

poem.name; // ok
poem.pages; // 오류: pages는 유니언을 구성하는 모든 객체 타입에서 존재가 보장되지 않는다
```

#### 객체 타입 내로잉

조건문을 통해 유니언 타입 값에 특정 속성이 포함된 경우에만 코드 영역을 실행하면 값의 타입을 해당 속성을 포함하는 객체로만 타입 내로잉을 적용할 수 있다
이때, `"(속성값)" in 객체` 형식으로 속성의 포함 여부를 검사한

```ts
if ("pages" in poem) {
} else {
}
```

> `if (poem.pages)` 와 같은 형식의 속성 여부 검사는 허용하지 않는다
> 존재하지 않을 수 있는 속성에 접근하려고 시도하면 타입 오류로 간주한다

#### 판별된 유니언

`판별된 유니언`: 유니언 타입으로 된 객체에서 객체의 속성이 객체의 타입을 판별하게 하는 것
`판별값`: 이때, 객체의 타입을 가리키는 속성
타입 내로잉을 할 때 판별값을 기준으로 내로잉을 수행하여 해당 객체가 어떤 타입인지 판별할 수 있다

```ts
type PoemWithPages = {
  name: string;
  pages: number;
  type: "pages";
};
type PoemWithRhymes = {
  name: string;
  rhymes: boolean;
  type: "rhymes";
};
const poem: Poem =
  Math.random() > 0.5
    ? { name: "string1", pages: 8, type: "pages" }
    : { name: "string2", rhymes: true, type: "rhymes" };

// 판별값을 기준으로 객체 타입 내로
if (poem.type === "pages") {
} else {
}
```

### 교차 타입

`교차 타입`: 여러 타입을 결합해 새로운 타입을 생성

- 기호: `&`
- 주로 여러 객체 타입을 별칭 객체 타입으로 결합해 새로운 타입을 생성하는 데 사용
- 교차 타입은 유니언 타입과 결합할 수 있다

#### 교차 타입의 위험성

- 긴 할당 가능성 오류
  복잡한 교차 타입을 생성하면 타입 검사기의 오류 메세지도 이해하기 어려워진다
  이를 완화하기 위해 타입을 일련의 별칭으로 된 객체 타입으로 분할하는 것이 좋다
- `never` 타입
  교차 타입을 잘못 사용하게 되면 불가능한 타입을 만들 수 있다.
  원시 타입 값은 동시에 여러 타입이 될 수 없기 때문에 교차 타입으로 결합할 수 없다
  만약 두개의 원시 타입을 교차 타입으로 결합하면 `never` 타입이 된다
  `never` 타입은 `bottom (empty)` 타입이다

> bottom, empty 타입
> 값을 가질 수 없고, 참조할 수 없는 타입
