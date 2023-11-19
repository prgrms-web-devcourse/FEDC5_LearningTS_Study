### 5.1 함수 매개변수

- 타입 애너테이션으로 함수 매개변수의 타입을 선언할 수 있음

### 5.1.1 필수 매개변수

- 함수에 필수 매개변수를 제공하도록 강제하면 예상되는 모든 인숫값을 함수 내에 존재하도록 만들어 타입 안정성을 강화하는 데 도움이 됨

```typescript
function singTwo(first: string, second: string) {
  console.log(`${fisrt} / ${second}`);
}

singTwo("I will Survive", "Higher Love"); // Ok

singTwo("Ball and Chain"); // Error: 필수 매개변수 2개여야 함 -> 입력 매개변수 1개

singTwo("Go Your Own Way", "The Chain", "Dreams"); // Error: 필수 매개변수 2개여야 함 -> 입력 매개변수 3개
```

### 5.1.2 선택적 매개변수

- 함수 매개변수를 제공할 필요가 없거나, undefined 값을 전달해야할 때 타입 애너테이션 : 앞에 ? 추가

  ⇒ : undefined 인 매개변수는 필수 매개변수이므로 다른 경우임

> - 선택적 매개변수는 마지막 매개변수여야 함

```typescript
function announceSong(song: string, singer?: string) {
  console.log(`Song: ${song}`);

  if (singer) {
    console.log(`Singer: ${singer}`);
  }
}

announceSong("Greensleeves"); // Ok

announceSong("Greensleeves", undefined); // Ok

announceSong("Chandelier", "Sia"); // Ok
```

### 5.1.3 기본 매개변수

- 선택적 매개변수를 선언할 때 값이 포함된 기본값을 제공할 수 있음

```typescript
function rateSong(song: string, rating = 0) {
  console.log(`${song} gets ${rating}/5 stars!`);
}

rateSong("Photograph"); // Ok
rateSong("Set Fire to the Rain", 5); // Ok
rateSong("Set Fire to the Rain", undefined); // Ok

rateSong("At Last!", "100"); // Error
```

### 5.1.4 나머지 매개변수

- ... 스프레드 연산자는 함수 선언의 마지막 매개변수에 위치하고, 해당 매개변수에서 시작해 함수에 전달된 나머지 인수가 모두 단일 배열에 저장되어야 함을 나타냄

- 인수 배열을 나타내기 위해 끝에 [] 구문이 추가됨

```typescript
function singAllTheSongs(singer: string, ...song: string[]) {
  for (const song of songs) {
    console.log(`${song}, by ${singer}`);
  }
}

singAllTheSongs("Alicia Keys"); // Ok
singAllTheSongs("Lady Gaga", "Bad Romance", "Just Dance", "Pocker Face"); // Ok

singAllTheSongs("Ella Fitzgerald", 2000); // Error: 타입 에러
```

### 5.2 반환 타입

```typescript
// 타입: (song: string[]) => number
function singSongs(song: string[]) {
  for (const song of songs) {
    console.log(`${song}`);
  }

  return songs.length;
}
```

```typescript
// 타입: (song: string[], index: number) => string | undefined
function getSongAt(song: string[], index: number) {
  return index < songs.length ? songs[index] : undefined;
}
```

### 5.2.1 명시적 반환 타입

- 함수에서 반환 타입을 명시적으로 선언하는 방식이 매우 유용한 경우

  ① 가능한 반환값이 많은 함수가 항상 동일한 타입의 값을 반환하도록 강제할 때

  ② 타입스크립트는 재귀 함수의 반환 타입을 통해 타입을 유추하는 것을 거부함

  ③ 수백 개 이상의 타입스크립트 파일이 있는 매우 큰 프로젝트에서 타입스크립트 타입 검사 속도를 높일 수 있음

```typescript
function singSongsRecursive = (songs: string[], count=0): number {
	return songs.length ? singSongsRecursive(songs.slice(1), count + 1) : count;
}
```

```typescript
const singSongsRecursive = (songs: string[], count = 0); number =>
	songs.length ? singSongsRecursive(songs.slice(1), count + 1) : count;
```

### 5.3 함수 타입

- 화살표 함수와 유사하지만 함수 본문 대신 타입이 있음

