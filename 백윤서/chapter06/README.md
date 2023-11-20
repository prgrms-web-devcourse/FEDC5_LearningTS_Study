# 6장 배열

## 6.2 배열 멤버

### 주의 사항: 불안정한 멤버

타입스크립트는 모든 배열의 멤버에 대한 접근이 해당 배열의 멤버를 반환한다고 가정하지만, 자바스크립트에서조차도 배열의 길이보다 큰 인덱스로 배열 요소에 접근하면 `undefined`를 제공한다.

```ts
const arr: string[] = ['a'];

arr[99999]; // 타입 오류 없음
```

타입스크립트는 검색된 배열의 멤버가 존재하는지 의도적으로 확인하지 않는다.

## 6.3 스프레드와 나머지 매개변수

### 스프레드

서로 다른 타입의 두 배열을 함께 스프레드해 새 배열을 생성하면 새 배열은 두 개의 원래 타입 중 어느 하나의 요소인 유니언 타입 배열로 이해된다.

### 나머지 매개변수 스프레드

나머지 매개변수를 위한 인수로 사용되는 배열은 나머지 매개변수와 동일한 배열 타입을 가져야 한다.

## 6.4 튜플

### 튜플 할당 가능성

가변 길이의 배열 타입은 튜플 타입에 할당할 수 없다.

타입스크립트는 튜플 타입의 튜플에 얼마나 많은 멤버가 있는지 알고 있기 때문에 길이가 다른 튜플은 서로 할당할 수 없다.

튜플로 나머지 매개변수의 타입을 명시한다면 타입의 잘못된 순서로 인한 내용의 불일치 가능성을 줄이고 타입의 안전을 보장할 수 있다.

### 튜플 추론

타입스크립트에서는 값이 일반적인 배열 타입 대신 좀 더 구체적인 튜플 타입이어야 함을 두 가지 방법으로 나타낼 수 있다.

- 명시적 튜플 타입

```ts
// 반환 타입: [string, number]
function firstCharAndSizeExplicit(input: string): [string, number] {
  return [input[0], input.length];
}

// firstChar 타입: string
// size 타입: number
const [firstChar, size] = firstCharAndSizeExplicit('Cathay Williams');
```

- `const` 어서션(assertion)

타입스크립트는 코드 변경에 따라 작성 및 수정이 필요한 구문을 추가해야 하는데 이 대안으로 값 뒤에 넣을 수 있는 `const` 어서션인 `as const` 연산자를 제공한다. `const` 어서션은 타입스크립트에 타입을 유추할 때 읽기 전용이 가능한 값 형식을 사용하도록 지시한다.

```ts
// 타입: (string | number)[]
const unionArray = [1157, 'Tomoe'];

// 타입: readonly [1157, 'Tomoe]
const readonlyTuple = [1157, 'Tomoe'] as const; // 배열이 튜플로 처리되어야 함을 나타냄
```

`const` 어서션은 유연한 크기의 배열을 고정된 크기의 튜플로 전환하는 것 뿐만 아니라 해당 튜플이 읽기 전용이고 값 수정이 예상되는 곳에서 사용할 수 없음을 나타낸다.(할당 불가능)

읽기 전용 튜플은 함수 반환에 편리하다. 

```ts
function firstCharAndSizeAsConst(input: string) {
  return [input[0], input.length] as const;
}

// firstChar 타입: string
// size 타입: number
const [firstChar, size] = firstCharAndSizeAsConst('Ching Shih');
```