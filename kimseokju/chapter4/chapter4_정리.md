# 객체

## 객체에서의 타입 선언

아래처럼 선언하고 사용할 수 있는데 몇 가지 에러 조건이 존재한다.

```typescript
let info: {
  name: string;
  age: number;
};

info = {
  name: "Kim",
  // age: false, // 에러, 타입이 다름
  age: 25,
  // email: 123@abc.com // 에러, 이메일은 사전에 선언되어 있지 않다.
};

// 이렇게 타입 형태로도 선언해서 사용 가능
type Info = {
  name: string;
  age: number;
};

let myInfo: Info = {
  name: "Kim",
  age: 25,
};
```

## 구조적 타이핑

타입을 충족해야 해당 객체를 사용할 수 있다.<br />
~~아래코드 에러나는데 왜 책은 OK일까..? 음... 좀 찾아봤는데 내 지식으로는 해결이 안된다.~~ 오타였다.

```typescript
type WithFirstName = {
  firstName: string;
};

type WithLastName = {
  lastName: string;
};

const hasBoth = {
  firstName: "Stephen",
  lastName: "Curry",
};

let withFirstName: WithFirstName = hasBoth; // 에러 남
let withLastName: WithLastName = hasBoth;
```

## 초과 속성 검사

아래 코드에서 신기한 현상이 있는데, `extraProperty`는 `Poet`에 없는 `activity`가 초과속성이라 에러가 발생한다. 하지만 `extraPropertyButOk`는 초기 값이 Poet과 일치하여 에러가 나지 않는다.<br />
즉, 초과 속성 검사는 선언된 위치에서 생성되는 객체에서만 일어나지 기존 객체를 제공한다면 이 과정을 우회하여 에러를 발생시키지 않는다.

```typescript
type Poet = {
  born: number;
  name: string;
};

const poetMatch: Poet = {
  born: 1928,
  name: "Maya Angelou",
};

const extraProperty: Poet = {
  activity: "walking", // 에러
  born: 1928,
  name: "Maya Angelou",
};

const existingObject = {
  activity: "walking",
  born: 1928,
  name: "Maya Angelou",
};

const extraPropertyButOk: Poet = existingObject;
```

### 중첩

아래와 같이 타입을 중첩해서 사용하는 것도 가능하다.

```typescript
type Author = {
  firstName: string;
  lastName: string;
};

type Poem = {
  author: Author;
  name: string;
};

const poemMisMatch: Poem = {
  author: {
    firstName: "Sylvia",
    lastName: "Plath",
    // name: "Sylvia Plath" // 없는 값이므로 에러
  },
  name: "Tulips",
};
```

### 선택적 속성

`lastName?: string;` 코드처럼 `?` 키워드를 붙이면 있어도 되고 없어도 된다는 뜻이다.

```typescript
type Author = {
  firstName: string;
  lastName?: string;
};

type Poem = {
  author: Author;
  name: string;
};

const poemMisMatch: Poem = {
  author: {
    firstName: "Sylvia",
  },
  name: "Tulips",
};
```

## 객체 타입 유니언과 교차타입

객체 타입 역시 앞서 배운 유니언, 내로잉 개념이 적용된다. 추가적으로 교차타입이라는 개념이 있는데 `&` 키워드로 사용한다. 유용한 개념임은 맞지만 코드를 간결하게 유지하지 않으면 읽기 어려워진다는 문제가 있기에 잘 사용해야한다.

```typescript
type Art = {
  genre: string;
  name: string;
};

type Write = {
  pages: number;
  name: string;
};

type WriteArt = Art & Write;
// WriteArt는 아래와 같다.
// {
//     genre: string;
//     pages: number;
//     name: string;
// }
```

