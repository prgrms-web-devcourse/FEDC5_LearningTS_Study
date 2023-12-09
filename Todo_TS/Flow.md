# 개발과정 기록용 Flow.md

Rule<br />
개발 시작 시 시간 기록 ## 키워드로<br />
개발 중 발생한 문제는 ### 키워드로 구분

**목표**<br />

- 이유 있는 코드 작성
- 타입스크립트 관련 strict모드 유지 및 사소한 부분에서도 타입 일단 작성해두기
- 클린코드의 개념 생각하면서 `가독성 높고 유지보수가 용이한 코드 형태`로 코딩하기

---

## 2023.12.09 0000

### main.ts new 키워드 문제 해결

main.ts에서 new 키워드를 붙이면 에러.<br />
하지만 클래스형이 아닌 함수형이므로 new 키워드를 제거해도 상관 없을 것이라고 생각.

### Header.ts new키워드 문제 해결

아래와 같이 선언하니 new 키워드도 필요없고 에러도 없음.

다만 왜? 이렇게 동작 가능한지 알아내야함

```ts
const Header = ({ $target, text }: HeaderParamsType) => {
    ... 중략
};

export { Header };

```

## 2023.12.09 1330

### initialState를 정의하던 중 만약 리스트가 없는 경우?

타입을 정의하던 중 만약 투두리스트가 없다면 [] 형태로 initialState가 들어온다는 것을 확인했다. 이때 any[]를 써야하는데 이러면 다른 값에 대한 처리가 불분명해지지 않나?

```ts
export type StateType = EachStateType[];

export type EachStateType = {
  text: string;
  isCompleted: boolean;
};

export type TodoListParamsType = {
  $target: HTMLElement | null;
  initialState: StateType | any[];
  toggleCheck: (id: number) => void;
  removeFunction: (id: number) => void;
};
```

### const = () => 함수 표현식에서의 의문점

코드 주석 내부에서 서술

```ts
// App.ts에서 아래 함수를 실행하면 TodoList내부의 state가 바뀐다.
// 심지어 바뀌는 것을 console.log로 확인했는데
// 막상 데이터를 또 갱신하면 해당 데이터가 올바로 갱신되지 않는 현상이 있었다.
todoList.setState(nextState);

// 결론부터 서술하면
// 아래와 같이 todoList.state를 직접 바꿔줬어야했다.
// 근데 이러면 setState의 개념이 모호해지는 문제가 생긴다 => 렌더핸들러 정도로 바꾸면 좋을 것 같고
// 그리고 왜 이런 현상이 나타나는지 정확하게 이해하지 못했다.
todoList.setState(nextState);
todoList.state = nextState;
// `추측`을 해보자면 new의 개념이 아닌 기존에 가져왔던 todoList의 최초 initialState가 바뀌지 않는 부분과 연관있을 것 같은데
// 자세히는 모르겠다.
```

더욱 이해가 안가는건 다른 코드들에서는 문제가 없었다.

### 2023.12.09 1600 기본 요구사항 변경 완료

추후 희망구현사항 체크리스트

- [x] initialState의 any로 선언된 부분 any키워드가 아닌 것으로 수정하기
- [x] scss를 활용한 css 전처리 과정 설정
- [ ] Babel 세팅
- [ ] Jest를 통한 테스트 과정 추가
- [ ] 해야할 일, 다 한 일, 전체 필터링 기능 추가
- [ ] 제네릭 형태로 리팩토링

PR은 월요일 코어타임 시작 후 진행
