# 클래스

TS에서 클래스 사용은 권장되지 않는다..?

## 메서드

<details>
<summary>독립 함수..?</summary>
<div markdown="1">

타입스크립트에서 독립 함수는 특정 객체에 속하지 않고, 전역 스코프에서 정의된 함수를 의미한다?

특정 개체에 속하지 않고 전역 스코프에 정의된 함수를 가리킨다. 그러므로 함수는 특정 객체의 메서드가 아닌, `독립적인` 존재를 의미한다.

<details>
<summary>함수와 메서드의 차이</summary>
<div markdown="1">

```js
// 독립 함수 예제
function add(a, b) {
  return a + b;
}

// 메서드 예제
const myObject = {
  myMethod: function () {
    console.log("This is a method.");
  },
};

// 함수는 아래와 같이 사용
const result = add(3, 5);
console.log(result); // 8

// 메서드는 아래와 같이 객체의 메서드 호출 방식으로 사용
myObject.myMethod();
```

</div>
</details>
</div>
</details>

대부분 반환 타입의 유추가 가능하다.

## 클래스 속성

TS에서 클래스의 속성을 읽거나 쓰려면 클래스에 `명시적`으로 선언해야 한다.

```ts
class FieldTrip {
  destination: string;
  // nonexisstent: string; // 하지만 선언해준다면 에러는 사라진다.

  constructor(destination: string) {
    this.destination = destination;
    console.log(`Goto ${destination}`);

    // 아래 코드는 Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. 라는 에러가 난다.
    this.nonexisstent = destination;
  }
}
```

IDE에서 제공하는 해결법도 위처럼 상단에 명시해주는 것이다.

![Alt text](image.png)

이렇게 명시적으로 선언해야 TS 클래스 인스턴스에서 무엇이 허용되고 허용되지 않는 지 빠르게 알 수 있다.

### 함수 속성

메서드 접근 방식은 함수를 클래스 프로토타입에 할당하므로 모든 클래스 인스턴스는 동일한 함수 정의를 사용한다. 무슨 말일까 ?? 를 띄우다가 예제를 보니, 결국 WIthMethod를 여러 번 새로 생성해도 그것들이 가르키는 myMethod는 동일한 메서드를 가리킨다는 것이다.

```ts
new WithMethod().myMethod === new WithMethod().myMethod; //true란다.
```

### 초기화 검사

엄격한 설정이 활성화되면 TS는 각 속성이 생성자에서 할당되었는지 확인한다.

```ts
class WithValue {
  immediate = 0; // 아예 할당연산자로 0을 할당
  later: number; // constructor에서 사용
  mayBeUndefined: number | undefined; // 얘는 undefined 여도 허용
  unused: number; // 아무것도 없으니 에러 | undefined를 붙여주거나 아래에서 선언하면 된다.

  constructor() {
    this.later = 1;
  }
}

class MissingInitializer {
  property: string;
}

new MissingInitializer().property.length; // 엄격한 모드가 아닐 시 컴파일 되지만 자바스크립트 런타임에서 에러가 난다. 10억달러짜리 실수!!
```

반대로 엄격한 검사를 오히려 비활성화 해야하는 경우도 발생하는데 그럴때는 해당 값이 null 또는 undefined가 아님을 단언 ! 키워드를 사용한다.

```ts
class ActivitiesQueue {
  pending!: string[];

  initialize(pending: string[]) {
    this.pending = pending;
  }

  next() {
    return this.pending.pop();
  }
}

const activities = new ActivitiesQueue();
activities.initialize(["123", "456", "789"]);
activities.next();
```

### 선택적 속성

있을 수도 있고 없을 수도 있음을 나타내는 ? 키워드도 사용 가능하다. 앞선 예제를 다시 보면

```ts
class MissingInitializer {
  property?: string; // ? 를 추가하면 아래에서 에러가 난다.
}

new MissingInitializer().property.length; // 에러!!, Object is possibly 'undefined' undefined일 수 있기때문에
new MissingInitializer().property?.length; // 하지만 이 코드는 정상 동작
```

### 읽기 전용 속성

앞서 학습했던 내용과 마찬가지로 readonly 키워드를 붙일 수 있다.

```ts
class Quote {
  readonly text: string
  constructor (text: string){
    this.text = ''
  }

  emphasize() {
    this.text = '!' // 에러
  }
}
const quote = new Quote('모든 학생들 안에는 뛰어난 아이가 갇혀 있다(잠재력이 있다는 영문 표현)')
quote.text = "근데 언제 풀려나냐고" //에러,  readonly 이기 때문에.

--------------------------

class RandomQuote {
  readonly exp: string = "집이 최고" // 확장하기 위해서는 타입 annotation이 필요하다.
  readonly imp = "집이 최고"

  constructor() {
    if(Math.random() > 0.5){
      this.exp = '우리는 태어나자마자 배움을 시작한다.' // 문제 없음

      this.imp = '우리는 태어나자마자 배움을 시작한다.' // 에러 Type '"우리는 태어나자마자 배움을 시작한다."' is not assignable to type '"집이 최고"'
      // 근데 막상 에러는 나는데 할당은 되네;
    }
  }
}

const quote = new RandomQuote();
console.log(quote.exp);
console.log(quote.imp);
```

