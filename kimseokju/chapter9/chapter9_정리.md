# 타입 제한자

## TOP 타입

TOP 타입은 시스템에서 가능한 모든 값을 나타내는 타입이다. 반대는 never, 어떤 값도 할당할 수 없다.

### any 다시 보기

any는 모든 타입의 위치에서 제공된다는 점에서 top처럼 동작할 수 있다.
모든 타입을 다 할당할 수 있지만 타입 검사를 수행하지 않기에 에러가 나는 코드를 미리 감지하고 방지할 수 없다.

```ts
let anyValue: any;
anyValue = "123123"; // 문제 없음
anyValue = 123; // 문제 없음
console.log(anyValue);

---------------------------------

function greetComedian(name: any){
  console.log(`이름: ${name.toUpperCase()}`)
}

greetComedian({name: "kim"}) // 에러가 난다. 객체에 할당이 아닌 그냥 문자열을 줘야함.
```

### unknown

`진정한 top 타입` unknown에 대해서 알아보도록 하자. any와의 차이점은, unknown이 훨씬 더 값을 제한적으로 취급한다는 것이다.

```ts
function greetComedian(name: unknown){
  console.log(`이름: ${name.toUpperCase()}`) // 에러, unknown 타입 값의 속성에는 직접 접근이 불가능하다.
}
greetComedian({name: "kim"})

----------------------
// 접근할 수 있는 방법은 instanceof or typeof 또는 타입 assertion을 사용하여 타입을 제한하는 경우에 사용이 가능하다.
function gCS(name: unknown){
  if(typeof name === "string"){ //오타인듯 name
    console.log(`이름: ${name.toUpperCase()}`)
  }else{
    console.log("Well, I'm off")
  }
}

gCS("Betty") // 이름: BETTY
gCS({}) // Well, I'm off
```

## 타입 서술어

```ts
// 우리는 이 코드가 어떤 것을 반환하는지 알지만 TS는 boolean타입이라는 것 까지밖에 모른다.
function isNumOrStr(value: unknown) {
  return ["number", "string"].includes(typeof value);
}

function logValueIfExists(value: number | string | null | undefined) {
  if (isNumOrStr(value)) {
    value.toString();
  } else {
    console.log("value 없음");
  }
}

// ------------------
// 하지만 아래와 같이 타입서술어라 불리는 is 키워드를 이용해서 인수의 타입을 특정 타입으로 선언할 수 있다.

function isNumOrStr(value: unknown): value is number | string {
  return ["number", "string"].includes(typeof value);
}

// 하지만 value가 null | undefined인 경우도 고려해야 하므로 아래처럼 입력해준다..?
function logValueIfExists(value: number | string | null | undefined) {
  if (isNumOrStr(value)) {
    value.toString();
  } else {
    console.log("value 없음");
  }
}
```

타입 서술어는 결국 더 구체적인 타입을 명시해주는 역할을 하는 것 같다.<br />
인터페이스로도 가능하다.

```ts
interface Comedian {
  funny: boolean;
}

interface StandupComedian extends Comedian {
  routine: string;
}

function isStandipComedian(value: Comedian): value is StandupComedian {
  return "routine" in value;
}

function workWithComedian(value: Comedian) {
  if (isStandipComedian(value)) {
    console.log(value.routine); // 정상 동작
  }
  console.log(value.routine); //Comedian에는 없는 값이라 동작하지 않음.
}

// ---------------------

function isLongString(input: string | undefined): input is string {
  return !!(input && input.length >= 7);
}

function workWithText(text: string | undefined) {
  if (isLongString(text)) {
    console.log("long text:", text.length);
  } else {
    console.log("short text:", text?.length); // ! 키워드로 null 또는 undefined가 아님을 단언해주면 문제가 사라지긴한다.
  }
}
```

## 타입 연산자

### keyof

객체의 모든 속성 키를 문자열 또는 숫자 리터럴 유니온 타입으로 가져오는 연산자이다.

```ts
interface Ratings {
  audience: number;
  critics: number;
}

function getRating(ratings: Ratings, key: string): number {
  return ratings[key]; //허용되지 않은 값을 할당할 수 있어서?? 에러를 출력??
}

const ratings: Ratings = { audience: 66, critics: 84 };
getRating(ratings, "audience");
getRating(ratings, "not valid"); // 허용되지만 사용 X

function getRating2(ratings: Ratings, key: "audience" | "critics"): number {
  return ratings[key]; // 하지만 명확하게 지정해주니 괜찮다.
}

const ratings2: Ratings = { audience: 66, critics: 84 };
getRating2(ratings2, "audience");
getRating2(ratings2, "not valid");

function getCountKeyof(ratings: Ratings, key: keyof Ratings): number {
  return ratings[key]; // 그리고 이렇게 keyof로 간단하게 할 수 있다.
}

const ratings3: Ratings = { audience: 66, critics: 84 };
getCountKeyof(ratings3, "audience");
getCountKeyof(ratings3, "not valid"); //not valid는 Ratings의 키가 아니므로 에러
```

