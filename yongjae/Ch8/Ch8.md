# 08 클래스

## 8.1 클래스 메서드

타입스크립트는 매개변수 타입이나 기본값을 지정하지 않으면 any 타입을 기본으로 갖는다.

다음은 string 타입의 단일 매개변수를 갖는 greet 클래스 메서드를 가진 Greeter 클래스를 정의하는 코드다.

```typescript
class Greeter {
  greet(name: string) {
    console.log("${name}, do you stuff!");
  }
}

new Greeter().greet("Miss Frizzle"); // Ok

new Greeter().greet();
// Error: Expected 1 arguments, but got 0.
```

타입스크립트는 메서드 호출 시 올바른 타입의 인수가 올바른 수로 제공되는지 확인하기 위해 타입 검사를 수행한다.

## 8.2 클래스 속성

타입스크립트는 생성자 내의 할당에 대해서 그 멤버가 클래스에 존재하는 멤버인지 추론하려고 시도하지 않는다.

다음 예제에서 destination은 string으로 명시적으로 선언되어 있어 FieldTrip 클래스 인스턴스에 할당되고 접근할 수 있다. 클래스가 nonexistence 속성울 선언하지 않았기 때문에 생성자에서 this.nonexistent 할당은 허용되지 않는다.

```typescript
class FieldTrip {
    destination: string;

    constructor(destination: string) {
        this.destination = destination // Ok
        console.log('We're going to ${this.destination}!');

        this.nonexistent = destination;
        // Error: Property 'nonexistent' does not exist on type 'FiledTrip'.
    }
}
```

### 8.2.1 함수 속성

자바스크립트에는 클래스의 멤버를 호출 가능한 함수로 선언하는 두 가지 구문이 있다. 다음 WiteMethod 클래스는 모든 인스턴스가 참조할 수 있는 myMethod 메서드를 선언한다.

```typescript
class WithMethod {
  myMethod() {}
}

new WithMethod().myMethod === new WithMethod().myMethod; // true
```

값이 함수는 속성을 선언하는 방식도 있다. 다음 WithProperty 클래스는 이름이 myProperty인 단일 속성을 포함하며 각 클래스 인스턴스에 대해 다시 생성되는 () => void 타입이다.

```typescript
class WithProperty {
  myProperty: () => {};
}

new WithMethod().myProperty === new WithMethod().myProperty; // false
```

### 8.2.2 초기화 검사

엄격한 컴파일러 설정이 활성화된 상태에서 타입스크립트는 undefined 타입으로 선언된 각 속성이 생성자에서 할당되었는지 확인한다.

다음 WithValue 클래스는 unused 속성에 값을 할당하지 않았고, 타입스크립트는 이 속성을 타입 오류로 인식한다.

```typescript
class WithValue {
  immediate = 0; // Ok
  later: number; // Ok(constructor에서 할당)
  mayBeUndefined: number | undefined; // Ok(undefined가 되는 것이 허용됨)
  unused: number;
  // Error: Property 'unused' has no initializer
  // and is not definitely assigned in the constructor.

  constructor() {
    this.later = 1;
  }
}
```

엄격한 초기화 검사가 없다면, 비록 타입 시스템이 undefined 값에 접근할 수 없다고 말하지라도 클래스 인스턴스는 undefined 값에 접근할 수 있다.

#### 확실하게 할당된 속성

엄격한 초기화 검사가 유용한 경우가 대부분이지만 클래스 생성자 다음에 클래스 속성을 의도적으로 할당하지 않는 경우가 있을 수도 있다. 엄격한 초기화 검사를 적용하면 안 되누느 속성인 경우에눈 이름 뒤에 !를 추가해 검사룰 비활성화하도록 설정한다. 이렇게 하면 타입스크립트 속성이 처음 사용되기 전에 undefined 값이 할당된다.

### 8.2.3 선택적 속성

인터페이스와 마찬가지로 클래스는 선언된 속성 이름 뒤에 ?를 추가해 속성을 옵션으로 선언한다. 선택적 속성은 | undefined를 포함하는 유니언 타입과 거의 동일하게 작동한다.

### 8.2.4 읽기 전용 속성

인터페이스와 마찬가지로 클래스도 선언된 속성 이름 앞에 readonly 키워드를 추가해 속성을 읽기 전용으로 선언한다. readonly 키워드는 타입 시스템에만 존재하며 자바스크립트로 컴파일할 때 삭제된다.

readonly로 선언된 속성은 선언된 위치 또는 생성자에서 초깃값만 할당할 수 있다. 클래스 내의 메서드를 포함한 다른 모든 워치에서 속성은 읽을 수만 있고, 쓸 수는 없다.

원시 타입의 초깃값을 갖는 readonly로 선언된 속성은 다른 속성과 조금 다르다. 타입스크립트는 값이 나중에 변경되지 않는 것을 알기 때문에 더 공격적인 초기 타입 내로잉을 편하게 느낀다.

