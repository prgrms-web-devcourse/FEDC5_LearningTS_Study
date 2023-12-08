# 개발과정 기록용 Flow.md

Rule<br />
개발 시작 시 시간 기록 ## 키워드로<br />
개발 중 발생한 문제는 ### 키워드로 구분

---

## 23.12.09 00:00

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
