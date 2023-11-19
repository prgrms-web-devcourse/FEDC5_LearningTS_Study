## 함수

### 5.1 함수 매개변수

```ts
function sing(song) {
  console.log(`${song}`);
}
```

해당코드에서 song 매개변수는 명시적 타입 정보가 선언되지 않으면 절대 타입을 알 수 없고 any타입으로 간주된다.

```ts
function sing(song: string) {
  console.log(`${song}`);
}
```

해당 코드처럼 song매개변수에 타입을 선언해 줄 수 있다.

#### 5.1.1 필수 매개변수

자바스크립트는 인수의 수와 상관없이 함수를 호출할 수 있지만 타입스크립트는 함수에 선언된 모든 매개변수가 필수라고 가정한다.

#### 5.1.2 선택적 매개변수

자바스크립트에서 함수 매개변수가 제공되지 않으면 `undefined`로 기본값이 설정된다. 반면에 타입스크립트는 에러가 발생한다.

만약 선택적 매개변수에 인수를 제공하지 못하는 경우 타입에러를 보고하지 않았으면 할 때 **?**를 추가해 매개변수가 선택적이라고 표시하는 방법이 있다.

```ts
function arg(first: string, second?: number) {
  console.log(`sing ${first}`);
  if (second) {
    console.log(second);
  }
}
```

해당 코드에서 second는 `number | undefined`이며 함수 호출자가 second를 위한 매개변수를 위한 인수를 제공할 필요가 없다. 다만 second가 제공된다면 number값이거나 undefined일 수 있다.

|undefined 를 포함하는 유니언 타입 매개변수와는 다르다.

|undefined를 포함하는 유니언 타입 매개변수는 반드시 명시적으로 undefined일지라도 제공되어야 한다.

모든 선택적 매개변수는 마지막 매개변수여야 한다.

#### 5.1.3 매개변수의 기본값

자바스크립트에서 선택적 매개변수를 선언할 때 값이 포함된 기본값을 제공할 수 있다. 즉, 선택적 매개변수에는 기본적으로 값이 제공되기 때문에 타입스크립트에는 암묵적으로 내부에 |undefined 유니언 타입이 추가되는 것이다

타입스크립트의 타입추론은 기본 함수 매개변수에도 유사하게 작동한다. 매개변수에 기본값이 있고 타입 애너테이션이 없는 경우 해당 기본값을 기반으로 매개변수 타입을 유추한다.

#### 5.1.4 나머지 매개변수

...스프레드 연산자는 함수 선언의 마지막 매개변수에 위치하고 나머지 인수가 단일배열에 저장되어야 함을 나타낸다.

```ts
function rest(singer: string, ...songs: string[]) {
  for (const song of songs) {
    console.log(song);
  }
}

rest(["hi", "son", "h0ber"]);
```

위의 예제에서 모든 인수는 string의 형태여야 한다.

### 5.2 반환 타입

```ts
function returnType(arr: string[], index: number) {
  return index < arr.length ? arr[index] : undefined;
}
```

해당 예제에서 returnType는 undefined | string 을 반환할것으로 유추된다. 두 가지 가능한 반환값이 각각 string과 undefined이기 때문이다.

#### 5.2.1 명시적 반환타입

변수와 마찬가지로 타입 애너테이션을 사용해 함수의 반환 타입을 명시적으로 선언하지 않는것이 좋다. 하지만 명시적 선언이 종종 유용할 때가 있다.

1. 가능한 반환값이 많은 함수가 항상 동일한 타입의 값을 반환하도록 강제
2. 타입스크립트는 재귀함수의 반환타입을 통해 타입을 유추하는 것을 거부
3. 수백 개 이상의 타입스크립트 파일이 있는 매우 큰 프로젝트에서 타입 검사 속도를 높일 수 있다.

### 5.3 함수타입

```ts
const nothingInGiveString: () => string;
```

함수 타입 구문은 화살표함수와 유사하지만 함수 본문 대신 타입이 있다.

#### 5.3.1 함수 타입 괄호

함수 타입은 다른 타입이 사용되는 모든곳에 배치할 수 있고, 유니언 타입도 포함된다

```ts
let returnStringOrUndefined: () => string | undefined;
```

#### 매개변수 타입 추론

매개변수로 사용되는 인라인 함수를 포함하여 모든 함수에 대해 매개변수의 타입을 선언해야 한다면 번거로울 것이다.
타입스크립트는 매개변수타입을 유추할 수 있다.

```ts
const names = ["son", "h0ber"];

name.forEach((name, i) => {
  console.log(`${name} is at index ${i}`);
});
```

#### 5.3.3 함수 타입 별칭

```ts
type StringToNumber = (input: string) => number;

let stringToNumber: StringToNumber;

stringToNumber = (input) => input.length;
```

와 같이 표현가능하다.

### 5.4 void , never

#### 5.4.1 void

일부 함수는 어떤 값도 반환하지 않는다.

```ts
type VoidTest = (input: string) => void;

function voidTest(input): VoidTest {
  console.log(input);
  return input; // Error
}
```

함수 타입 선언시 void반환 타입을 사용하면 반환되는 모든 값은 무시된다. 자바스크립트 함수는 실제값이 존재하지 않으면 모두 undefined를 기본적으로 반환하지만 void와 undefined는 동일하지 않다.

`forEach`는 void를 반환하는 콜백함수를 받는다. forEach내부의 콜백함수가 값을 반환하더라도 무시된다.

#### 5.4.2 never 타입

never반환함수는 항상 오류를 발생시키거나 무한루프를 실행시키는 함수이다.

never는 절대 반환하지 않는 함수를 위한 것이다.

### 5.5 함수 오버로드

일부 자바스크립트에서는 선택적 매개변수와 나머지 매개변수만으로 표현할 수 없는 다른 매개변수들로 호출될 수 있는데, 타입스크립트에선 이걸 오버로드 시그니처라고 불리는 타입스크립트 구문으로 설명한다.

구현시그니처와 함수 본문앞에 서로 다른 버전의 함수이름 , 매개변수, 반환타입을 여러 번 선언한다.

```ts
function create(timeStamp: number): Date;
function create(month: number, day: number, year: number): Date;
function create(month: number, day?: number, year: number) {
  return day === undefined || year === undefined
    ? new Date(month)
    : new Date(year, month, day);
}
create(7, 27, 1998);
create(4, 1); // Error
```

위의 오버로딩중에 두가지만 선택하는 선택지는 존재하지 않는다.

#### 5.5.1 호출 시그니처 호환성

오버로드 된 함수의 구현에서 사용되는 구현 시그니처는 매개변수의 타입과 반환 타입에 사용하는것과 동일해야 한다.
즉, 구현시그니처는 모든 오버로드 시그니처와 호환되어야 한다.