```typescript
class RandomQuote {
  readonly explicit: string = "Home is the nicest world there is.";
  readonly implicit = "Home is the nicest word there is.";

  constructor() {
    if (Math.random() > 0.5) {
      this.explicit = "We start learning the minute we're born.";

      this.implicit = "We start learning the minute we're born.";
      // Error: Type '"We start learning the minute we're born."' is not assignable to type '"Home is the nicest word there is."';
    }
  }
}

const quote = new RandomQuote();

quote.explicit; // 타입: string
quote.implicit; // 타입: "Home is the nicest word there is."
```

## 8.3 타입으로서의 클래스

타입 시스템에서의 클래스는 클래스 선언이 런타임 값(클래스 자체)과 타입 애너테이션에서 사용할 수 있는 타입을 모두 생성한다는 점에서 상대적으로 독특하다.

흥미롭게도 타입스크립트는 클래스의 동일한 멤버를 모두 포함하는 모든 객체 타입을 클래스에 할당할 수 있는 것으로 간주한다. 타입스크립트의 구조적 타이핑이 선언되는 방식이 아니라 객체의 형태만 고려하기 때문이다.

다음 WithSchoolBus는 SchoolBus 타입의 매개변수를 받는다. 매개변수로 SchoolBus 클래스 인스턴스처럼 타입이 () => string[]인 getAbilities 속성을 가진 모든 객체를 할당할 수 있다.

```typescript
class SchoolBus {
  getAbilities() {
    return ["magic", "shapeshifting"];
  }
}

function withSchoolBus(bus: SchoolBus) {
  console.log(bus.getAbilities());
}

withSchoolBus(new SchoolBus()); // Ok

// Ok
withSchoolBus({
  getAbilities: () => ["transmogrification"],
});

withSchoolBus({
  getAbilities: () => 123,
  // Error: Type 'number' is nit assignable to type 'string[]'.
});
```

## 8.4 클래스와 인터페이스

타입스크립트는 클래스 이름 뒤에 implements 키워드와 인터페이스 이름을 추가함으로써 클래스의 해당 인스턴스가 인터페이스를 준수한다고 선언할 수 있다.

다음 예제에서 Student 클래스는 name 속성과 study 메서드를 포함해 Learner 인터페이스를 올바르게 구현했지만 Slacker에는 study가 누락되어 타입 오류가 발생한다.

```typescript
interface Learner {
  name: string;
  study(hours: number): void;
}

class Student implements Learner {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  study(hours: number) {
    for (let i = 0; i < hours; i += 1) {
      console.log("...studying...");
    }
  }
}

class Slacker implements Learner {
  // Error: Class 'Slacker' incorrectly implements interface 'Learner'.
  // Property 'study' is missing in type 'Slacker' but required in type 'Learner'.
  // name = "Rocky";
}
```

### 8.4.1 다중 인터페이스 구현

타입스크립트의 클래스는 다중 인터페이스를 구현해 선언할 수 있으며, 한 번에 두 인터페이스를 구현할 수 없도록 정의하는 인터페이스도 있을 수 있다.

예를 들어 각각의 다른 인터페이스에서 동일한 이름의 속성을 서로 다른 타입으로 선언하면 두 인터페이스를 구현하는 클래스는 이 두 개의 인터페이스를 전부 제대로 구현하지 못합니다.

## 8.5 클래스 확장

타입스크립트는 다른 클래스를 확장하거나 하위 클래스를 만드는 자바스크립트 개념에 타입 검사를 추가한다. 먼저 기본 클래스에 선언된 모든 메서드나 속성은 파생 클래스라고도 하는 하위 클래스에서 사용할 수 있다.

```typescript
class Teacher {
  teach() {
    console.log("The surest test or discipline is its absence.");
  }
}

class StudentTeacher extends Teacher {
  learn() {
    console.log("I cannot afford the luxury of a closed mind.");
  }
}

const teacher = new StudentTeacher();

teacher.teach(); // Ok(기본 클래스에 정의됨)
teacher.learn(); // Ok(하위 클래스에 정의됨)

teacher.other();
// Error: Property 'other' does not exist on type 'StudentTeacher'.
```

### 8.5.1 할당 가능성 확장

파생 인터페이스가 기본 인터페이스를 확장하는 것과 마찬가지로 하위 클래스도 기본 클래스의 멤버를 상속한다. 하위 클래스의 인스턴스는 기본 클래스의 모든 멤버를 가지므로 기본 클래스의 인스턴스가 필요한 모든 곳에서 사용할 수 있다. 만약 기본 클래스에 하위 클래스가 가지고 있는 모든 멤버가 없으면 더 구체적인 하위 클래스가 필요할 때 사용할 수 없다.

