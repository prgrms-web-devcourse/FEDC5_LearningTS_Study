## 클래스

타입스크립트는 독립 함수를 이해하는 것과 동일한 방식으로 메서드를 이해합니다.

매개변수 타입에 타입이나 기본값을 지정하지 않으면 any타입을 기본으로 갖습니다.

메서드를 호출하기 위해서는 허용 가능한 수의 인수가 필요하고 재귀 함수가 아니라면 반환 타입을 유추할 수 있습니다.

```ts
class Greeter{
    greet(name : string){
        console.log(`${name}`)
    }
}

new Greeter.greet('h0ber')

new Greeter.greet() // Error
```

클래스 생성자는 매개변수와 관련하여 전형적인 클래스 메서드처럼 취급됩니다.

```ts

class Greeted{
    constructor(msg : string){
        console.log(`${msg}`)
    }
}

new Greeted() // Error
```

### 클래스 속성

TS에서 클래스의 속성을 읽거나 쓰기 위해서는 클래스에 명시적으로 선언해줘야 합니다.

클래스 속성 이름 뒤에는 선택적으로 타입 애너테이션이 붙습니다.

```js
class field{
    destination :string

    constructor(destination:string){
        this.destination = destination

        this.nonexistent = destination // Error
    }
}
```

`nonexistent`는 상위에서 타입을 선언하지 않았기 때문에 할당은 허용되지 않는다.

#### 함수 속성

자바스크립트에서 클래스의 멤버를 호출 가능한 함수로 선언하는 두 가지 구문이 있다.

```ts
class WithMethod {
    myMethod(){}
    myProps : () => {}
}

new WithMethod().myMethod === new WithMethod().myMethod

new WithMethod().myProps !== new WithMethod().myProps

```

myMethod는 인스턴스가 참조하는 값이 같지만 myProps는 함수가 할당되고 인스턴스당 새로운 함수가 생성되며 모두 다른 참조값을 가지기 때문에 같지 않다.


```ts
class WithParameters {
    takesParameters = (input : boolean) => input ?'yes' : 'no'
}

const instance = new WithParameters()

instance.takesParameters(true) // ok

instance.takesParameters(123)// Error
```

#### 8.2.2 초기화 검사

엄격한 컴파일러 설정이 활성화 된 상태에서 타입스크립트는 undefined 타입으로 선언된 각 속성이 생성자에게 할당되었는지 확인합니다.

- 문제가 발생하지 않는 경우

1. default Value가 설정된 경우
2. constructor에 의해 초기화 되는 경우
3. undefined가 되는것이 허용되는경우

**확실하게 할당 된 속성**

엄격한 초기화 검사가 유용한 경우가 대부분이지만, 클래스 생성자 다음에 속성을 의도적으로 할당하지 않는 경우가 있을 수도 있다.

엄격한 초기화 검사를 적용하면 안되는 속성의 경우에는 ! 를 추가해 비활성화 되도록한다.

음.. 질문

#### 선택적 속성

? 선택적 속성은 |undefined 를 포함하는 유니언 타입과 거의 동일하게 동작한다. 엄격한 초기화 검사는 생성자에서 선택적 속성을 명시적으로 설정하지 않아도 문제가 없다.

#### 8.2.4 읽기 전용 속성

readonly 키워드를 추가해 속성을 읽기전용으로 선언한다

```ts

class Quote{
    readonly text : string

    constructor(text : string){
        this.text ;
    }
}

// 이거 몬가요,,,
```

```ts

class check{
    readonly explicit : string = 'h0ber'

    readonly implicit = 'h0ber2'

    constructor(text : string){
        this.explicit = text
        // ok

        this.implicit = text 
        //Error
    }
}
```

이렇게 작성하면 `explicit`의 타입만 읽기전용이 되기에 문자열을 새로 할당하는 것은 가능하다.

`implicit`은 리터럴타입을 갖기때문에 재할당이 불가능하다

### 타입으로서의 클래스

```ts
class Teacher{
    sayHello(){
        console.log(123)
    }
}

let teacher : Teacher

teacher = new Teacher()
// ok

teacher = 123 // error
```


