# 타입 운영

이제부터 멋진 기술을 배울 것이다.

## 매핑된 타입

다른 타입의 `속성`을 기반으로 하는 새로운 타입을 생성하는 구문이 제공된다. 그것을 `매핑`이라고 부르면 매핑된 타입 이라고 부른다.
in 키워드를 통해 다른 타입에서 계산된 타입을 사용한다.

```ts
type Animals = "aligators" | "baboon" | "cat";

type AnimalsCount = {
  [K in Animals]: number;
};
// 결과는 아래와 같은 타입이 나타남.
// {
//   aligators: number;
//   baboon: number;
//   cat: number;
// }
```

이런식의 선언은 공간을 절약하는 편리한 방법 중 하나이고
<br />??? 뭔뜻이지 이건? `매핑된 타입은 다른 타입에 대해 작동하고 멤버에서 제한자를 추가하거나 제거할 수 있을 때 정말로 유용해집니다`

keyof를 이용하여 타입의 키를 가져와서 새로운 타입으로 매핑하는 방식

```ts
interface AnimalVariants {
  alligator: boolean;
  baboon: number;
  cat: string;
}

type AnimalsCount = {
  [K in keyof AnimalVariants]: number;
};
// 결과는 아래와 같은 타입이 나타남.
// {
//   alligator: number;
//   baboon: number;
//   cat: number;
// }


// 아래와 같이 기존 타입에 키를 추가하는 형식으로도 진행 가능!
interface BirdVariants {
  dove: string;
  eagle: boolean;
}

type NullableBirdVariants {
  [K in keyof BirdVariants]: BirdVariants[K] | null
}

//결과는 아래와 같음
// {
//   dove: string | null;
//   eagle: boolean | null;
// }
```

함수로 선언하는 경우에도 동일하게 동작한다.

```ts
interface Researcher {
  researchMethod(): void;
  researchProperty: () => string;
}

type JustProperties<T> = {
  [K in keyof T]: T[K];
};

type ResearcherProps = JustProperties<Researcher>;
// 결과는 아래와 같음
// {
//   researchMethod(): void
//   researchProperty: () => string;
// }
```

제네릭으로도 역시 가능하다. 한가지 타입 혹은 인터페이스 기능을 선언해주어야하지만 동적으로 가능하다는 장점이 있음.

```ts
type MakeRO<T> = {
  readonly [K in keyof T]: T[K];
};

interface Species {
  genus: string;
  name: string;
}

type ReadOnlySpecies = MakeRO<Species>;
// 결과 아래와 같음
// {
//   readonly genus: string;
//   readonly name: string;
// }
```

요 아래가 좀 이해가 안가는데?

```ts
interface GenusData {
  family: string;
  name: string;
}

type MakeOP<T> = {
  [K in keyof T]?: T[K];
};

function createGD(overrrides?: MakeOP<GenusData>): GenusData {
  return {
    family: "unknown",
    name: "unknown",
    ...overrrides,
  };
}
```

## 조건부 타입

이전에 공부할 떄도 경험했듯 타입에서도 삼항연산자를 이용한 조건부 타입 할당이 가능하다. 특정 타입의 조건에 의해 두 타입 중 한가지 타입으로 정해지는 것이다. `extends`키워드와 앞서 언급한 삼항연산자를 사용한다.

제네릭을 활용하여 더 유연하게 사용할 수 있다.

```ts
type CheckAgainstNumber<T> = T extends number ? true : false;

type CheckString1 = CheckAgainstNumber<"string">;
// false

type CheckString2 = CheckAgainstNumber<1891>;
// true
```

자바스크립트 라이브러리에서 사용하는 패턴 중 조건부 제네릭 타입에도 적합한 한 가지 패턴은 함수에 제공된 옵션 객체를 기반으로 함수의 반환 타입을 변경하는 것이다.

```ts
interface QueryOptions {
  throwIfNotFound: boolean;
}

type QueryResult<Options extends QueryOptions> = Options["throwIfNotFound"] extends true ? string : string | undefined;

declare function retrieve<Options extends QueryOptions>(key: string, options?: Options): Promise<QueryResult<Options>>;

await retrieve("string");
// return type is string | undefined

await retrieve("Jane", { throwIfNotFound: true });
// return type is string
```

