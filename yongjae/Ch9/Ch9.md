# 09. 타입 제한자

## 9.1 top 타입

top 타입은 시스템에서 가능한 모든 값을 나타내는 타입이다. 즉, 모든 타입은 top 타입에 할당할 수 있다.

### 9.1.1 any 다시 보기

any 타입은 모든 타입의 위치에 제공될 수 있다는 점에서 top 타입처럼 작동할 수 있으며, 모든 타입의 데이터를 받아들이는 위치에서 사용한다.

```typescript
let anyValue: any;
anyValue = "Lucile Ball"; // Ok
anyValue = 123;

console.log(anyValue); // Ok
```

다만 any는 타입스크립트가 해당 값에 대한 할당 가능성 또는 멤버에 대해 타입 검사응 수행하지 않도록 명시적으로 지시한다는 문제점을 갖는다.

예를 들어 아래의 name.toUpperCase() 호출은 확실히 문제가 되지만, name이 any로 선언되었기 때문에 타입스크립트는 타입 오류를 보고하지 않는다.

```typescript
function greetComedian(name: any) {
  // 타입 오류 없음
  console.log("Announcing ${name.toUpperCase()}!");
}
greetComedian({ name: "Bea Arthur" });
// Runtime error: name.toUpperCase is not a function
```

어떤 값이 될 수 있음을 나타내려면 unknown 타입이 훨씬 안전하다.

### 9.1.2 unknown

모든 객체를 unknown 타입의 위치로 전달할 수 있다는 점에서 any와 유사하다. unknown타입과 any 타입의 주요 차이점으로는 unknown 타입의 값을 훨씬 더 제한적으로 취급한다는 점이다.

- 타입스크립트는 unknown 타입의 값의 속성에 직접 접근할 수 없다.
- unknown 타입은 top 타입이 아닌 타입에는 할당할 수 없다.

```typescript
function greetComedian(name: any) {
  // 타입 오류 없음
  console.log("Announcing ${name.toUpperCase()}!");
  // Error: Object is of type 'unknown'.
}
```

타입스크립트가 unknown 타입인 name에 접근할 수 있는 유일한 방법은 instanceof나 typeof 또는 타입 어서션을 사용하는 것처럼 값의 타입이 제한된 경우이다.

## 9.2 타입 서술어

우리는 isNumberOrString(value)가 true를 반환하므로 if 문 내부의 값이 두 가지 타입 중 하나여야 한다고 유추할 수 있지만 타입스크립트는 그렇지 않다. 타입스크립트는 isNumberOrString이 boolean 값을 반환한다는 사실만 알 수 있고, 인수의 타입을 좁히기 위함이라는 건 알 수 없다.

```typescript
function isNumberOrString(value: unknown) {
  return ["number", "string"].includes(typeof value);
}

function logValueIfExists(value: number | string | null | undefined) {
  if (isNumberOrString(value)) {
    // value: number \ string \ null \ undefined의 타입
    value.toString();
    // Error: Object is possibly undefined
  } else {
    console.log("Value does not exist:", value);
  }
}
```

타입스크립트에는 인수가 특정 타입인지 여부를 나타내기 위해 boolean 값을 반환하는 함수를 위한 특별한 구문이 있다. 이를 **타입 서술어**라고 부르며 '사용자 정의 타입 가드'라고도 부른다. 타입 서술어는 일반적으로 매개변수로 전달된 인수가 매개변수의 타입보다 더 구체적인 타입인지 여부를 나타내는 데 사용된다.

타입 서술어의 반환 타입은 매개변수의 이름, is 키워드, 특정 타입으로 선언할 수 있다.

```typescript
function typePredicate(input: WideType): input is NarrowType;
```

이전 예제의 isNumberOrString 함수에서 value를 value is number | string으로 명시적으로 변경하면 명시적 반환 타입을 가질 수 있. 반면에 value가 number | string이 아닌 경우 코드 블록은 null | undefined 타입의 값을 가져야 한다.