### typeof

피연산자의 타입 정보를 추출하는 연산자이다. typeof는 값의 타입을 검색하고 keyof는 타입에 허용된 키를 검색한다.

```ts
const original = {
  medium: "movie",
  title: "Mean Girls",
};

let adaptation: typeof original;

if (Math.random() > 0.5) {
  adaptation = { ...original, medium: "play" };
} else {
  adaptation = { ...original, medium: 2 }; // medium의 타입은 string 이므로 에러 출력
}
```

## 타입 assertion

TS 컴파일러에 특정 변수의 타입을 확신한다고 알려주는 것이다. as 키워드를 사용한다.

```ts
const rawData = '["grace", "frankie"]';

JSON.parse(rawData); // 타입 any
JSON.parse(rawData) as string[]; //타입 string[]
JSON.parse(rawData) as [string, string]; //타입 [string, string]
JSON.parse(rawData) as ["grace", "frankie"]; // 타입 ["grace", "frankie"]
// 이렇게 as 키워드로 정 타입임을 강력하게 지정해줄 수 있다.
```

#### 타입 assertion vs 선언

타입 어서션은 컴파일러에게 나는 이 타입이다! 라고 확실하게 말하는 것이고 타입 검사를 건너뛰고, 타입 선언은 명시적으로 지정 하지만 이것은 코드의 가독성을 위한 목적이 더 크고 그렇기에 타입 검사를 진행한다.

## const assertion

const assertion은 말 그대로 모든 변수를 상수처럼 취급할 때 사용된다. 추후 재할당 되지 않도록 하여 타입 추론 시 더 좁게 내로잉 하는 역할을 한다. 더 구체적이고 명확한 타입을 가진다.

```ts
[0, ""]; // << 타입은 (number | string)[]이다.
[0, ""] as const; // << 타입은 `readonly` [0, '']이다.
```

