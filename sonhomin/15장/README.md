## 타입운영

타입스크립트는 타입시스템에서 타입을 정의할 수 있는 기능을 제공한다.

다른 타입을 기준으로 타입을 혼합, 일치, 수정할 수 있다.

### 매핑된 타입

타입스크립트는 다른 타입의 속성을 기반으로 새로운 타입을 생성하는 구문을 제공한다.
즉, 하나의 타입에서 다른 타입으로 매핑하는 것을 말한다.

타입스크립트의 매핑된 타입은 다른 타입을 가져와서 해당 타입의 각 속성에 대해 일부 작업을 수행하는 것을 수행하는 타입

```ts
type NewType = {
  [K in OriginalTyle]: NewProperty;
};
```

매핑된 타입에 대한 일반적인 사용사례는 유니언 타입에 존재하는 각 문자열 리터럴 키를 가진 객체를 생성하는 것이다.

아래 예시

```ts
type Animals = 'cat' | 'dog' | 'baboon';

type AnimalCounts = {
  [K in Animals]: number;
};
```

존재하는 유니언 리터럴을 기반으로 하는 매핑된 타입은 큰 인터페이스를 선언하는 공간을 절약하는 편리한 방법이다.

매핑된 타입은 다른 타입에 대해 작동하고 멤버에서 제한자를 추가하거나 제거할 수 있을 때 유용해진다

#### 타입에서 매핑된 타입

일반적으로 매핑된 타입은 존재하는 타입의 `keyof`연산자를 사용해 키를 가져오는 방식으로 작동

```ts
//nullable

interface BirdVariants {
  dove: string;
  eagle: boolean;
}

type Nullable = {
  [K in keyof BirdVariants]: BirdVariants | null;
};
```

#### 제한자 변경

매핑된 타입은 원래 타입의 멤버에 대한 접근제어 제한자인 `readonly` 와 `?`도 변경가능합니다.

```ts
interface Environmentalist {
  area: string;
  name: string;
}

type ReadonlyEnvironmentalist = {
  readonly [K in keyof Environmentalist]: Environmentalist[K];
};

type OptionalEnvironmentalist = {
  [K in Environmentalist]?: Environmentalist[K];
};

type RemoveReadonlyEnvironmentalist = {
  -readonly [K in ReadonlyEnvironmentalist]: ReadonlyEnvironmentalist[K];
};
```

#### 제네릭 매핑된 타입

매핑된 타입은 제네릭과 결합해 사용할 때 가장 효율적으로 사용가능하다.

```ts
type MakeReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

interface Species : {
    genus : string;
    name : string
}

type ReadonlySpecies = MakeReadonly<Species>
```

#### 유틸리티 타입

매핑된 타입과 제네릭을 활용해 다양한 유틸리티 타입을 제공한다

[유틸리티타입](https://inpa.tistory.com/entry/TS-%F0%9F%93%98-%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%9C%A0%ED%8B%B8%EB%A6%AC%ED%8B%B0-%ED%83%80%EC%9E%85-%F0%9F%92%AF-%EC%B4%9D%EC%A0%95%EB%A6%AC)

### 조건부타입

조건부 타입의 개념은 기존 타입을 바탕으로 두 가지 가능한 타입중 하나로 확인되는 타입

`LeftType extends RightType ? IfTrue : IfFalse`

삼한연산자 조건문 처럼보이는데 논리적검사는 항상 extends의 왼쪽 타입이 오른쪽 타입이 되는지 에 대한 여부에 따라 다르다

#### 제네릭 조건부 타입

```ts
type CallableSetting<T> = T extends () => any ? T : () => T;

// T가 함수라면 그대로 반환 , T가 string이라면 () => string 반환
```

#### 타입분산

조건부 타입은 유니언에 분산된다.

`ConditionalType<T|U>`는 `ConditionalType<T>|ConditionalType<U>`와 같은 타입이다.

#### 유추된 타입

```ts
type ArrayItem<T> = T extends (infer Item)[] ? Item : T;

// 입력받은 타입이 배열이라면 배열요소를 제거하고 반환
// 배열타입이 아니라면 그대로 반환
```

#### 매핑된 조건부 타입

```TS
type MakeAllMembersFunctions<T> = {
    [K in keyof T] : T[K] extends (...args : any[]) => any
    ? T[K]
    : ()=>T[K]
}

```

### never

#### never와 교차, 유니언타입

bottom타입은 never는 존재할 수 없는 타입이라는 의미를 가지고 있다.

- 교차타입에 있는 never는 교차 타입을 never로 만든다
- 유니언 타입에 있는 never는 무시된다.

#### never와 조건부타입

제네릭 조건부 타입은 일반적으로 유니언 타입을 필터링하기 위해 never를 사용한다

never는 유니언에서 무시되기 때문에 never가 아닌 것이 된다

```ts
type OnlyString<T> = T extends string ? T : never;
type RedOrBlue = OnlyString<'red' | 'blue' | 0 | false>;
```

#### never와 매핑된 타입

유니언에서 never의 동작은 매핑된 타입에서 멤버를 필터링할 떄도 유용하다.

- 유니언에서 never는 무시된다
- 매핑된 타입은 타입의 멤버를 매핑할 수 있다
- 조건부 타입은 조건이 충족되는 경우 타입을 never로 변환하는데 사용할 수 있다.

#### 템플릿 리터럴 타입

문자열 값을 입력하기 위해 두가지 전략을 제시

- 원시 string타입
- ""와 "abc"같은 리터럴 타입

경우에 따라 일부 문자열 패턴과 일치함을 나타내고 싶을 때 템플릿 리터럴 타입을 입력해서 사용할 수 있다

type Greeting = `hello${string}` 과 같이 시작하면 hello로 시작하는 이름을 일치하다.

```ts
type ExtolNumber = `much ${number} wow`

function extol(extolee : ExtolNumber) {...}

extol('much 0 wow') // ok
extol ('much false wow')// error
```

#### 매핑된 타입 키 다시 매핑하기

```ts
interface DataEntry<T> {
  key: T;
  value: string;
}

type DataKey = 'location' | 'name' | 'year';

type DataEntryGetters = {
  [K in DataKeys as `get${Capitalize<K>}`]: () => DataEntry<K>;
};
```

`symbol & string` 은 never가 되므로 템플릿 리터럴 타입에서 사용할 수 없는 symbol을 걸러낼 수 있다.

### 타입운영과 복잡성

타입운영을 사용해야 하는 경우에는 이후에 코드를 읽어야 하는 모든 개발자를 위해 가능한 최소한으로 사용하도록 노력해야한다.

코드는 최대한 읽기 쉬운 이름으로 사용하고 미래에 코드를 읽을 때 어려움을 겪을 수 있다고 생각되는 부분에 주석을 남겨줘야한다.