```ts
class SchoolBus{
    getAttribute(){
        return['123']
    }
}

function withSchoolBus(bus : SchoolBus){
    console.log(bus.getAttribute())
}

withSchoolBus(new SchoolBus())

withSchoolBus({getAttribute : ()=>['h0ber']}) // ok

withSchoolBus({getAttribute : ()=>[123]})// Error


```

위의 예시를 보면 이해하기 조금 더 쉽다. 인스턴스가 SchoolBus가 가지고 있는 멤버를 모두 포함하는지? 가 타입이 되는 개념이다.

마지막 메서드 호출은 getAttribute 메서드가 number[] 타입이기에 에러가 발생한다.

### 8.4 클래스와 인터페이스

클래스이름뒤에 implements키워드와 인터페이스 이름을 추가해서 인스턴스가 인터페이스를 준수한다고 선언할 수 있다.

```ts
interface Learner= {
    name : string;
    study(hours : number) : void
}

class Student implements Learner{
    name;
    //Error any type

    study(hours){}
    //Error any type
}
```

#### 8.4.1 다중 인터페이스 구현

클래스에서 다중인터페이스를 가질 수 있는데 모든 타입을 가져야 한다.

만약 둘중 하나의 속성을 갖지 않으면 에러가 발생한다.

실제로 클래스가 한번에 두 인터페이스를 구현할 수 없도록 정의하는 인터페이스가 있을 수 있다. 두 개의 충돌하는 인터페이스를 구현하는 클래스를 선언하려고 하면 클래스에 하나 이상의 타입 오류를 발생한다.

### 클래스 확장
타입스크립트는 다른 클래스를 확장하거나 하위클래스를 만드는 자바스크립트 개념에 타입검사를 추가합니다.

#### 8.5.1 할당 가능성 확장
하위클래스도 기본 클래스의 멤버를 상속한다.

하위 클래스의 인스턴스는 기본 클래스의 모든 멤버를 가지므로 기본 클래스의 인스턴스가 필요한 모든 곳에서 사용할 수 있다.

```ts
class Lesson {
    subject : string

    constructor(subject : string){
        this.subject = subject
    }
}

class Online extends Lesson{
    url : string

    constructor(subject : string , url : string){
        super(subject)
        this.url = url
    }
}

let online : Online
online = new Lesson('coding') // Error

```

#### 8.5.2 재정의된 생성자
super키워드를 통해 기본 클래스의 생성자를 호출해야 한다.

타입스크립트는 super()를 호출하기전에 this또는 super에 접근하려고 하는 경우 타입 오류를 보고합니다.

=> 자바스크립트임.

[코어자바스크립트 클래스](https://ko.javascript.info/class-inheritance)

#### 재정의된 메서드

하위 클래스의 메서드가 기본 클래스의 메서드에 할당될 수 있는 한 한위 클래스는 기본 클래스와 동일한 이름으로 새 메서드를 재선언 할 수 있다.

단, 새 메서드의 타입도 기본 메서드 대신 사용할 수 있어야 한다.

#### 재정의 된 속성
속성또한 메서드와 같이 재선언 할 수 있다.

기본 클래스와 구조적으로 타입이 일치해야 한다.

하위 클래스의 속성을 유니언 타입의 더 구체적인 하위 집합으로 만들거나 기본 클래스 속성 타입에서 확장되는 타입으로 만든다.

### 추상 클래스

일부 메서드의 구현을 선언하지 않고 하위 클래스가 해당 메서드를 제공할 것을 예상하고 기본 클래스를 만드는 것

특정메서드에 abstract 키워드를 달아주면 하위 클래스에서 반드시 구현을 해야한다.

또한 추상클래스는 인스턴스화 할 수 없다.


### 멤버 접근성
#을 추가해 private클래스 멤버임을 나타낸다.

public : 모든 곳에서 누구나 접근 가능
protected : 클래스 내부 또는 하위 클래스에서만 접근 가능
private : 클래스 내부에서만 접근 가능

default 는 public

private는 #키워드를 통해 사용한다