[실습 코드 링크 주소](https://www.typescriptlang.org/ko/play?#code/PTAEHUFMBsGMHsC2lQBd5oBYoCoE8AHSAZVgCcBLA1UABWgEM8BzM+AVwDsATAGiwoBnUENANQAd0gAjQRVSQAUCEmYKsTKGYUAbpGF4OY0BoadYKdJMoL+gzAzIoz3UNEiPOofEVKVqAHSKymAAmkYI7NCuqGqcANag8ABmIjQUXrFOKBJMggBcISGgoAC0oACCbvCwDKgU8JkY7p7ehCTkVDQS2E6gnPCxGcwmZqDSTgzxxWWVoASMFmgYkAAeRJTInN3ymj4d-jSCeNsMq-wuoPaOltigAKoASgAywhK7SbGQZIIz5VWCFzSeCrZagNYbChbHaxUDcCjJZLfSDbExIAgUdxkUBIursJzCFJtXydajBFQITiCGjJCg-VAAOQYyFAAF5QAAiADiDTI2ngHIA3MVKdT+syYCjmLD2bT6UzkAF3JxpZhhRTGoJ4O4lfBmAAKTgS5WqgCUwpFmpojnqYvZHIq7GY7Gp4mIDB0DGYkCFlqp2sguoNAG8bUJUABfc3ksDuGl06kKyD5NmcrmQGjPdiweJ4DnFOWJiVKqWxfWmmNuDNV7p1C0qONuBhFln2gDSUN9DebjIlqY5ACl2ELQCpAKgTgEGByuMFsodmoMjsSCC0dgQALo4Ab9un1YAVux1MnqZQVfWwHuD-34GQzN6u2f9xYAuh7gQNgBhZuQcun0DnpbsgBGAAmABmACQKA4o-0DdBaCcWAhAaTh9QAisoIfGD4Bfd9P2-bd43pUAUyPYZU2AkCf0ba9X2+fsAA0GJwABRBkcAqN8AEkAHkGTvUBqI2EsVVhFRAA5uwAcCdAQAx0cAF3HQEATebAETx4oBO+AICBdTB9QAcgAQm001VyuBdSMAAYXAFDxtdABxBhTFLkwAI3sAABrAFKmwANVcAAe7AB0O0BN1AQAdFcABjr8JMXpU2DGYShxBNe2QFMOQ7RAOV4CKShnGLk05YhIHgeIhyS4oIx-DQ1MQChuG4dwkxXFRABdVwBPptAQAShcc6TAB5xryfI3UBABzZwBSDsrHBmg8MgvEQK9nGBdgaC+JsVXYL1IH4WBoHURIGGBPQRC8DkmNWZkFn0DkkmxDlwAcVBtOEBlIAkDkghULivjId5BEWrRq1dMgFFcaQ8H4yAxp0UivletFEGhYRLhmiQr2iEQDA4bEFiYVgOB4IISmCxA8AACSQDLOHYRBpFogAfYzjxGdkAFk6kwAJrx4JBy1AAA+UAAAYAgAVlAAB+UAAI5ojMvYGHOF9YoEX1VB2iJbG8dbVl7RIlUOVNcKVEi0AFfxp8sJosgP1e8sCpgV7NbAbXdcVdAADEKFWSBuFNlQI0rUUaSmWj7S5LiABFJeKBtqzgRJ7XADjeOCsO4vACheNAcnCeJ751VjHMyNA9O3Ez+1rr0bF-cgXFUElkOaEQOmq-qWpOGIkyVST0AuG4EuMmdnOa8wGv1DMPmhNVStu97uv+1pshEi5bVuBJvl8xUEe6j7zhB9iYLC1Qf26gYFNgQDMZk6Jufm9VkYj+gaBm9b9vOGd4pG1eyluG31Bd-GeAD68I-U+xcmz+boTS+18eC33vhXAQZAX47z3p-Fo39+jHzJhTUiF8r7kxvrSO+3BKyyyIHCHe+xUz73gYApBf8UFNzQSAtuWD74P2rJvV+79uCEPaAwo4kBn7MJTKwt++wOGQOgW-XhbCiC4PaGIaQsBUwALQTnPBKAS5UykTIn+J9-6N2YMET28x4DVnZOFbWwIRopgAgATnMdzZK2sjSxU5AOCUgh8yFWCAQfRqAADa2kTGcG0gAXUUO4jMAQ7FKGCagAIKIcGCIyMkeAKZLba3FPYs+yUtaRQWimFOc8Co-jiRgQxKUUkZXip2dJVtIoqCyTiBg0BXr8BUJufgFk5KABOmwAIZ3FJqUBaxxSVAAwYJiMxoEAAC61YABAQIgIyzTQAyUACpdgAfccAALjoBAA3owFaSbT7pgHdsURRoAOKcHiWFYpYSG6UwqckmpOTvh5KxngY58SUzPMKaAJJtiJRxQSvlDJJQel9LdhI-B8dYgO3lH2Ip-yoqQtSVonO+yVCHLBZgZ4PYkxnJhWlJMlzhiIo9laUADhBAACFBiaGhZUkom9cWZQUAQbAEtrnaxxd8zkb58RkDzNcpFsZqzvHBdFOlqKIWzlTCS8lsQc6NkFWijF7LUXovFeySVFKfyHNoB4rF1KP6mMQb-HOXz4WUwKoSqkNAIm01QBoFMWqDEfOKb4sx5igIAA4WWRQuZyWmeBxAVBVDADgfy9nmrFGsBcDA4LwA2LLO12qqU3NgPUIGcbOS5GgPEYYSVZlbhhc6wWrqPXnPZRyX1-rA3QGDbysNNA1jhmGFxaQO4uE0ETdrBgybdDyDwHFDNWa1aepKAWix7qh0lLiuWyolbq1mr9OG1Ykbo2xrwKSqaXF4jxodfW6kjbm2tpBSgR0sQrw6uSbS9lZ8jWRTZSa-Fc7kWSPtTM9tmSpqYCvCmY9H6yDXpKN6q9D6wC6OCYgamQhrW2roPol9jqYUMHfZ+uDurtYXvsRyYgeBoBAwYCG5JrKFXofoHTPD+GSgqG9RhrDOG6CMFiAvXVEZx0XI5DgKIVBnFAbQJI79p7X00uFZehFxTb2QD5nik8XHNUwbPR2xDZAv3yb-ROyhzACXzstTB8DghIOYC3bBz5b6T0KeQ2RgTcLSmYewxQXD46mMltiqx9jBBOPAsUIcioX0zna29JwJwEm1OKGNRlQD+yUU2DnI67WBAFoFANXPYUwWAvCjC5I8AEXPNtsqF5gAZBACLxR0vyEgJlwAKU2gEACKjgAM9sAAJjoBACYNTs4ohmSi+f86p5TMXvRxbub+hzIXhNuyAA)