```typescript
function isNumberOrSTring(value: unknown): value is number | string {
  return ["number", "string"].includes(typeof value);
}

function logValueIfExists(value: number | string | null | undefined) {
  if (isNumberOrString(value)) {
    // value: number | string의 타입
    value.toString(); // Ok
  } else {
    // value: null | undefined의 타입
    console.log("value does not exist:", value);
  }
```

타입서술어는 이미 한 인터페이스의 인스턴스로 알려진 객체가 더 구체적인 인터페이스의 인스턴스인지 여부를 검사하는 데 자주 사용된다.

```typescript
interface Comedian {
  funny: boolean;
}

interface StandupComedian extends Comedian {
  routine: string;
}

function isStandupComedian(value: Comedian): value is StandupComedian {
  return "routine" in value;
}

function workWithComedian(value: Comedian) {
  if (isStandupComedian(value)) {
    // value: StandupComedian의 타입
    console.log(value.routine); // Ok
  }
}

// value: Comedian의 타입
console.log(value.routine);
// Error: Property 'routine' does not exist on type 'Comedian'.
```

타입 서술어는 false 조건에서 타입을 좁히기 때문에 타입 서술어가 입력된 타입 이상을 검사하는 경우 예상치 못한 결과를 얻을 수 있음을 주의하자.

결과적으로 else 문(false 조건)은 text를 undefined 타입으로 좁힌다.

```typescript
function isLongString(input: string | undefined): input is string {
  return !!(input && input.length >= 7);
}

function workWithText(text: string | undefined) {
  if (isLongString(text)) {
    // text: string의 타입
    console.log("Long text:", text.length);
  } else {
    console.log("Short text:", text?.length);
    // Error: Property 'length' does not exist on type 'never'.
  }
}
```

하지만 타입 서술어는 속성이나 값의 타입을 확인하는 것 이상을 수행해 잘못 사용하기 쉬으므로 가능하면 피하는 것이 좋다.

## 9.3 타입 연산자

키워드나 기존 타입의 이름을 사용해 모든 타입을 나타낼 수는 없다. 때로는 기존 타입의 속성 일부를 변환해서 두 타입을 결합하는 새로운 타입을 생성해야 할 때도 있다.

### 9.3.1 keyof

타입 시스템에서 키를 표현할 때는 string 같은 포괄적인 원시 타입을 사용하면 컨테이너 값에 대해 유효하지 않은 키가 허용된다.

타입스크립트는 기존에 존재하는 타입을 사용하고, 해당 타입에 허용되는 모든 키의 조합을 반환하는 keyof 연산자를 제공한다. 타입 애너테이션처럼 타입을 사용하는 모든 곳에서 타입 이름 앞에 keyof 연산자를 배치한다.

```typescript
function getCountKeyof(ratings, key: keyof Ratings): number {
  return ratings[key]; // Ok
}

const ratings: Ratings = { audience: 66, critic: 84 };

getCountkeyof(ratings, "audience"); // Ok

getCountKeyof(ratings, "not valid");
// Error: Argument of type '"not valid"' is not
// assignment to parameter or type 'keyof Ratings'.
```

### 9.3.2 typeof

typeof는 제공되는 값의 타입을 반환한다. typeof는 값의 타입을 수동으로 작성하는 것이 짜증날 정도로 복잡한 경우에 사용하면 매우 유용하다.

typeof 타입 연산자는 시각적으로 주어진 값이 어떤 타입인지를 반환할 때 사용하는 런타입 typeof 연산자처럼 보이지만 이 둘은 차이가 있다. 이름만 같은 단어일 뿐이다. typeof 연산자는 타입에 대한 문자열 이름을 반환하는 런타임 연산이라는 것을 기억해라. 타입스크립트의 typeof 연산자는 타입스크립트에서만 사용할 수 있으며 컴파일된 자바스크립트 코드에는 나타나지 않는다.

#### keyof typeof

