# 8장 클래스

## 8.1 클래스 메서드

- 매개변수 타입에 타입이나 기본값 지정 x → any 타입이 기본
- 허용 가능한 인수의 개수
- 반환 타입 유추 가능

**클래스 생성자**

- 올바른 타입의 인수가 올바른 수로 제공되는지 확인하기 위한 타입 검사

## 8.2 클래스 속성

- 클래스의 속성을 읽거나 쓸 경우 클래스에 명시적으로 선언
- 선택적으로 타입 애너테이션 추가

```jsx
class FieldTrip {
	destination: string;
	
	constructor(destination:string) {
		this.destination = destination; // OK
		this.nonexistent = destination; // Error! 
		// Property 'nonexistent' does not exist on type 'FieldTrip'.
	}
```

### 8.2.1 함수 속성

[1] 메서드를 가진 클래스

```jsx
class WithMethod {
	myMethod() {} 
}

new WithMethod().myMethod === new WithMethod().myMethod; // true
```

[2] 속성(프로퍼티)으로 함수를 가진 클래스

```jsx
class WithProperty {
	myProperty: () => {}
}

new WithMethod().myProperty === new WithMethod().myProperty; // false
```

### 8.2.2 초기화 검사

엄격한 컴파일러 설정이 되면 undefined 타입으로 선언된 각 속성이 생성자에 할당되었는지 확인 

**확실하게 할당된 속성**

속성명 뒤에 `!` 를 추가하면 엄격한 검사를 비활성화 가능

하지만, 타입 검사에 적합하지않은 방식이다!

### 8.2.4 읽기 전용 속성

확장하기 위해서는 타입 애네테이션이 필요하다.

```tsx
class User {
	readonly name: string = "sein";
    readonly age = 20;

    constructor() {
        this.name = 'hyun'; // Ok!
        this.age = 30; // Error!
        // Type '30' is not assignable to type '20'.
    }
}

// 타입 string
User.name;
// 타입 20
User.age;
```

## 8.4 클래스와 인터페이스

클래스 이름 뒤에 `implements`와 `인터페이스 이름`을 추가해서 인스턴스가 인터페이스를 준수한다고 선언할 수 있다. 

```jsx
interface Learner {
	name: string;
	study(hours: number): void;
}

class Student implements Leaner {
	name: string;
	
	// ...
	
	study(hours: number) { }
}
```

### 8.4.1 다중 인터페이스 구현

다중 인터페이스 구현은 하나의 클래스가 두 개 이상의 인터페이스를 동시에 구현하는 것으로 클래스는 각 인터페이스의 모든 요구사항을 충족해야한다. 

## 8.5 클래스 확장

기본 클래스에 선언된 모든 메서드나 속성은 파생 클래스(하위 클래스)에서 사용 가능하다. 

### 8.5.1 할당 가능성 확장

파생 인터페이스가 기본 인터페이스를 확장하는 것처럼 하위 클래스도 기본 클래스의 멤버를 상속한다. 

### 8.5.2 재정의된 생성자

자체 생성자가 없는 하위 클래스는 암묵적으로 기본 클래스의 생성자를 사용한다. 

super 키워드를 통해 기본 클래스 생성자를 호출해야 한다. 

super()를 호출하기 전에 this 또는 super에 접근하면 타입 오류가 발생한다. 

### 8.5.3 재정의된 속성

하위 클래스는 기본 클래스와 구조적으로 일치해야 한다. 

하위 클래스는 해당 속성을 유니언 타입의 더 구체적인 하위 집합으로 만들거나 기본 클래스 속성 타입에서 확장되는 타입으로 만든다. 

## 8.6 추상 클래스

일부 메서드의 구현을 선언하지 않고, 하위 클래스가 해당 메서드를 제공할 것을 예쌍하고 기본 클래스를 만드는 방법이 유용할 수 있다. 

abstract키워드를 사용한다.

일부 메서드에 대한 정의가 없기 때문에 추상 클래스를 직접 인스턴스화할 수 없다. 

## 8.7 멤버 접근성

#을 추가해 private 클래스 멤버임을 나타낸다. 

- public(기본값): 모든 곳에서 누구나 접근 가능
- protected: 클래스 내부 또는 하위 클래스에서만 접근 가능
- private: 클래스 내부에서만 접근 가능

이러한 키워드는 타입 시스템 내에 존재하여 자바스크립트로 컴파일되면 제거된다.