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

더욱 이해가 안가는건 다른 코드들에서는 setState만 사용했었는데 문제가 없었다.

### 2023.12.09 1600 기본 요구사항 변경 완료

## 2023.12.09 2330

### Babel 세팅 시도

크로스 브라우징, 브라우저 버전 호환성을 위한 Babel 세팅을 시도했다. 하지만 여러가지 이유로 포기했는데

1. Vite에서 제대로 지원이 안되는 듯한 뉘앙스의 글들이 많았다.<br />
   Vite에서는 따로 지원하는 방법이 있는 것 같았고, 그래서 Babel을 쓰려면 `vite-plugin-babel
`을 사용해야 했는데, 현재 Vite버전과 호환이 되지 않아 종속성 문제가 발생했다.

2. 그래서 Vite의 방식으로 시도해볼까 했지만 잘 모르는 분야이기도 하고 투자 리소스 대비 얻어가는 것이 없다고 판단해서 중단하였다.

### JEST 설정

새로 설치한 패키지는 다음과 같다. `jest`, `ts-jest`, `ts-node`, `jest-environment-jsdom`, `identity-obj-proxy`, `@types/jest`, `@testing-library/jest-dom`, `@testing-library/dom`를 설치했다.

이후 `jest.config.ts` 파일을 만들어서 테스트 관련 설정을 세팅해주었고 `package.json`과 `tsconfig.json`에도 관련 내용을 업데이트 시켜 반영해주었다.

#### 이슈1. "jest import style.css error" 에러

말 그대로 테스트를 하던 도중 css파일을 Import하는 과정에서 에러가 발생하였다.<br />
원인은 Jest가 CSS파일을 마치 JS 파일처럼 Import하려고 시도해서 발생하였다. CSS import는 `import "./style.css";` 이런 형식으로 진행되었기에, 에러가 발생했고 해당 부분에 대한 예외 설정을 진행해주어야 했다.

여러 해결 방법이 있었지만 가장 최신의 방법은 `identity-obj-proxy`라는 개발 종속성 패키지를 설치, 불러와서 `jest.config.ts`파일에서 예외처리하는 코드를 입력해주면 됐다.

```ts
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
  },
```

참고한 [레퍼런스 주소](https://stackoverflow.com/questions/76928821/module-testing-library-react-has-no-exported-member-waitfor)

#### 이슈2. "window is not defined" 에러

테스트 옵션에서 테스트 환경을 `node`로 설정했더니 해당 문제가 발생했다. 처음에는 이 [레퍼런스](https://stackoverflow.com/questions/46274889/jest-test-fails-with-window-is-not-defined)의 방식 처럼 jest.config.ts에 global 설정 코드를 추가해서 해결하려고 했으나, 추후 발생하는 문제로 인해서 결국 테스트 환경을 `jsdom`으로 바꾸면서 자연스럽게 해결되었다.

#### 이슈3. "document is not defined" 에러

이 에러 역시도 테스트 환경을 `node`로 설정한 탓인 것 같았다. 관련 내용을 검색해서 [레퍼런스](https://github.com/testing-library/react-testing-library/issues/422)를 살펴보니 결국 jsdom으로 바꿔야하는 것이 정답처럼 느껴졌고, `npm install -D jest-environment-jsdom`을 통해서 해당 개발 종속성 패키지를 설치해주고 테스트 환경을 `jsdom`으로 바꾸어 문제를 해결했다.

#### 이슈4. Jest 사용 경험 부재로 인한 각종 에러

이 이슈는 사용 경험의 부족으로 인한 문제점들로 검색하면 충분히 찾을 수 있는 쉬운 내용...이기에 기술하지 않는다.

---

추후 희망구현사항 체크리스트

- [x] initialState의 any로 선언된 부분 any키워드가 아닌 것으로 수정하기
- [x] scss를 활용한 css 전처리 과정 설정
- [ ] ~~Babel 세팅~~<br />
      제한된 지식과 시간으로 세팅할 수 없을 것 같았다. 애초에 vite에서 정식으로 지원하지 않는듯한 뉘앙스가 있었다. 또한 버전 차이로 인한 패키지 종속성 문제도 발생했기에 중단하였다.
- [x] Jest를 통한 테스트 과정 추가
- [ ] ~~해야할 일, 다 한 일, 전체 필터링 기능 추가~~<br />
      리액트 강의가 밀려서 제외했다.

- [ ] 제네릭 형태로 리팩토링

~~PR은 월요일 코어타임 시작 후 진행~~
아마 다시 확인하기 힘들 것 같아서 준비되는대로 올리기
