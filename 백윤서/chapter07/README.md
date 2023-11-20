# 7장 인터페이스

## 7.1 타입 별칭 vs 인터페이스

- 인터페이스는 속성 증가를 위해 병합할 수 있다.

- 인터페이스는 클래스가 선언된 구조의 타입을 확인하는 데 사용할 수 있지만, 타입별칭은 사용할 수 없다.

- 일반적으로 인터페이스에서 타입 스크립트 타입 검사기가 더 빨리 작동한다. 인터페이스는 타입 별칭이 하는 것처럼 새로운 객체 리터럴의 동적인 복사 붙여넣기보다 내부적으로 더 쉽게 캐시할 수 있는 명명된 타입을 선언한다.

- 인터페이스는 이름 없는 객체 리터럴의 별칭이 아닌 이름 있는 (명명된) 객체로 간주되므로 어려운 특이 케이스에서 나타나는 오류 메세지를 좀 더 쉽게 읽을 수 있다.

## 7.2 속성 타입

### 숫자 인덱스 시그니처

자바스크립트가 암묵적으로 객체 속성 조회 키를 문자열로 변환하지만 객체의 키로 숫자만 허용하는 경우가 필요하다. 타입스크립트 인덱스 시그니처는 키로 string 대신 number 타입을 사용할 수 있지만, 명명된 속성은 그 타입을 포괄적인 용도의 string 인덱스 시그니처의 타입으로 할당할 수 있어야 한다.

```ts
interface MoreNarrowNumbers {
  [i: number]: string;
  [i: string]: string | undefined;
}

const mixesNumbersAndStrings: MoreNarrowNumbers = {
  0: '',
  key1: '',
  key2: undefined,
};

interface MoreNarrowStrings {
  [i: number]: string | undefined;
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Error: number 인덱스 유형 string | undefined 를 string 인덱스 유형 string에 할당할 수 없습니다.
  [i: string]: string;
}
```

`MoreNarrowNumbers` 인터페이스는 `string`을 `string | undefined` 에 할당할 수 있지만, `MoreNarrowStrings` 인터페이스는 `string | undefined`를 `string`에 할당할 수 없다.

## 7.4 인터페이스 병합

### 이름이 충돌되는 멤버

병합된 인터페이스는 타입이 다른 동일한 이름의 속성을 여러 번 선언할 수 없다. 속성이 이미 인터페이스에 선언되어 있다면 나중에 병합된 인터페이스에서도 동일한 타입을 사용해야한다.

```ts
interface MergedProperties {
  same: (input: boolean) => string;
  different: (input: string) => string;
}

interface MergedProperties {
  same: (input: boolean) => string;
  different: (input: number) => string;
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Error: 후속 속성 선언에 같은 형식이 있어야 합니다. 
  // different 속성이 (input: string) => string 형식이어야 하는데 여기에는 (input: number) => string 형식이 있습니다.
}
```

`MergedProperties` 인터페이스 선언에서는 `same` 속성이 모두 동일하기 때문에 문제가 없지만 `different` 속성은 타입이 서로 다르기 때문에 오류가 발생한다.

그러나 병합된 인터페이스는 동일한 이름과 다른 시그니처를 가진 메서드는 정의할 수 있다. 이렇게 하면 메서드에 대한 함수 오버로드가 발생한다.

```ts
interface MergedMethods {
  different(input: string): string;
}

interface MergedMethods {
  different(input: number): string;
}
```

`MergedMethods` 인터페이스는 두 가지 오버로드가 있는 `different` 메서드를 생성한다.