- 콜백 매개변수(함수로 호출되는 매개변수)를 설명하는 데 자주 사용 됨

```typescript
let nothingInGivesString: () => string;
```

```typescript
let inputAndOutput: (songs: string[], count?: number) => number;
```

```typescript
const songs = ["Juice", "Shake It Off", "What's Up"];

function runOnSongs(getSongAt: (index: number) => string) {
	for (let i = 0; i < songs.length; i += 1) {
    	console.log(getSongAt(i);
    }
}

function getSongAt(index: numver) {
	return `${songs[index]}`
}

runOnSongs(getSongAt); // Ok

function logSong(song: string) {
	return `${song}`
}

runOnSongs(logSong); // Error: logSong은 매개변수가 number가 아닌 string이라 오류 발생
```

### 5.3.1 함수 타입 괄호

- 유니언 타입의 애너테이션에서 함수 반환 위치를 나탕내거나 유니언 타입을 감싸는 부분을 표시할 때 괄호를 사용함

```typescript
let returnsStringOrUndefined: () => string | undefined;

let maybeReturnsString: (() => string) | undefined;
```

### 5.3.2 매개변수 타입 추론

- 타입스크립트는 선언된 타입의 위치에 제공된 함수의 매개변수 타입을 유추할 수 있음

```typescript
let singer: (song: string) => string;

singer = function (song) {
  // song: string의 타입
  return `Singing: ${song.toUpperCase()}!`;
};
```

```typescript
const songs = ["Call Me", "Jolene", "The Chain"];

// song: string
// index: number
songs.forEach((song, index) => {
  console.log(`${song} is at index ${index}`);
});
```

### 5.3.3 함수 타입 별칭

- 함수 타입 별칭을 사용하여 반복적으로 작성하는 매개변수와 반환 타입을 갖는 코드 공간을 많이 절약할 수 있음

```typescript
type StringToNumber = (input: string) => number;

let stringToNumber: StringToNumber;

stringToNumber = (input) => input.length; // Ok

stringToNumber = (input) => input.toUpperCase(); // Error : stringToNumber은 number 타입 반환
```

### 5.4 그 외 반환 타입

### 5.4.1 void 반환 타입

- return 문이 없는 함수이거나 값을 반환하지 않는 return 문을 가진 함수

- 함수에서 반환되는 모든 값을 무시함 =/= undefined

```typescript
function logSong(song: string | undefined): void {
  if (!song) {
    return;
  }

  console.log(`${song}`);

  return true; // Error 발생
}
```

```typescript
let songLogger: (song: string) => void;

songLogger = (song) => {
  console.log(`${song}`);
};

songLogger("Heart of Glass");
```

### 5.4.2 never 반환 타입

- 의도적으로 항상 오류를 발생시키거나 무한 루프를 실행하는 함수 → 함수가 절대 **반환하지 않도록** 함

```typescript
function fail(message: string): never {
  throw new Error(`Invariant failure: ${message}`);
}

function workWithUnsafeParam(param: unknown) {
  if (typeof param !== "string") {
    fail(`param should be a string, not ${typeof param}`);
  }

  param.toUpperCase();
}
```

### 5.5 함수 오버로드

- 오버로드 시그니처: 하나의 최종 구현 시그니처와 그 함수의 본문 앞에 서로 다른 버전의 함수 이름, 매개변수, 반환타입을 여러번 선언하는 것

```typescript
function createDate(timestamp: number): Date;
function createDate(month: number, day: number, year: number): Date;
function createDate(monthOrTimestamp: number, day?: number, year?: number) {
  return day === undefined || year === undefined
    ? new Date(monthOrTimestamp)
    : new Date(year, monthOrTimestamp, day);
}

createDate(554356800); // Ok
createDate(7, 27, 1987); // Ok

createDate(4, 1); // Error : 2개의 인수를 허용하는 오버로드 시그니처가 없음
```

### 5.5.1 호출 시그니처 호환성

- 구현 시그니처는 모든 오버로드 시그니처와 **호환**되어야 함

```typescript
function format(data: string): string; // Ok
function format(data: string, needle: string, haystack: string): string; // Ok

function format(getData: () => string): string; // Error

function format(data: string, needle?: string, haystack?: string) {
  return needle && haystack ? data.replace(needle, haystack) : data;
}
```
