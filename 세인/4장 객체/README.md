# 4장 객체

## 4.1 객체 타입

### 4.1.1 객체 타입 선언

```ts
const obj: {
  age: number;
  name: string;
};

obj = {
  age: 20,
  name: "sein",
};
```

### 4.1.2 별칭 객체 타입

```ts
type ObjType = {
  age: number;
  name: string;
};

ObjType = {
  age: 20,
  name: "sein",
};
```

## 4.2 구조적 타이핑

타입을 충족하는 모든 값을 해당 타입의 값으로 사용 가능

```ts
type WithFirstName = {
  firstName: string;
};

type WithLastName = {
  lastName: string;
};

const hasBoth = {
  firstName: "Lucille",
  lastName: "Clifton",
};

// hasBoth는 'string' 타입의 'firstname'을 포함함
let withFirstName: WithFirstName = hasBoth;
// hasBoth는 'string' 타입의 'firstname'을 포함함
let withLastName: WithLastName = hasBoth;
```

### 4.2.1 사용 검사

객체 타입에 필요한 멤버가 객체에 없다면 타입스크립트는 타입 오류 발생

```ts
type Name = {
  first: string;
  last: string;
};

const test1: Name = {
  first: 'sein',
  last: 'hyun'
}; // OK

const test2: Name {
	// Error: Property 'last' is missing in type '{ first: string; }'
	// but required in type 'name'
  first: 'sein',
}
```

### 4.2.2 초과 속성 검사

```ts
type Name = {
  first: string;
  last: string;
};

const test1: Name = {
  first: "sein",
  last: "hyun",
}; // OK

const test2: Name = {
  first: "sein",
  last: "hyun",
  age: 20, //Type '{ first: string; last: string; age: number; }' is not assignable to type 'Name'.
  // Object literal may only specify known properties, and 'age' does not exist in type 'Name'.
};
```

초과 속성 검사는 객체 타입으로 선언된 위치에서 생성되는 객체 리터럴에 대해서만 일어난다.

객체 리터럴을 제공하면 초과 속성 검사를 우회할 수 있다.

### 4.2.3 중첩된 객체 타입

객체는 다른 객체의 멤버로 중첩될 수 있으므로 객체 타입도 중첩 가능하다.

중첩된 객체 타입을 고유한 타입 이름으로 바꿔 사용하면 가독성이 좋다.

### 4.2.4 선택적 속성

타입의 속성 애너테이션 : 앞에 ? 추가 → 선택적 속성임을 나타낸다.

```ts
type Book = {
  author?: string;
  pages: number;
};
```

선택적 속성과 undefined를 포함한 유니언 타입의 속성은 다르다.

?를 사용한 선택적 속성은 존재하지 않아도 되지만, 필수로 선언된 속성과 | undefined는 반드시 존재해야한다.

## 4.3 객체 타입 유니언

### 4.3.1 유추된 객체 타입 유니언

변수에 여러 객체 타입 중 하나가 될 수 있는 초깃값이 주어지면 타입스크립트는 해당 타입을 객체 타입 유니언으로 유추한다.

각 객체 타입을 구성하고 있는 요소를 모두 가질 수 있다.

```ts
const poem =
  Math.random() > 0.5 ? { name: "1", pages: 7 } : { name: "2", rhymes: true };

/*
const poem: {
    name: string;
    pages: number;
    rhymes?: undefined;
} | {
    name: string;
    pages?: undefined;
		rhymes: boolean;
}
*/

poem.name; // string
poem.pages; // number | undefined
poem.rhymes; // booleans | undefined
```

-> poem값은 항상 string, pages와 rhyems는 있을 수도 있고 없을 수도 있다.

### 4.3.2 명시된 객체 타입 유니언

객체 타입을 더 명확히 정의하기 위해서 객체 타입의 조합을 명시한다.

```tsx
type PoemWithPages = {
  name: string;
  pages: number;
};

type PoemWithRhymes = {
  name: string;
  rhymes: boolean;
};

type Poem = PoemWithPages | PoemWithRhymes;

const poem: Poem =
  Math.random() > 0.5 ? { name: "1", pages: 7 } : { name: "2", rhymes: true };

poem.name; // OK
poem.pages; // Error
poem.rhymes; // Error
```

→ 존재하지 않는 객체 멤버에 대한 접근을 제한 → 코드 안전성 높임

4.3.3 객체 타입 내로잉

```ts
if ("pages" in poem) {
	poem.pages;
} else {
	poem.rhymes;
}

if (poem.pages) // Error:
```

### 4.3.4 판별된 유니언

판별된 유니언: 객체의 속성이 객체의 형태를 나타내도록 하는 것

판별값: 객체의 타입을 가리키는 속성

```tsx
type PoemWithPages = {
  name: string;
  pages: number;
  type: "pages";
};

// ...

const poem: Poem =
  Math.random() > 0.5
    ? { name: "1", pages: 7, type: "pages" }
    : { name: "2", rhymes: true, type: "rhymes" };
```

→ [4.3.2] 코드에서 type이 추가됨

## 4.4 교차 타입

& 교차타입을 사용해 여러 타입을 동시에 나타낸다. 여러 기존의 객체 타입을 별칭 객체 타입으로 결합해 새로운 타입을 생성한다.

```ts
type Artwork = {
  genre: string;
  name: string;
};

type Writing = {
  pages: number;
  name: string;
};

type WrittenArt = Artwork & Writing;

/* 
{
	genre: string;
	name: string;
	pages: number;
}
*/
```

### 4.4.1 교차 타입의 위험성

긴 할당 가능성 오류