하지만 string으로 확장하기 위해서 선언해주고 안해주고 차이에서 TS가 에러를 출력해주지만 실행은 정상적으로 됐다. 왜냐하면 JS코드로는 아래와 같이 바뀌기 때문이다. 이런 확장은 자주 쓰이지 않지만 유용할떄가 있다.

![Alt text](image-1.png)

## 타입으로서의 클래스

말 그대로 타입처럼 쓸 수 있는 그런 느낌이다.

```ts
class Teacher {
  sayHello() {
    console.log("모험을 해보라");
  }
}

let teacher: Teacher;

teacher = new Teacher();
teacher.sayHello();

teacher = "Waaa"; // 에러, Teacher클래스가 아닌 다른게 할당돼서.

---------------------

class SchoolBus {
  getA() {
    return ["magic", "shapeshifting"];
  }
}

function wSB(bus: SchoolBus) {
  console.log(bus.getA());
}

wSB(new SchoolBus()); // 스쿨버스 클래스를 통째로 넣어주기

wSB({
  //객체 getA를 주는데.. return의 형식이 같으니까 에러가 안나고
  getA: () => ["transmogrification"],
});

wSB({
  // 얘는 형식이 다르니까 에러가 나는건가..?
  getA: () => 123,
});
```

## 클래스와 인터페이스

인터인터페이스로 class에 타입 할당하기

```ts
interface Learner {
  name: string;
  study(hours: number): void;
}

class Student implements Learner {
  name: string; // 필요한 string 선언
  constructor(name: string) {
    this.name = name;
  }
  study(hours: number): void {
    // study도 선언, 매개변수 타입 number, 반환값 명시 안하면 void 알아서. 명확하게 하기 위해 붙여줌
    for (let i = 0; i < hours; i++) {
      console.log(`studying`);
    }
  }
}

class Slacker implements Learner {
  // 에러가 난다. 왜냐하면 아무것도 없기 때문이지
}}

class Stu implements Learner{
  // 아래 코드들도 에러가 난다. 왜냐하면 타입 어노테이션을 지정하지 않았기에 any로 타입 유추를 하기 때문에 지정한 Learner와 값이 달라진다.
  name;
  study(hours){}
}
```

### 다중 인터페이스 구현

클래스에서도 역시 다중 인터페이스를 구현할 수 있다.

```ts
interface Graded{
  grades: number[]
}

interface Reporter{
  report: () => string;
}

class ReportCard implements Graded, Reporter{
  grades: number[];
  constructor(grades: number[]){
    this.grades = grades
  }

  report(){
    return this.grades.join(", ")
  }
}

class NONE implements Graded, Reporter{
  // 얘도 당연히 에러..
  // 안에 아무것도 없으니까
}

-----------------------------------------

interface AgeIsNum {
  age: number;
}

interface AgeIsNotNum{
  age: () => string;
}

// 동일한 이름을 서로 다른 타입으로 선언해서 이것도 저것도 만족시키지 못해서 결국 에러가 난다. 라고 이해했다.
class AsNum implements AgeIsNotNum, AgeIsNum {
  age = 0;

  age() {return ''}
}
```

## 클래스 확장

클래스를 확장하거나 하위 클래스를 만드는 것에 타입을 추가해보자

```ts
class Teacher {
  teach() {
    console.log("규율이 중요하다.");
  }
}

class StudentTeacher extends Teacher {
  learn() {
    console.log("오픈 마인드");
  }
}

const teacher = new StudentTeacher();
teacher.teach();
teacher.learn();
teacher.other(); // 에러 에러 에러, 없는 값이다.
```

할당 가능성 확장. 상속에서도 사용할 수 있다!

```ts
class Lesson {
  subject: string;

  constructor(subject: string) {
    this.subject = subject;
  }
}

class OnlineLesson extends Lesson {
  url?: string;

  constructor(subject: string, url: string) {
    super(subject);
    this.url = url;
  }
}

let lesson: Lesson;
lesson = new Lesson("coding");
lesson = new OnlineLesson("coding", "oreilly.com");

let online: OnlineLesson;
online = new OnlineLesson("coding", "oreilly.com");
online = new Lesson("coding"); // 에러, 이 변수는 url까지 필요한 타입이다. 하지만 이때, 위 url의 타입을 지정할 때 ? 키워드를 넣어주면 선택 속성이 되므로 에러가 사라진다.
```

재정의된 상속자에서 인수를 잘 부여해서 기본생성자를 올바르게 호출하지 않으면 타입오류가 발생한다.

```ts
class Lesson {
  subject: string;

  constructor(subject: string) {
    this.subject = subject;
  }
}

class OnlineLesson extends Lesson {
  constructor() {
    super("subject");
  }
}

class OffLineLesson extends Lesson {
  constructor() {
    // 이건 JS의 문법에서도 에러나는거 아닌감...
    super(123);
  }
}
```