타입스크립트의 구조적 타입에 따라 하위 클래스의 모든 멤버가 동일한 타입의 기본 클래스에 이미 존재하는 경우 기본 클래스의 인스턴스를 하위 클래스 대신 사용할 수 있다.

### 8.5.2 재정의된 생성자

바닐라 자바스크립트와 마찬가지로 타입스크립트에서 하위 클래스는 자체 생성자를 정의할 필요가 없다. 자체 생성자가 없는 하위 클래스는 암묵적으로 기본 클래스의 생성자를 사용한다.

자바스크립트에서 하위 클래스가 자체 생성자를 선언하면 super 키워드를 통해 기본 클래스 생성자를 호출해야 한다.

자바스크립트 규칙에 따르면 하위 클래스의 생성자는 this 또는 super에 접근하기 전에 반드시 기본 클래스의 생성자를 호출해야 한다. 타입스크립트는 super()를 호출하기 전에 this 또는 super에 접근하려고 하는 경우 타입 오류를 보고한다.

### 8.5.3 재정의된 메서드

하위 클래스의 메서드가 기본 클래스의 메서드에 할당될 수 있는 한 하위 클래스는 기본 클래스와 동일한 이름으로 새 메서드를 다시 선언할 수 있다.

### 8.5.4 재정의된 속성

하위 클래스는 새 타입을 기본 클래스의 타입에 할당할 수 있는 한 동일한 이름으로 기본 클래스의 속성을 명시적으로 다시 선언할 수 있다. 재정의된 메서드와 마찬가지로 하위 클래스는 기본 클래스와 구조적으로 일치해야 한다.

속성을 다시 선언하는 대부분의 하위 클래스는 해당 속성을 유니언 타입의 더 구체적인 하위 집합으로 만들거나 기본 클래스 속성 타입에서 확장되는 타입으로 만든다.

```typescript
class Assignment {
  grade?: number;
}

class GradeAssignment extends Assignment {
  grade: number;

  constructor(grade: number) {
    super();
    this.grade = grade;
  }
}
```

속성의 유니언 타입의 허용된 값 집합을 확장할 수는 없다. 만약 확장한다면 하위 클래스 속성은 더 이상 기본 클래스 속성 타입에 할당할 수 없다.

## 8.6 추상 클래스

때로는 일부 메서드의 구현을 선언하지 않고, 대신 하위 클래스가 해당 메서드를 제공할 것을 예상하고 기본 클래스를 만드는 방법이 유용할 수 있다. 추상화하려는 클래스 이름과 메서드 앞에 타입스크립트의 abstract 키워드를 추가하면 인터페이스와 동일한 방식으로 선언된다.

## 8.7 멤버 접근성

자바스크립트에서는 클래스 멤버 이름 앞에 #을 추가해 private 클래스 멤버임을 나타낸다. private 클래스 멤버는 해당 클래스 인스턴스에서만 접근할 수 있다.

타입스크립트는 private 클래스 멤버를 지원하지만, 타입 시스템에서만 존재하는 클래스 메서드와 속성에 대해 조금 더 미묘한 프라이버시 정의 집합을 사용한다. 타입스크립트 멤버 접근성(가시성)은 클래스 멤버의 선언 이름 앞에 다음 키워드 중 하나를 추가해 만든다.

- public(기본값): 모든 곳에서 누구나 접근 가능
- protected: 클래스 내부 또는 하위 클래스에서만 접근 가능
- private: 클래스 내부에서만 접근 가능

타입스크립트의 멤버 접근성은 타입 시스템에서만 존재하는 반면 자바스크립트의 private 선언은 런타임에도 존재한다는 점이 주요 차이점이다.

접근성 제한자는 readonly와 함께 표시될 수 있다. readonly와 명시적 접근성 키워드로 멤버를 선언하려면 접근성 키워드를 먼저 적어야 한다.

### 8.7.1 정적 필드 제한자

타입스크립트는 static 키워드를 단독으로 사용하거나 readonly와 접근성 키워드를 함께 사용할 수 있도록 지원한다. 함께 사용할 경우 접근성 키워드를 먼저 작성하고, 그다음 static, readonly 키워드가 온다.

다음 Question 클래스는 protected, static, readonly를 모두 사용해 prompt와 answer 속성을 만든다.

```typescript
class Question {
  protected static readonly answer: "bash";
  protected static readonly prompt =
    "What's an ogre's favorite programming language?";

  guess(getAnswer: (prompt: string) => string) {
    const answer = getAnswer(Question.prompt);

    // Ok
    if (answer === Question.answer) {
      console.log("You get it!");
    } else {
      console.log("Try again...");
    }
  }
}

Question.answer;
// Error: Property 'answer' is protected and only
// accessible within class 'Question' and its subclasses.
```
