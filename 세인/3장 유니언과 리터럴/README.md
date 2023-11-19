# 3장 유니언과 리터럴

- 유니언(union): 값에 허용된 타입을 두 개 이상의 가능한 타입으로 확장하는 것
- 내로잉(narrowing): 값에 허용된 타입이 하나 이상의 가능한 타입이 되지 않도록 좁히는 것

## 3.1 유니언 타입

값이 정확히 어떤 타입인지 모르지만 두 개 이상의 옵션 중 하나라는 것

![유니언 타입 이미지](image.png)

### 3.1.1 유니언 타입 선언

변수의 초기값이 있더라도 변수에 대한 명시적 타입 애너테이션을 제공하는 것이 유용할 때 유니언 타입을 사용

```ts
let thinker: string | null = null;

if (Math.random() > 0.5) {
  thinker = "Susanne Langer";
}
```

## 3.2 내로잉

- 더 구체적인 타입임을 코드에서 유추하는 것
- 타입 가드: 타입을 좁히는 데 사용할 수 있는 논리적 검사

### 3.2.1 값 할당을 통한 내로잉

```ts
let inventor: number | string = "SEIN";

inventor.toUpperCase(); // OK
inventor.toFixed(); // Error
```

-> number | string 타입으로 선언되었지만 초기값으로 문자열이 할당되었기 때문에 타입스크립트는 즉시 string 타입으로 좁혀졌다.

### 3.2.2 조건 검사를 통한 내로잉

### 3.2.3 typeof 검사를 통한 내로잉

## 3.3 리터럴 타입

- 더 구체적인 버전의 원시타입

  - ```ts
    const user = "sein";
    ```

    user의 타입은 string 타입 + 더 구체적으로 'sein'타입

> string은 존재할 수 있는 모든 가능한 문자열의 집합을 나타내지만, 리터럴 타입인 ‘sein’은 하나의 문자열만 나타낸다.

- 유니언 타입 애너테이션에서는 리터럴과 원시 타입 섞어서 사용 가능

  - ```ts
    let lifespan: number | "ongoing" | "uncertain";
    ```

## 3.4 엄격한 null 검사

### 3.4.3 초기값이 없는 변수

값이 할당되기 전까지 변수는 undefined이다. 값이 할당되기 전 속성에 접근하면 오류가 발생하지만, `| undefined`를 추가혐 오류가 발생하지 않는다.

## 3.5 타입 별칭

```ts
type 새로운 이름 = 타입
// 타입 별칭: 파스칼 케이스
type MyName = ...;
```

### 3.5.2 타입 별칭 결합

```ts
type Id = number | string;
// = number | string | undefined | null
type IdMaybe = Id | undefined | null;
```