typeof는 값의 타입을 검색하고, keyof는 타입에 허용된 키를 검색한다. 타입스크립트는 두 키워드를 함께 연결해 값의 타입에 허용된 키를 간결하게 검색할 수 있다. 두 키워드를 함께 사용하면 typeof 타입 연산자를 keyof 타입 연산자와 함께 작업할 때 매우 유용하다.

```typescript
const ratings = {
  imdb: 8.4,
  metacritic: 82,
};

function logRating(key: keyof typeof rating) {
  console.log(ratings[key]);
}

logRating("imdb"); // Ok

logRating("invalid");
// Error: Argument of type '"missing"' is not assignable
// to parameter of type '"imdb | "metacritic"'.
```

## 9.4 타입 어서션

타입스크립트는 코드의 모든 값이 정확히 알려진 타입을 가지는 경우, 가장 잘 작동한다. 타입스크립트는 경우에 따라 코드가 어떻게 작동하는지 타입 시스템에 100% 정확하게 알리는 것이 불가능할 때도 있다.

타입스크립트는 값의 타입에 대한 타입 시스템의 이해를 재정의하기 위한 구문으로 **타입 어서션**을 제공한다. 다른 타입을 의미하는 값의 타입 다음에 as 키워드를 배치한다. 타입 시스템은 어서션을 따르고 값을 해당 타입으로 처리한다.

```typescript
const rawDate = '["grace", "frankie"]';

// 타입: any
JSON.parse(rawData);

// 타입: string
JSON.parse(rawData) as string[];

// 타입: [string, string]
JSON.parse(rawData) as [string, string];

// 타입: ["grace", "frankie"]
JSON.parse(rawData) as ["grace", "frankie"];
```

타입 어서션은 타입스크립트 타입 시스템에만 존재하며 자바스크립트로 컴파일될 때 다른 타입 시스템 구문과 함께 제거된다. 가능한 한 타입 어서션을 사용하지 않는 것이 모범적이다.

### 9.4.1 포착된 오류 타입 어서션

오류를 처리할 때 타입 어서션이 매우 유용할 수 있다. 코드 영역이 Error 클래스의 인스턴스를 발생시킬 거라 틀림없이 확신하다면 타입 어서션을 사용해 포착된 어서션을 오류로 처리할 수 있다. 다음 스니펫은 Error 클래스의 인스턴스라고 가정된 error의 message 속성에 접근한다.

```typescript
try {
  // (오류를 발생시키는 코드)
} catch (error) {
  console.warn("Oh no!", (error as Error).message);
}
```

발생된 오류가 예상된 오류 타입인지를 확인하기 위해 instanceof 검사와 같은 타입 내로잉을 사용하는 것이 더 안전하다. 다음 스니펫은 catch 블록에 발생한 error가 Error 클래스의 인스턴스인지를 검사해 콘솔에 Error의 message를 출력할지 error 자체를 출력할지 여부를 확인한다.

```typescript
try {
  // (오류를 발생시키는 코드)
} catch (error) {
  console.warn("Oh no!", error instanceof Error ? error.message : error);
}
```

### 9.4.2 non-null 어서션

타입 어서션이 유용한 경우를 하나 더 살펴보자면, 실제로는 아니고 이론적으로만 null 또는 undefined를 포함할 수 있는 변수에서 null과 undefined를 제거할 때 타입 어서션을 주로 사용한다. null과 undefined를 제외한 값의 전체 타입을 작성하는 대신 !를 사용하면 된다.

다음 seasonCounts는 일반적은 Map<string, number>이다. seasonCounts는 "I love Lucky" 키를 포함하고 있으므로 knownValue 변수는 !를 사용해 해탕 타입에서 | undefined를 제거할 수 있다.

```typescript
const seasonCounts = new Map([
  ["I Love Lucky", 6],
  ["The Golden Girls", 7];
])

// 타입: string | undefined
const maybeValue = seasonCounts.get("I Love Lucky");

console.log(maybeValue.toUpperCase());
// Error: Object is possibly 'undefined'

// 타입: string
const knownValue = seasonCounts.get("I Love Lucky")!;

console.log(knownValue,toUpperCase()); // Ok
```

