# 15장 타입 운영

## 15.1 매핑된 타입

```ts
// 매핑된 타입은 유니언 타입에 존재하는 각 문자열 리터럴 키를 가진 객체를생성
type Animals = "aligator" | "baboob" | "cat";

type AnimalCounts = {
	[K in Animals]: number;
};
```

### 15.1.1 타입에서 매핑된 타입

```ts
interface BirdVariants {
	dove: string;
	eagle: boolen;
}

type NullableBirdVariants = {
	[K in keyof BirdVariants[K] | null,
};

/* {
		dove: string | null;
		eagle: boolean | null;
		}
*/
```

**매핑된 타입과 시그니처**

- member(): void 같은 메서드 구문: 인터페이스의 멤버가 객체의 멤버로 호출되도록 의도된 함수임을 선언
- member: () ⇒ void 같음 메서드 구문: 인터페이스의 멤버가 독립 실행형 함수와 같다고 선언

```ts
interface Reasearcher {
	researchMethod(): void;
	researchProperty: () => string;
}

type JustProperties<T> = {
	[K in keyof T]: T[K];
}

type ResearchProperties = JustProperties<Researcher>;

/* {
	researchMethod: () => void;
	reserachProperty: () => string;
	}
*/ 
// -> 매핑된 타입은 객체의 타입의 메서드와 속성 구문을 구분 x
```

### 15.1.2 제한자 변경

-readonly 또는 -?: 사용

```ts
type User = {
	-readonly [K in keyof P]: p[K];
}

type User = {
	[K in keyof P]-?: P[K];
}
```

### 15.1.3 제네릭 매핑된 타입

```ts
type MakeReadonly<T> = {
	readonly [K in keyof T]: T[K];
}

interface Specis {
	genus: string;
	name: string;
}

type ReadonlySepecis = MakeReadonly<Specise>;
/*
	{ 
		readonly genus: string;
		readonly name: string;
	}
*/
```

```ts
interface GenusData { 
	family: string;
	name: string;
}

type MakeOptional<T> = {
	[K in keyof T]?: T[K];
}
/*
{
	family?: string;
	name?: string;
}
*/
```

→ 재네릭 매핑된 타입을 즉시 사용할 수 있는 유틸리티 

- Partial<T> 타입을 사용해 모든 속성을 선택 사항으로 만들 수 있음

## 15.2 조건부 타입

```ts
LeftType extends RightType ? IfTrue : IfFalse
// LeftType이 RightType이 되는지 or 할당 가능 여부

// false 
type CheckString = string extends number ? true : false;
// string 타입을 number 타입에 할당할 수 있는가
```

### 15.2.1 제네릭 조건부 타입

재사용 가능한 제네릭 타입 

```ts
type CheckAgainstNumber<T> = T extends number ? true : false;

// type: false
type CheckString = CheckAgainstNumber<'parakeet'>;

// type: true
type CheckString = CheckAgainstNumber<1892>;

// type: true
type CheckString = CheckAgainstNumber<number>;
```

```ts
type CallableSetting<T> = 
	T extends () => any
		? T
		: () => T

// 타입 () => number[]
type GetNumbersSetting = CallableSetting<() => number[]>;

// 타입 () => string
type StringSetting = CallableSetting<string>;
```

### 15.2.2 타입 분산

```ts
type ArrayifyUnlessString<T> = T extends string ? T : T[];

// 타입: string | number[]
type HalfArrayified = ArrayifyUnlessString<string | number>;
```

### 15.2.3 유추된 타입

조건부 타입은 extends 절에 infer 키워드를 사용해 조건의 임의의 부분에 접근한다. 

→ 조건부 타입이 true인 경우 새로운 타입을 사용

```ts
type ArrayItems<T> = 
	T extends (infer Item)[]
		? Item
		: T;

// 타입: string
type StringItem = ArrayItems<string>;

// 타입: string
type StringArrayItem = ArrayItems<string[]>;

// 타입: string[]
type String2DItem = ArrayItems<string[][]>;
```

유추된 타입은 재귀적 조건부 타입을 생성하는 것도 가능

```ts
type ArrayItemsRecursive<T> =
	T extends (infer Item)[]
		? ArrayItemsRecursive<Item>
		: T;

// type: string
type StringItem = ArrayItemsRecursive<string>;

// type: string
type StringArrayItem = ArrayItemsRecursive<string>;

// type: string
type String2DItem = ArrayItemsRecursive<string[][]>;
// ????
```

### 15.2.4 매핑된 조건부 타입

- 매핑된 타입: 기존 타입의 모든 멤버에 변경 사항 적용
- 조건부 타입: 하나의 기존 타입에 변경 사항 적용

→ 제네릭 템플릿 타입의 각 멤버에 조건부 로직 적용 가능

