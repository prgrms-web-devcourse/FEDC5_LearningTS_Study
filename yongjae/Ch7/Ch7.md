### 7. 인터페이스

- 인터페이스(interface): 연관된 이름으로 객체 형태를 설명하는 또 다른 방법

별칭으로 된 객체 타입과 여러 면에서 유사하지만 일반적으로 더 읽기 쉬운 오류 메시지, 더 빠른 컴파일러 성능, 클래스와의 더 나은 상호 운용성을 위해 선호됨

### 7.1 타입 별칭 vs. 인터페이스

```typescript
type Poet = {
  // 타입 별칭
  born: number;
  name: string;
};
```

```typescript
interface Poet = { // 인터페이스
    born: number;
    name: string;
}
```

다음과 같이 객체를 타입 별칭으로 구현하는 구문과 인터페이스로 구현한 구문은 거의 동일함

마찬가지로, 인터페이스에 대한 타입스크립트의 할당 가능성 검사와 오류 메시지는 객체 타입에서 실행되는 것과 거의 동일함

- 인터페이스와 타입 별칭 사이의 주요 **차이점**

① 인터페이스는 속성 증가를 위해 **병합**할 수 있음 → 내장된 전역 인터페이스 또는 npm 패키지와 같은 외부 코드를 사용할 때 특히 유용

② 인터페이스는 클래스가 선언된 **구조 타입**을 **확인**하는데 **사용 가능** ↔ 타입 별칭은 **사용 불가능**

③ 인터페이스에서 타입스크립트 타입 검사기가 더 **빨리** 작동함 → 타입 별칭이 하는 것처럼 새로운 객체 리터럴의 동적인 복사 붙여넣기보다 내부적으로 더 쉽게 캐시할 수 있는 명명된 타입을 선언함

④ 인터페이스는 어려운 특이 케이스에서 나타나는 오류 메시지를 좀 더 쉽게 읽을 수 있음 (이름 없는 객체 리터럴의 별칭이 아닌 이름 있는 객체로 간주되기 때문)

### 7.2 속성 타입

- 타입스크립트는 인터페이스가 자바스크립트 객체를 실제로 사용할 때 낯설고 이상할 수 있는 부분을 모델링할 수 있도록 유용한 타입 시스템 도구를 제공함

### 7.2.1 선택적 속성

- 객체 타입과 마찬가지로 타입 에너테이션: 앞에 ??를 사용해 인터페이스의 속성이 선택적 속성임을 나타냄

```typescript
interface Book {
  author?: string;
  pages: number;
}

// Ok
const ok: Book = {
  author: "Rita Dove",
  pages: 80,
};

const missing: Book = {
  pages: 80,
};
```

### 7.2.2 읽기 전용 속성

- 속성 이름 앞에 **readonly** 키워드를 추가해 인터페이스에 정의된 객체의 속성을 **재할당 하지 못함**

```typescript
interface Page {
  readonly text: string;
}

function read(page: Page) {
  // Ok : text 속성을 수정하지 않고 읽는 것
  console.log(page.text);

  page.text += "!"; // Error: readonly 속성에 재할당하려해서 오류 발생
}
```

> readonly 제한자는 타입 시스템에만 존재하며 인터페이스에서만 사용 가능

> 객체의 인터페이스를 선언하는 위치에서만 사용되고 실제 객체에서는 적용 안됨

```typescript
const pageIsh = {
  text: "Hello, world!",
};

pageIsh.text += "!"; // Ok: pageIsh는 Page 객체가 아니라 text가 있는, 유추된 객체 타입

read(pageIsh); // pageIsh의 더 구체적인 버전의 Page를 읽음
```

- readonly는 타입 시스템 구성 요소일 뿐 컴파일된 자바스크립트 출력 코드에는 존재하지 않음 → 단지 타입스크립트 타입 검사기를 사용해 개발 중에 그 속성이 수정되지 못하도록 보호하는 역할을 함

### 7.2.3 함수와 메서드

- 인터페이스 멤버를 함수로 선언하는 방법

① 메서드 구문: 인터페이스 멤버를 member(): void와 같이 객체의 멤버로 호출되는 함수로 선언
② 속성 구문: 인터페이스의 멤버를 member: () => void와 같이 독립 함수와 동일하게 선언

```typescript
interface HasBothFuntionTypes {
  property: () => string;
  method(): string;
}

const hasBoth: HasBothFuntionTypes = {
  property: () => "",
  method() {
    return "";
  },
};

hasBoth.property(); // Ok
hasBoth.method(); // Ok
```

