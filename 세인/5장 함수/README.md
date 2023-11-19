# 5장 함수

## 5.1 함수 매개변수

### 5.1.1 필수 매개변수

- 자바스크립트
  - 함수 호출 시 인수의 수와 상관없이 함수를 호출할 수 있음
- 타입스크립트
  - 함수에 필수 매개변수를 강제함
  - 함수 호출 시 예상되는 모든 인수값을 함수 내에 존재하도록 만들어 타입 안정성을 강화함

### 5.1.2 선택적 매개변수

- **구현 방법**
  - 타입 애너테이션의 `:` 앞에 `?` 추가하여 매개변수가 선택적임을 표시
  - 선택적 매개변수의 경우 `| undefined`가 유니언 타입으로 추가되어 있음
  - 항상 암묵적으로 `undefined`가 될 수 있음
  - Ex) `function announceSong(song: string, singer?: string) { }`
- **명시적 작성**
  - 매개변수가 undefined여도 명시적으로 작성해야함
  - Ex) `function announceSong(song: string, singer: string | undefined) { }`
- 선택적 매개변수는 항상 필수 매개변수 뒤에 위치시켜야함

### 5.1.3 기본 매개변수

- 선택적 매개변수를 선언할 때 기본값 설정 가능
- 기본값이 있고 타입 애너테이션이 없는 경우, 타입스크립트는 해당 기본값을 기본으로 매개변수 타입을 유추함

```jsx
function rateSong(song: string, rating = 0) {}
```

**타입 유추**

- rating은 number 타입으로 유추되지만, 함수를 호출하는 코드에서는 선택적 `number | undefined`가 될 수 있음

### 5.1.4 나머지 매개변수

**사용방법**

- 스프레드 연산자는 함수 선언의 마지막 매개변수에 위치하고, 해당 매개변수에서 시작해 함수에 전달된 나머지(rest)인수가 모두 단일 배열에 저장되어야 함
- 나머지 매개변수의 타입을 일반 매개변수와 유사하게 선언할 수 있음
- 인수 배열을 나타내기 위해 끝에 [] 구문 추가

```jsx
function singAllTheSongs(singer: string, ...songs: string[]) {
  for (const song of songs) {
    console.log("${song}, by ${singer}");
  }
}

singAllTheSongs("Alicia Keys"); // OK
singAllTheSongs("Alicia Keys", "B", "C"); // OK
singAllTheSongs("Alicia Keys", 2000); // Error!
// 'number' 형식의 인수는 'string' 형식의 매개 변수에 할당될 수 없습니다.
```

## 5.2 반환 타입

반환문을 통해 반환 타입을 유추할 수 있음

```jsx
function count(arr: string[], index: number) {
  return index < arr.length ? arr[index] : undefined;
}
// -> 반환 타입 string | undefined
```

### 5.2.1 명시적 반환 타입

`function count(arr: string[], index: number): string`

- 강제적인 반환 타입 지정
- 재귀 함수의 반환 타입 유추 방지
- 타입 검사 속도 향상

## 5.3 함수 타입

`let getArr: () ⇒ string;`

`let inputAndOutput: (songs: string[], count?: number) ⇒ number;`

- 콜백 매개변수를 설명하는데 자주 사용

```jsx
const songs = ["A", "B", "C"];

function runOnSongs(getSongAt: (index: number) => string) {
  for (let i = 0; i < songs.length; i++) {
    console.log(getSongAt(i));
  }
}
function getSongAt(index: number) {
  return `${songs[index]}`;
}
runOnSongs(getSongAt); // OK

function logSong(song: string) {
  return `${song}`;
}
runOnSongs(logSong); // Error!
// 'song' 및 'index' 매개 변수의 형식이 호환되지 않습니다.
// 'number' 형식은 'string' 형식에 할당할 수 없습니다.
```

### 5.3.1 함수 타입 괄호

```jsx
// 타입은 string | undefined 유니언을 반환하는 함수
let returnsStringOrUndefined: () => string | undefined;
// 타입은 undefined나 string을 반환하는 함수
let maybeReturnsString: (() => string) | undefined;
```

### 5.3.3 함수 타입 별칭

- string 타입을 받고 number 타입을 반환하는 함수의 별칭 지정

```jsx
type StringToNumber = (input: string) => number;

let stringToNumber: StringToNumber;
```

- 매개변수도 함수 타입을 참조하는 별칭

```jsx
type NumberToString = (input: number) => string;

function userNumberToString(numberToString: NumberToString) {
  // ...
}
```

→ 타입 별칭을 이용하여 반복적으로 작성하는 매개변수와 반환 타입을 갖는 코드 공간 절약 가능

## 5.4 그 외 반환 타입

### 5.4.1 void 반환 타입

- `return`문이 없는 함수
- 반환하지 않는 `return`문 가진 경우

```jsx
function logSong(song: string | undefined): void {
  if (!song) {
    return; // OK!
  }

  console.log(`${song}`);

  return true; // Error! 'boolean' 형식은 'void' 형식에 할당할 수 없습니다.
}
```

→ void를 사용하면 함수에서 반환되는 모든 값은 무시된다.

```tsx
function returnsVoid() {
  return;
}

let lazyValue: string | undefined;

lazyValue = returnsVoid;
// Error! '() => void' 형식은 'string' 형식에 할당할 수 없습니다.ts(2322)
```

**undefined vs void**

- `undefined`: 반환되는 리터럴 값으로 사용
- `void`: 함수가 아무 것도 반환하지 않음을 나타내는 타입으로 사용

<aside>
💡 **`void`**를 사용하면 함수에서 반환되는 모든 값은 무시되며, **`undefined`**는 반환되는 리터럴 값으로 사용

</aside>

### 5.4.2 never 반환 타입

**`never`** 반환 타입은 함수가 항상 오류를 발생시키거나 무한 루프를 실행하여 결코 정상적으로 종료되지 않을 때 사용

```jsx
function fail(message: string): never {
  throw new Error("Invariant failure: ${message}.");
}

function workWithUnsafeParam(param: unknown) {
  if (typeof param !== "string") {
    fail("param should be a string, not ${typeof param}");
  }
  // param의 타입은 string으로 좁혀서 타입스크립트의 제어 흐름 분석을 도와준다.
  param.toUpperCase(); // OK
}
```

<aside>
💡 **never vs void**
-`void` : 아무것도 반환하지 않는 함수를 위한 것이며, 일반적으로 정상적으로 종료될 수 있는 함수에 - 사용
- `never`: 절대 반환하지 않는 상황을 나타내며, 주로 오류 처리나 예상치 못한 상태에 사용

</aside>

## 5.5 함수 오버로드

**오버로드 시그니처**

```jsx
// 선언부
function createDate(tiemstamp: number): Date;
function createDate(month: number, day: number, year: number): Date;
//구현부
function createDate(monthOrTimestamp: number, day?: number, year?: number) {
	return day === undefined || year === undefined
		? new Date(monthOrTimestamp)
		: new Date(year, monthOrTimestamp, day);
}

createDate(554356800);  // OK
createDate(7, 27, 1987);  // OK
createDatae(4, 1); // Error
```

함수 호출에 대해 구문 오류 여부는 구현부에서 확인

<aside>
💡 함수 오버로드는 복잡하고 설명하기 어려운 함수 타입에 사용하는 최후 수단이다. 
함수를 단순하게 유지하고 가능하면 사용하지 않는 것이 좋다.

</aside>