그리고 코드 순서도 중요하다. super()를 호출하고 사용해야한다. 아래 코드는 에러가 난다.

```ts
class Lesson {
  subject: string;

  constructor(subject: string) {
    this.subject = subject;
  }
}

class OnlineLesson extends Lesson {
  url?: string;

  constructor(subject: string, url: string) {
    this.subject = subject; // 순서 바꾸면 오류난다. super를 호출하기전에 잘못 참조하기 때문이다.
    this.url = url;
    super(subject);
  }
}
```

재정의된 메서드

```ts
class GradeCounter {
  countGrades(grades: string[], letter: string) {
    return grades.filter((grade) => grade === letter).length;
  }
}

class FailureCounter extends GradeCounter {
  // 반환타입과 매개변수가 동일해서 문제 X
  countGrades(grades: string[]) {
    return super.countGrades(grades, "F");
  }
}

class AnyFailureChecker extends GradeCounter {
  // 당연히 반환타입이 달라지므로 에러
  countGrades(grades: string[]) {
    return super.countGrades(grades, "F") !== 0; //에러, boolean이니까
  }
}

const counter: GradeCounter = new AnyFailureChecker();

const count = counter.countGrades(["A", "C", "F"]);
```

## 추상 클래스

추상화 클래스.

```ts
abstract class School {
  readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  abstract getStudentsTypes(): string[];
}

class PreSchool extends School {
  getStudentsTypes() {
    return ["preschool"];
  }
}
class Absense extends School {
  // 아무것도 없으면 에러가 난다. 왜냐하면
  // 최상위 School에 존재하는 getStudentsTypes를 구현해야한다. 따라서 에러를 발생시키지 않으려면
  // 아래처럼 getStudentsTypes를 선언해줘야한다. quick fix 제공.
  // getStudentsTypes(): string[] {
  //   throw new Error("Method not implemented.");
  // }
}

let school: School;
school = new PreSchool("유치원");
// 추상 클래스는 클래스의 세부 사항이 채워질것이라고 예상되는 프레임 워크에서 자주 사용된다.
// 아래 코드는 하위 클래스가 아닌 최상위 클래스를 직접 사용해서 에러가 발생한다.
// 이 부분은 추상화 클래스에 대한 지식이 더 필요하겠구만....
school = new School("어딘가");
```

## 멤버 접근성

알다시피

- public(default): 누구나 접근 가능
- protected: 클래스 내부 또는 하위 클래스에서만 접근 가능
- private: 클래스 내부에서만 접근 가능

총 3가지의 접근성이 있다. 그리고 자바스크립트는 클래스 멤버의 이름 앞에 # 키워드를 추가해 private이라는 것을 명시한다.

```ts
class Base{
  isPublicImplicit = 0;
  public isPublicExplicit = 1;
  protected isProtected = 2
  private isPrivate = 3;
  #truePrivate = 4;
}

class SubClass extends Base {
  examples() {
    this.isPublicImplicit;
    this.isPublicExplicit;
    this.isProtected;

    this.isPrivate // 에러, 접근 불가

    this.#truePrivate // 에러, 접근 불가
  }
}

new SubClass().isPublicExplicit
new SubClass().isPublicImplicit
new SubClass().isProtected // 에러, 접근 불가
new SubClass().isPrivate // 에러, 접근 불가
new SubClass().#truePrivate // 에러, 접근 불가

------------------------------------

class TwoKeywords {
  private readonly name: string;

  constructor() {
    this.name = "Kim"
  }

  log() {
    console.log(this.name)
  }
}
const two = new TwoKeywords()
two.name = "Lee" // 에러
```

타입스크립트의 멤버 접근성은 타입 시스템에서만 존재하는 개념이지만 자바스크립트의 private은 런타임에서 존재한다는 `큰` 차이가 있다. 단순히 private, protected로 선언되어도 추후 JS코드로 컴파일하면 public으로 컴파일되는데 # 키워드를 사용하면 진정한 private로 사용이 가능하다.

?? 이해 안되는 텍스트 `타입스크립트의 이전 멤버 접근성 키워드를 자바스크립트의 # private 필드와 함께 사용할 수 없다는 점을 기억하세요` 걍 두개를 같이 쓰지 말라는건가?

#### static 키워드

static으로 클래스 자체에 멤버를 선언해보자. static과 readonly, 접근성 제한자를 잘 사용하면 외부에 의해서 접근되거나 수정되는 현상을 막을 수 있다.

```ts
class Question {
  protected static readonly answer: "bash";
  protected static readonly prompt = "니가 제일 선호하는 언어가 뭐야?";

  guess(getAnswer: (prompt: string) => string) {
    const answer = getAnswer(Question.prompt);

    if (answer === Question.answer) {
      console.log(`OK`);
    } else {
      console.log("Wrong!");
    }
  }
}

Question.answer; // Property 'answer' is protected and only accessible within class 'Question' and its subclasses.
```