```typescript
interface OptionalReadonlyFunctions {
  optionalProperty?: () => string; // 선택적 속성
  optionalMethod?: () => string;
}
```

- 메소드와 속성의 주요 차이점

① 메서드는 readonly로 선언할 수 없지만 속성은 가능함
② 인터페이스 병합은 메서드와 속성을 다르게 처리함
③ 타입에서 수행되는 일부 작업은 메서드와 속성을 다르게 처리함

### 7.2.4 호출 시그니처

```typescript
type FunctionAlias = (input: string) => number;

interface CallSignature {
  (input: string): number;
}

const typeFunctionAlias: FunctionAlias = (input) => input.lenth; // 타입: (input: string) => number

const typedCallSignature: CallSignature = (input) => input.length; // 타입: (input: string) => number
```

```typescript
interface FunctionWithCount {
  count: number;
  (): void;
}

let hasCallCount: FunctionWithCount;

function keepsTrackOfCalls() {
  keepsTrackOfCalls.count += 1;
  console.log("I've been called ${keepsTrackOfCalls.count} times!");
}

keepsTrackOfCalls.count = 0;

hasCallCount = keepsTrackOfCalls; // Ok

function doesNotHaveCount() {
  console.log("No idea!");
}

hasCallCount = doesNotHaveCount; // Error: count 속성이 주어지지 않음
```

### 7.2.5 인덱스 시그니처

- 타입스크립트는 인덱스 시그니처 구문을 제공해 인터페이스의 객체가 임의의 키를 받고, 해당 키 아래의 특정 타입을 반환할 수 있음을 나타냄

```typescript
interface WordCounts {
  [i: string]: number;
}

const counts: WordCounts = {};

counts.apple = 0; // Ok
counts.banana = 1; // Ok

counts.cherry = false; // Error: 객체 값이 boolean일 수 없음
```

- 인덱스 시그니처는 객체에 값을 할당할 때 편리하지만 타입 안정성을 완벽하게 보장하지는 않음 → 객체가 어떤 속성에 접근하든 간에 값을 반환해야 함

```typescript
interface DatesByName {
  [i: string]: Date;
}

const publishDates: DatesByName = {
  Frankenstein: new Date("1 January 1818"),
};

publishDates.Frankenstein; // 타입: Date
console.log(publishDates.Frankenstein.toString()); // Ok

publishDates.Beloved; // 타입은 Date이지만 런타임 값은 undefined
console.log(publishDates.Beloved.toString()); // Error: 타입 시스템에서는 오류가 나지 않지만 실제 런타임에서는 오류가 발생함
```

1. 속성과 인덱스 시그니처 혼합

- 인터페이스는 명시적으로 명명된 속성과 포괄적인 용도의 string 인덱스 시그니처를 한번에 포함할 수 있음

① 각각의 명명된 속성의 타입은 포괄적인 용도의 인덱스 시그니처로 할당할 수 있어야 함

② 명명된 속성이 더 구체적인 타입을 제공하고, 다른 모든 속성은 인덱스 시그니처의 타입으로 대체하는 것으로 혼합해서 사용할 수 있음

```typescript
interface HistoricalNovels {
  Oroonoko: number;
  [i: string]: number;
}

const novels: HistoricalNovels = {
  // Ok
  Outlander: 1991,
  Oroonoko: 1688,
};

const missingOroonoko: HistoricalNovels = {
  Outlander: 1991, // Error: Oroonoko 타입 없음
};
```

- 인덱스 시그니처의 원시 속성보다 명명된 속성에 대해 더 구체적인 속성 타입 리터럴을 사용할 수 있음

```typescript
interface ChapterStarts {
  preface: 0;
  [i: string]: number;
}

const correctPreface: ChapterStarts = {
  preface: 0,
  night: 1,
  shopping: 5,
};

const wrongPreface: ChapterStarts = {
  preface: 1, // Error: preface 속성은 반드시 0이어야 함
};
```

2. 숫자 인덱스 시그니처

- 인터페이스는 명시적으로 명명된 속성과 포괄적인 용도의 string 인덱스 시그니처를 한번에 포함할 수 있음

```typescript
interface MoreNarrowNumbers {
  [i: number]: string;
  [i: string]: string | undefined;
}

const mixesNumbersAndStrings: MoreNarrowNumbers = {
  // Ok
  0: "",
  key1: "",
  key2: undefined,
};

interface MoreNarrowStrings {
  [i: number]: string | undefined; // Error: ???
  [i: string]: string;
}
```

