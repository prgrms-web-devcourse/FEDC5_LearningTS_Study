## 유니언 리터럴

유니언 : 값에 허용된 타입을 두개 이상의 타입을 허용하도록 확장하는 것
내로잉 : 값에 허용된 타입이나 하나 이상의 타입이 가능하지 않도록 축소시키는 것

### 3.1 유니언 타입

```ts
let machine = Math.random() > 0.5 ? undefined : "h0ber";

let machine2: string | undefined;
machine2 = Math.random() > 0.5 ? undefined : "h0ber";
```

유니언이란 정확히 어떤타입일지 모르지만 두 개 이상의 옵션 중 하나를 정의할 때 좋다.
`|` 를 통해 유니언타입을 지정할 수 있다.

다만 두가지 타입 모두 갖고있는 프로퍼티는 사용할 수 있지만, 특정타입에는 존재하고 나머지에는 존재하지 않는다면 해당 프로퍼티는 사용할 수 없다.

### 3.2 내로잉

타입스크립트가 값의 타입이 이전에 알려진 것 보다 더 좁혀졌다는것을 알게되면 타입가드를 통해 논리적검사를 진행한다.

```ts
// 할당을 통한 내로잉
let check: number | string;
check = "h0ber";

check.toFixed(); // Error

// 조건검사를 통한 내로잉
let check2 = Math.random() > 0.5 ? "h0ber" : 123;
if (check2 === "h0ber") {
  check2.toUpperCase();
}

check2.toUpperCase(); // Error

// typeof 검사를 통한 내로잉

let check3 = Math.random() > 0.5 ? "h0ber" : 123;
typeof check3 === "string" ? check3.toUpperCase() : check3.toFixed();
```

**할당을 통한 내로잉**

> 초기에 number | string 으로 선언했지만 string을 할당하면서 string타입이라는 것을 인지하게 된다.

**조건 검사를 통한 내로잉**

> if조건문이 동작하면 check2는 string이라는 타입이 확정되지만 그렇지 않다면 number | string이기에 에러가 발생

**typeof 검사를 통한 내로잉**

> typeof검사를 통해 타입이 확정되고 난 이후의 코드가 동작

### 3.3 리터럴 타입

리터럴 타입이란 구체적인 버전의 원시타입이며 예를들어 string은 존재할 수 있는 모든 문자열의 집합을 나타내지만

```ts
const check = "h0ber";
```

check는 'h0ber'이라는 문자열만을 갖는다.

유니언 타입에 리터럴과 원시타입을 섞어서 사용할 수 있다.

### 3.4 엄격한 null

**strictNullChecks**를 활성화하면 모든 타입에 | null | undefined를 해줘야 한다.

해당 옵션을 false로 하는것이 더 안전하다고 주장하지만 실질적으로 undefined.toLowerCase() 는 잘못된 것이다.

자바스크립트에서는 잠재적인 true / truthy 가 true로 간주된다.

타입스크립트는 잠재적인 값중 truthy로 확인된 일부에 한해서만 타입을 좁힐 수 잇다.

```ts
let checkNull = Math.random() > 0.5 ? "h0ber" : undefined;

if (checkNull) {
  console.log(checkNull.toUpperCase());
}
checkNull.toLLowerCase(); //  undefined일 수 있기에 에러가 발생한다.
```

위와같은 예제에서 if문 내에서는 string으로 한정되지만 if문 밖에서는 정확한 타입을 좁힐 수 없다.

### 3.5 타입 별칭

**type name = 타입** 과 같은형태로 재사용하는 타입에 타입별칭을 지정해 줄 수 있으며 네이밍은 파스칼 케이스로 이름을 지정합니다.

타입별칭은 자바스크립트가 아니기 때문에 자바스크립트로 변환되지 않는다. 타입별칭은 '개발 시' 에만 존재한다.

타입별칭은 결합또한 가능하다. 순서는 중요하지 않다.

```ts
type id = number | string;
type checkId = id | null | undefined;
```