타입 분산..?

```ts
type ArrayifyUnlessString<T> = T extends string ? T : T[];

type HalfArrayified = ArrayifyUnlessString<string | number>;
// string | number[]
```

[조건부 타입과 타입 분산](https://inpa.tistory.com/entry/TS-%F0%9F%93%98-%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%A1%B0%EA%B1%B4%EB%B6%80-%ED%83%80%EC%9E%85-%EC%99%84%EB%B2%BD-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0)

조건부 타입은 extends 절에 `infer` 를 사용해 조건의 임의의 부분에 접근한다. 이후 extends 절에 타입에 대한 `infer` 와 새 이름을 배치하면 조건부 타입이 true인 경우 새로운 타입을 사용할 수 있다.

```ts
type ArrayItems<T> = T extends (infer Item)[] ? Item : T;

type StringItem = ArrayItems<string>;
// string

type StringArrayItem = ArrayItems<string[]>;
// string

type String2DItem = ArrayItems<string[][]>;
// string[]
```

매핑된 타입은 기존 타입의 모든 멤버에 변경 사항을 적용하고 조건부 타입은 하나의 기존 타입에 변경 사항을 적용하고 이 둘을 함께 사용하면 제네릭 템플릿 타입의 각 멤버에 조건부 로직을 적용할 수 있다.

```ts
type MakeAllMembersFunctions<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? T[K] : () => T[K];
};

type MemberFunctions = MakeAllMembersFunctions<{
  alreadyFunction: () => string;
  notYetFunction: number;
}>;

// 결과
// {
//     alreadyFunction: () => string,
//     notYetFunction: () => number,
// }
```

## never

교차 타입`&`에 있는 never는 교차 타입을 never로 만들고 유니언 타입`|`에 있는 never는 무시한다. 이는 조건부 타입과 매핑된 타입에서 값을 필터링하는 데 유용하다.

```ts
type OnlyStrings<T> = T extends string ? T : never;

type RedOrBlue = OnlyStrings<"red" | "blue" | 0 | false>;
// "red" | "blue"
```

never는 또한 제네릭 타입에 대한 타입 유틸리티를 만들 때 유추된 조건부 타입과 결합할 수 있다.

```ts
type FirstParameter<T extends (...args: any[]) => any> = T extends (arg: infer Arg) => any ? Arg : never;

type GetsString = FirstParameter<(arg0: string) => void>;
// string
```

유니언에서 never의 동작은 매핑된 타입에서 멤버를 필터링할 때도 유용하게 사용되는데 다음 세가지 타입 시스템 기능을 사용해 객체의 키를 필터링한다.

- 유니언에서 never는 무시됩니다.
- 매핑된 타입은 타입의 멤버를 매핑할 수 있습니다.
- 조건부 타입은 조건이 충족되는 경우 타입을 never로 변환하는 데 사용할 수 있습니다.

세 가지 기능을 함께 사용하면 원래 타입의 각 멤버를 원래 키 또는 never로 변경하는 매핑된 타입을 만들 수 있다. [keyof T]로 해당 타입의 멤버를 요청하면 모든 매핑된 타입의 결과 유니언이 생성되고 never는 필터링된다.

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

## 템플릿 리터럴 타입

템플릿 리터럴 타입은 템플릿 리터럴 문자열처럼 보이지만 추정할 수 있는 원시 타입 또는 원시 타입 유니언이 있다.

```ts
type Greeting = `Hello${string}`;

let matches: Greeting = "Hello, world";

let outOfOrder: Greeting = "World! Hello!";
// ERROR: Type '"World! Hello!"' is not assignable to type '`Hello${string}`'.
```

템플릿 리터럴 타입을 더 좁은 문자열 패턴으로 제한하기 위해 포괄적인 string 원시 타입 대신 문자열 리터럴 타입과 그 유니언을 타입 보간법에 사용할 수 있다. 템플릿 리터럴 타입은 제한된 허용 문자열 집합과 일치해야 하는 문자열을 설명하는 데 매우 유용하다.

```ts
type Brightness = "dark" | "light";
type Color = "blue" | "red";

type BrightnessAndColor = `${Brightness}-${Color}`;
// "dark-blue" | "dark-red" | "light-blue" | "light-red"
```

타입스크립트는 템플릿 리터럴 타입이 string, number, bigint, boolean, null, undefined와 같은 모든 원시 타입(symbol 제외) 또는 그 조합을 포함하도록 허용한다.

문자열 타입 작업을 지원하기 위해 타입스크립트는 문자열을 가져와 문자열에 일부 조작을 적용하는 고유 (타입스크립트에 내장된) 제네릭 유틸리티 타입을 제공한다.

- Uppercase: 문자열 리터럴 타입을 대문자로 변환합니다.
- Lowercase: 문자열 리터럴 타입을 소문자로 변환합니다.
- Capitalize: 문자열 리터럴 타입의 첫 번째 문자를 대문자로 변환합니다.
- Uncapitalize: 문자열 리터럴 타입의 첫 번째 문자를 소문자로 변환합니다.

템플릿 리터럴 타입은 문자열 리터럴을 사용할 수 있는 모든 위치에서 사용 가능하다.

```ts
type DataKey = "location" | "name" | "year";

type ExistenceChecks = {
  [K in `check${Capitalize<DataKey>}`]: () => boolean;
};

// {
//     checkLocation: () => boolean;
//     checkName: () => boolean;
//     checkYear: () => boolean;
// }
```

타입스크립트는 템플릿 리터럴 타입을 사용해 원래 멤버를 기반으로 매핑된 타입의 멤버에 대한 새로운 키를 생성할 수 있다. 매핑된 타입에서 인덱스 시그니처에 대한 템플릿 리터럴 타입 다음에 as 키워드를 배치하면 결과 타입의 키는 템플릿 리터럴 타입과 일치하도록 변경된다. 이후 매핑된 타입은 원래 값을 계속 참조하면서 각 매핑된 타입 속성에 대한 다른 키를 가질 수 있다.

```ts
interface DataEntry<T> {
  key: T;
  value: string;
}

type DataKey = "location" | "name" | "year";

type DataEntryGetters = {
  [K in DataKey as `get${Capitalize<K>}`]: () => DataEntry<K>;
};

// {
//     getLocation: () => DataEntry<"location">;
//     getName: () => DataEntry<"name">;
//     getYear: () => DataEntry<"year">;
// }
```

키를 다시 매핑하는 작업과 다른 타입 운영을 결합해 기존 타입 형태를 기반으로 하는 매핑된 타입을 생성할 수 있다. 한 가지 재미있는 조합은 기존 객체에 keyof typeof를 사용해 해당 객체의 타입에서 매핑된 타입을 만드는 것이다.

```ts
const config = {
  locaiton: "unknown",
  name: "anonymous",
  year: 0,
};

type LazyValues = {
  [K in keyof typeof config as `${K}Lazy`]: () => Promise<(typeof config)[K]>;
};

// {
//     location: Promise<string>;
//     name: Promise<string>;
//     year: Promise<number>;
// }
```

자바스크립트에서 객체 키는 string 또는 Symbol이 될 수 있고, Symbol 키는 원시 타입이 아니므로 템플릿 리터럴 타입으로 사용할 수 없다. 제네릭 타입에서 다시 매핑된 템플릿 리터럴 타입 키를 사용하려고 하면 타입스크립트는 템플릿 리터럴 타입에서 symbol을 사용할 수 없다는 오류를 발생시킨다.

```ts
type TurnIntoGettersDirect<T> = {
  [K in keyof T as `get${K}`]: () => T[K];
  // ERROR: Type 'symbol' is not assignable to type 'string | number | bigint | boolean | null | undefined'.
};
```

이러한 제한 사항을 피하기 위해 string과 교차 타입`&`을 사용하여 문자열이 될 수 있는 타입만 사용하도록 강제한다. string & symbol은 never가 되므로 전체 템플릿 문자열은 never가 되고 타입스크립트는 이를 무시한다.

```ts
const someSymbol = Symbol("");

interface HasStringAndSymbol {
  StringKey: string;
  [someSymbol]: number;
}

type TurnIntoGetters<T> = {
  [K in keyof T as `get${string & K}`]: () => T[K];
};

type GettersJustString = TurnIntoGetters<HasStringAndSymbol>;

// {
//     getStringKey: () => string;
// }
```