### 9.4.3 타입 어서션 주의 사항

any 타입과 마찬가지로 타입 어서션은 타입스크립트의 타입 시스템에 필요한 하나의 도피 수단이다. 따라서 any 타입을 사용할 때처럼 꼭 필요한 경우가 아니라면 가능한 한 사용하지 말아야 한다. 타입 어서션을 자주 사용하면 안 되고, 사용하는 것이 안전하다고 확실히 확신할 때만 사용해야 한다.

#### 어서션 vs. 선언

변수 타입을 선언하기 위해 타입 애너테이션을 사용하는 것과 초깃값으로 변수 타입을 변경한기 위해 타입 어서션을 사용하는 것 사이에는 차이가 있다. 변수의 타입 애너테이션과 초깃깃값이 모두 있을 때, 타입스크립트의 타입 검사기는 변수의 타입 애너테이션에 대한 변수의 초깃값에 대해 할당 가능성 검사를 수행한다. 그러나 타입 어서션은 타입스크립트에 타입 검사 중 일부를 건너뛰도록 명시적으로 지시한다.

따라서 타입 애너테이션을 사용하거나 타입스크립트가 초깃값에서 변수의 타입을 유추하도록 하는 것이 매우 바람직하다.

#### 어서션 할당 가능성

타입 어서션은 일부 값의 타입이 약간 잘못된 상황에서 필요한 작은 도피 수단일 뿐이다. 타입스크립트는 타입 중 하나가 다른 타입에 할당 가능한 경우에만 두 타입 간의 타입 어서션을 허용한다. 완전히 서로 관련이 없는 두 타입 사이에 타입 어서션이 있는 경우에는 타입스크립트가 타입 오류를 감지하고 알려준다.

하나의 타입에서 값을 완전히 관련 없는 타입으로 전환해야 하는 경우 이중 타입 어서션을 사용한다. 먼저 값을 any나 unknown 같은 top 타입으로 전환한 다음, 그 결과를 관련 없는 타입으로 전환한다.

```typescript
let myValueDouble = "1337" as unknown as number; // 허용되지만 이렇게 사용하면 안 됨
```

as unknown as... 이중 타입 어서션은 위험하고 거의 항상 코드의 타입이 잘못되었다는 징후를 나타낸다.

## 9.5 const 어서션

const 어서션은 배열, 원시 타입, 값, 별칭 등 모든 값을 상수로 취급해야 함을 나타내는 데 사용한다. 특히 as const는 수신하는 모든 타입에 다음 세 가지 규칙을 적용한다.

- 배열은 가변 배열이 아니라 읽기 전용 튜플로 취급된다.
- 리터럴은 일반적인 원시 타입과 동등하지 않고 리터럴로 취급된다.
- 객체의 속성은 읽기 전용으로 간주된다.

### 9.5.1 리터럴에서 원시 타입으로

타입 시스템이 리터럴 값을 일반적인 원시 타입으로 확장하기보다 특정 리터럴로 이해하는 것이 유용할 수 있다.
여기에서 getNameConst의 반환 타입은 일반적인 string 대신 "Maria Bamford"라는 더 구체적인 값이다.

```typescript
// 타입: () => string
const getName = () => "Maria Bamford";

// 타입: () => "Maria Bamford"
const getNameConst = () => "Maria Bamford" as const;
```

### 9.5.2 읽기 전용 객체

변수의 초깃값으로 사용되는 것과 같은 객체 리터럴은 let 변수의 초깃값이 확장되는 것과 동일한 방식으로 속성 타입을 확장한다.
그러나 as const를 사용해 값 리터럴을 어서션하면 우추된 타입이 가능한 한 구체적으로 전환된다. 모든 멤버 속성은 readonly가 되고, 리터럴은 일반적인 원시 타입 대신 고유한 리터럴 타입으로 간주되며, 배열은 읽기 전용 튜플이 된다.


