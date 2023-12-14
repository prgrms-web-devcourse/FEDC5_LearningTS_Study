# Todo_TypeScript

## 실행

```
npm run dev
```

<br/>

## 📌 프로젝트 설명

- VanillaJS로 구현했던 간단 Todo App을 **TypeScript**로 마이그레이션

<br/>

## 👩‍💻 개발 과정

| 트러블 슈팅 & 질문

### 'new' expression, whose target lacks a construct signature, implicitly has an 'any' type.

매번 새로운 인스턴스를 생성해야하는 컴포넌트를 제외한 컴포넌트 들에선 new 키워드 없이 호출 가능했다.
인스턴스를 받아서 해당 인스턴스를 통해 내부 함수에 접근해야하는 컴포넌트인 경우에, new 키워드 사용시 위와 같은 에러 발생

해결한 방법: 내부에 함수로 선언하고 export 한다.

### 왜 state 갱신을 또 해줘야할까?

App.ts 19

###

### 이벤트핸들러의 파라미터 타입

<br/>
<br/>

## 👍 시도한 것 & 배운 것

- 요소 추가에 있어서 appendChild()와 before() 사용

## 🤨 추가할 것

css(scss)