[실습 코드](https://www.typescriptlang.org/play?#code/PTAECUFcBsFNQFykCdDhWocALjpAOC6QKT2BBxwBdHAcQdGACpRyxAdDtEDZuwGXHAMmcBrOgGlEBaGwAN7RAficC4g5hChANQOBKsYBQFKXAAuoAIYA7AJ4A1JdEiwkqtQG4pBrTvgBeUAHIAjACYAzA8fWyYQBzdgHAnQgMdHGJupmuqBWLu6g3n4BAMYA9ioAznFwAHTQcQDmABSm2roAlFLUUjLkUgBmkCox8gCWCaCZAE6wsPIAwnEAtrAAJnWq2SpKvfrqBQDeUqCg8UkpsOlZ2QAGgC7jgCGdSAAkkyO9qfJxAKoADmewzR1KibDZBQC+q0WPpS1tnT39gyrZ+6M9KAAEQAazq3WBjwKEUIgBv2wAANaBADkNgBOm1KgQC4NYAWmcIoEABquAT6b1qBACKjgBmm0CAD9rAKcNkUACeOAF9HACLjoEAGJOAH1HABarqWKwFKsiqNXqjQ+7S6vQGQwOQOqoJUcQA7iopjM5glkmkMjkNttQHsZUdThcrjc7g9njDRPDOHKFcrQIABhcAoeOgQBINYANcdAgFjBwCMg4RAClNoEAg5OARAnQKHAD+1JMAEb0IwClTYANVfRUjeUjFX0lv3+MqQYIhUKKlWqtQaKiaHQAysNAUg7UqVdNZnUKtl5GpLnEKqAZaELFZgYl5M06ipMsCpu5ACRjjsAHuOAe5ae4C1bN5pqltq1ltdgDDsdzpdrrd7k8XmrHrBoHcm7N1QstStgQB1S-QTgASWs3VAXYqE-PqbvFW2TAgAQu07YThE26gKBACiAAqCEAJrpsBVpgC+0BvqAn7fr+oB8gK5SiIADWOsEGJKACrzgA7LUigAto4AJa2gIAwTWsoAGD2ABpriYBoAA5OgIAMqO8YAM52gAhlZBgARnEiyqC66yAD7tQYsaAgAydbxgBoPXigAVXYAHp0pkKpaNHUiQAHKQN0ADyzSVsO2QAG75LKKjyg2qqzK08iQM05YANrWCoFmSVc1icNYQ4jmO1gALqpKOMQ6H0sCJG2HawF2oCOeYrylIZIrltqwSwO+FRwQAHiZ8gpVluhIIF3TBc0oAAD6gBFo6ZC1PYwNAXXVElFSjv07mgC22QmeZVk2XZNWwAUI2zLNRq2ZFORFLMF5XrAN6rhqizLDkwKzdE-4bYBMhgAAtNdN23Xd925SW+WgO2lwAAqtAMMRKPI9yjmckDyEgT51ElCFpQUSD-YDo2JKAplKM0zRKuDlzGBdoD3Vj2OPcKZaw5N1krQ5Tl1i59oqkgx0md1DVXF17VjjenneX5AVBSFYWM5kMVxTUiXJalnbdrNOXFnjjSFU5JXlZV1Wk7TjUM8OHVdYF2F9SoA1DX0I1jRNFlEzNTnzTtmVOctKtjg856XteK53uuB0gcd-inaAbxpqI2M+7dpSjr9zQVEoMTwBKPyqKAN5CuoSDSbJKjnQHVzB6HoC2aofSQGc4dSuWsBlb9Wtw7nvzM3EgNDUg3PGGmeX4yZGda3UOffHnJPmEgpeqJD5vmLD6fyJn2fd+WzPtKzNjI5XKiwG4o597o53140ipxM0oIg-IAAWo8d7VoCj3rraN0Pzet1mQyiwtjv7ZuS3T-Us8YaAgCoE4AgwOgIAm82AInjAG7feDcKwH4VyfnNdwo9Ax+CDG6RS38f6Jn4oAKVHGC8i9ldX2vtcZGXLCZAAMgkTIK0OrjRUADIGbUradVav1WAg1Z66yhmQmGNNuZRzVCzHyoAACE3DSHkNAAAMkEaNZh8h0iwDHDvUAAA+KwAB2MWK9yxrw3lvbeCEC7yDbFo6uVDNbawYcfcaiQCFjmIdbX6hdTYOzXHfR8GQxwvV0cCTgVjxFwCkdvdaHs7bbVsXtB8h1Ejb3XoodxCBXHOMLgAfgkV4l+3DQCABKFwAM2M0ToOrXqgAENqDLQ+h-QkSkkABtNrJAAXTYADtHAAuq-wQALl2RC8EiMQCleKABY6wAOqspjOm8EoZQpDJyDiHeA4AfodUSDeJQkABiSNDnVDmzRjCrhHPUGIiQ5l0wWcvJ6+NMjtBGU-HIzRRljjWRAY5mREicFBLANQejVq93qo1ceXkuFHIOYkXy1y1DRXOmuRQbyxlIH2WM0IUdJnTJqECAAbFCzgMRll1FWQgAAHAAFjeLs+QwLrYApOWFcFdQZlzyKJi7FhzzmXJsAqRQWVQbWCLMopoezzn2GyLii5QKKVXJuUgawBKiVuFatYeFdQVmJHpesp5HCJ6vIpZ8m5Py0x-NAOyxI9hOXvNBZMflkKkAwrhQipFaKMXMoOay1V9h8VTMJZC+l6ZTUdXNRSy1VK4g0u0HShl2zRTigrioeQABpG5XY2UUo1WM7ltzQBfIymSxIDz5nPMnqq+V3zfkan+RSxw4aTlap1bM0A+q5iGrWca+1XxqiBuDa2VVjgrUQtDnazFXRK1BrUCG2tYVqV909URPpyr151EyKObQWq1RZgsry7ocR7KEtCmqeo8g4C8oALKwEjgAcTqM0K81hzoKGUH0JQZwh75SQK9dK3ZB3DpGNAdGY0V0-W3qkI5WsegPFkaAAADKkAArCNJQR6T2jMaFYSYqQIPXpHThCd3Q8xnGgEoNQUJUx+ImUB09+MwMQdSFB29nBYNIHsI8CIsGvQukwGw9YgAB7roPCUAgAc2cAKQdgFemyGVUcxUAARH6ShQXWF8sCFoQyonAgqK+8EsBgTRT3VIAAUpWSyplUhnERuaTjPGh4vxdModQ8nFPKdU80dTShuO8ZhLcShq1fLRXcDp7mNn9NKZU2p+4GnzPKDhr5bmnBua2ZADp7zVDfNUJ+Qp5zRmTNma0550AgnhOh1E+J1QknpMREC0Jo5iXOBiYk4S6TGN1iAHAOwAMTWxbSRkt+TpnSABDx1kgBUGqY4mMrvFX5VMACCToBAAYQ6AQAEeMpl6b5L9YUYqGAiAAHnG9VzAwx5nK3uTZ9YKYhsjds5Zv5Y3RCTem6AVYrRAMJGgGoVYcXhs2Bikt1IQA)