```ts
type MakeAllMembersFunctions<T> = {
	[K in keyof T]: T[K] extends (...args: any[]) => any
		? T[K]
		: () => T[K]
};

type MemberFunctions = MakeAllMembersFunctions<{
	alreadyFunction: () => string,
	notYetFunction: number,
}>;

/*
{
	alreadyFunction: () => string,
	notYetFunction: () => number,
}
*/
```

## 15.3 never

- never 타입 애너테이션을 추가하면 런타임 코드뿐만 아니라 타입 시스템에서 맞지 않는 코드 경로를 더 공격적으로 탐지할 수 있다.

### 15.3.1 never와 교차, 유니언 타입

- bottom 타입인 never는 존재할 수 없는 타입이라는 의미

```ts
type NeverIntersection = never & string;  // 타입: never
type NeverUnion = nuver | string; // 타입: string
```

### 15.3.2 never와 조건부 타입

```ts
type OnlyStrings<T> = T extends string ? T : never;

type RedOrBlue = OnlyStrings<'red' | 'blue' | 0 | false>;
// red | blue
```

```ts
type FirstParameter<T extends (...args: any[]) => any> = 
	T extends (arg: infer Arg) => any
		? Arg
		: never;

type GetsString = FirstParameter<
	(arg0: string) => void
>; // type: string
```

### 15.3.3 never와 매핑된 타입

```ts
type OnlyStringProperties<T> = {
	[K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

interface AllEventData {
	participants: string[];
	location: string;
	name: string;
	year: number;
}

type OnlyStringEventData = OnlyStringProperties<AllEventData>;
// "location" | "name"
```

## 15.4 템플릿 리터럴 타입

- 문자열 타입이 패턴에 맞는지 확인하기 위해 템플릿 리터럴 타입을 사용

```ts
type Greeting = 'Hello${string}';

let matches: Greeting = "Hello, world!"; // ok

let outOfOrder: Greeting = "World! Hello!"; // Error

let missingAltogether: Greeting = "hi"; // Error
```

```ts
type Brightness = "dark" | "light";
type Color = "blue" | "red";

type BrightenessAndColor = '${Brightness}-${Color}';
// dark-red | light-red | dark-blue | light-blue

let first: BrightenessAndColor = "dark-blue"; // OK
let second: BrightenessAndColor = "medium-blue" // Error
```

```ts
type ExtolNumber = 'much ${number} wow';

function extol(extolee: ExtolNumber) 

extol('much 0 wow'); // OK
extol('much -7 wow'); // OK
```

### 15.4.1 고유 문자열 조작 타입

- 고유 제네릭 유틸리티 타입
    - Uppercase
    - Lowercase
    - Capitalize
    - Uncapitalize

```ts
type FormalGreeting = Capitalize<'hello.'>; // type: 'Hello.';
```

### 15.4.3 매핑된 타입 키 다시 매핑하기

- as 키워드를 이용하여 템플릿 리터럴 타입과 일치하도록 변경
- 매핑된 타입은 원래 값을 계속 참조하면서 각 매핑된 타입 속성에 대한 다른 키를 가질 수 있다.

```ts
interface DataEntry<T> {
	key: T;
	value: string;
}

type DataKey = "location" | "name" | "year";

type DataEntryGetters = {
	[K in DataKey as 'get${Capitalize<K>}']: () => DataEntry<K>;
}
/*
{
	getLocation: () => DataEntry<'location'>;
	getName: () => DataEntry<'name'>;
	getYear: () => DataEntry<'year'>;
}
*/
```

```ts
const config = {
	location: "unknown",
	name: "anonymous",
	year: 0,
};

type LazyValues = {
	[K in keyof typeof config as '${K}Lazy']: () => Promise<typeof config[K]>;
};

/*
{ 
	location: Promise<string>;
	name: Promise<string>;
	year: Promise<number>;
}
*/

async function withLazyvalues(configGetter: LazyValues {
	await configGetter.locationLazy; // type: string
	await configGetter.missingLazy(); // Error
}

```


> 💡 왜 타입이 이게 아니지?
> ```ts
>{
>	locationLazy: () => >Promise<string>;
>	nameLazy: () => >Promise<string>;
>	yearLazy: () => >Promise<number>;
>}
>```

- Symbol 키는 원시 타입이 아니기때문에 템플릿 리터럴 타입으로 사용할 수 없다!
- String과 교차 타입(&)을 사용하여 문자열이 될 수 있는 타입만 사용하도록 강제한다.
    - string & symbol은 never가 된다.

```ts
const someSymbol = Symbol("");

interface HasStringAndSymbol {
	StringKey: string;
	[someSymbol]: number;
}

type TurnIntoGetters<T> = {
	[K in keyof T as 'get${string & K}']: () => T[K]
};

type GettersJustString = TrunIntoGetters<HasStringAndSymbol>;
/* {
		getStringKey: () => string;
		}
*/
```