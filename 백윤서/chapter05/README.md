# 5장 함수

## 5.1 함수 매개변수

### 선택적 매개변수

함수의 선택적 매개변수는 항상 암묵적으로 `undefined`가 될 수 있다. 선택적 매개변수는 `| undefined`를 포함하는 유니언 타입 매개변수와는 다르다. 선택적 매개변수가 아닌 매개변수는 값이 명시적으로 `undefined`이어도 명시적으로 항상 제공되어야 한다. 

또한 함수에서 사용되는 모든 선택적 매개변수는 마지막 매개변수여야 한다. 필수 매개변수 전에 선택적 매개변수를 위치시키면 타입스크립트 구문 오류가 발생한다.

## 5.2 반환 타입

### 명시적 반환 타입

함수 반환 타입을 명시적으로 선언하지 않는 것이 좋지만 함수에서 반환 타입을 명시적으로 선언하는 방식이 유용할 때가 있다.

- 가능한 반환값이 많은 함수가 항상 통일한 타입의 값을 반환하도록 강제
- 타입스크립트는 재귀 함수의 반환 타입을 통해 타입을 유추하는 것을 거부
- 매우 큰 프로젝트에서 타입스크립트 타입 검사 속도를 높일 수 있음

## 5.4 그 외 반환 타입

### `never` 반환 타입

`never` 반환 함수는 의도적으로 항상 오류를 발생시키거나 무한루프를 실행하는 함수이다. 함수가 절대 반환하지 않도록 의도하려면 명시적 `never` 타입 애너테이션을 추가해 해당 함수를 호출한 후 모든 코드가 실행되지 않음을 나타내야 한다.

```ts
function fail(msg: string): never {
  throw new Error(`failure: ${msg}`);
}

function workWithUnsafeParam(param: unknown) {
  if (typeof param !== 'string') fail('param should be a string.');

  param.toUpperCase();
}
```

## 5.5 함수 오버로드

하나의 최종 구현 시그니처와 그 함수의 본문 앞에 서로 다른 버전의 함수 이름, 매개변수, 변환 타입을 여러 번 선언하여 선택적 매개변수와 나머지 매개변수만으로 표현할 수 없는 다른 매개변수로 호출할 수 있다. 이 함수를 오버로드 시그니처라고 불린다. 

오버로드된 함수 호출에 대해 구문 오류를 생성할지 여부를 결정할 때 타입스크립트는 함수의 오버로드 시그니터만 확인한다.

```ts
function createDate(timestamp: number): Date;
function createDate(month: number, day: number, year: number): Date;
function createDate (monthOrTimestamp: number, day?: number, year?: number) {
  return day === undefined || year === undefined
    ? new Date (monthOrTimestamp)
    : new Date (year, monthOrTimestamp, day);
}

createDate(8347289745);
createDate(7, 27, 1987);

createDate(4, 1); // 2개의 인수를 허용하는 오버로드 시그니처가 없으므로 타입 오류 발생
```

### 호출 시그니처 호환성

오버로드도니 함수의 구현에서 사용되는 구현 시그니처는 매개변수 타입과 반환 타입에 사용하는 것과 동일하다. 따라서 함수의 오버로드 시그니처에 있는 반환 타입과 각 매개변수는 구현 시그니처에 있는 동일한 인덱스의 매개변수에 할당할 수 있어야 한다. 즉, 구현 시그니처는 모든 오버로드 시그니처와 호환돼야 한다.

```ts
function format(data: string): string;
function format(data: string, needle: string): string;

function format(getData: () => string): string; 

// Error: This overload signature is not compatible with tits implementation signature
```