### 7.2.6 중첩 인터페이스

- 인터페이스 타입도 자체 인터페이스 타입 혹은 객체 타입을 속성으로 가질 수 있음

```typescript
interface Novel {
  author: {
    name: string;
  };
  setting: Setting;
}

interface Setting {
  place: string;
  year: number;
}

let myNovel: Novel;

myNovel = {
  author: {
    name: "Jane Austen",
  },
  setting: {
    place: "England",
    year: 1812,
  },
};

myNovel = {
  author: {
    name: "Emily Bronte",
  },
  setting: {
    place: "West Yorkshire", // Error: 타입에 year 없음
  },
};
```

### 7.3 인터페이스 확장

- 타입스크립트는 인터페이스가 다른 인터페이스의 모든 멤버를 복사해서 선언할 수 있는 **확장**된 인터페이스를 허용함 ⇒ <U>확장할 인터페이스의 이름 뒤에 extends 키워드를 추가</U>

```typescript
interface Writing {
  title: string;
}

interface Novella extends Writing {
  pages: number;
}

let myNovella: Novella = {
  // Ok
  pages: 195,
  title: "Ethan Frome",
};

let missingPages: Novella = {
  title: "The Awakening", // Error: pages 멤버 없음
};

let extraProperty: Novella = {
  pages: 300, // Error: title 멤버 없음
  strategy: "baseline",
  style: "Naturalism",
};
```

### 7.3.1 재정의된 속성

- 파생 인터페이스는 다른 타입으로 속성을 다시 선언해 기본 인터페이스의 속성을 재정의하거나 대체할 수 있음

→ 해당 속성을 유니언 타입의 더 구체적인 하위 집합으로 만들거나 속성을 기본 인터페이스의 타입에서 확장된 타입으로 만들기 위해 사용함

```typescript
interface WithNullableName {
  name: string | null;
}

interface WithNonNullableName extends WithNullableName {
  name: string;
}

interface WithNumbericName extends WithNullableName {
  name: number | string; // Error: number | string은 string | null에 할당할 수 없음
}
```

### 7.3.2 다중 인터페이스 확장

- 파생 인터페이스 이름에 있는 extends 키워드 뒤에 쉼표로 인터페이스 이름을 구분해 사용하면 여러개의 다른 인터페이스를 확장해서 선언할 수 있음

```typescript
interface GivesNumber {
    giveNumber(): number;
}

interface GiveString {
    giveString(): string;
}

interface GivesBothAndEither extends GivesNumber, GiveString {
    instance.giveEither(); // 타입: nubmer | string
    instance.giveNumber(); // 타입: nubmer
    instance.giveString(); // 타입: string
}
```

### 7.4 인터페이스 병합

- 두 개의 인터페이스가 동일한 이름으로 동일한 스코프에 선언된 경우 ⇒ 선언된 모든 필드를 포함하는 더 큰 인터페이스가 코드에 추가됨

```typescript
interface Merged {
  fromFirst: string;
}

interface Merged {
  fromSecond: number;
}

// ⇒ interface Merged {
//    fromFirst: string;
//    fromSecond: number;
// }
```

인터페이스가 여러곳에 선언되면 코드를 이해하기 어려워지므로 가능한 인터페이스 병합을 사용하지 않는 것이 좋음

⇒ **but,** **외부 패키지** 또는 Window 같은 **내장된 전역 인터페이스**를 보강하는데 특히 유용함

```typescript
interface Window {
  myEnvironmentVariable: string;
}

window.myEnvironmentVariable; // 타입: string
```

### 7.4.1 이름이 충돌되는 멤버

- 속성이 이미 인터페이스에 선언되어 있는 경우, 나중에 병합된 인터페이스에서도 동일한 타입을 사용해야 함

```typescript
interface MergedProperties {
  same: (input: boolean) => string;
  different: (input: string) => string;
}

interface MergedProperties {
  same: (input: boolean) => string; // Ok
  different: (input: number) => string; // Error: 위에 선언된 MergedProperties.different의 속성과 다르므로 에러 발생
}
```

- 병합된 인터페이스는 동일한 이름과 다른 시그니처를 가진 메서드는 정의할 수 있음 → 메서드에 대한 함수 오버로드 발생

```typescript
interface MergedMethods {
  different(input: string): string;
}

interface MergedMethods {
  different(input: number): string; // Ok
}
```
