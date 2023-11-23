// 3312・Parameters
// infer에 대한 이해가 있었더라면 더 빠르고 쉽게 풀었을 것 같은 문제
type MyParameters<T extends (...args: any[]) => any> = T extends (...any: infer S) => any ? S : never;

// ...any: infer S 이 부분에서 함수 타입의 매개변수들을 추출한다. << 요기가 제일 이해가 안된다.
// infer 키워드는 매개변수들의 타입을 추론하고, S에 그 타입을 할당한다.
// 이후 T가 함수타입이라면 S를 반환하고 아니라면 never를 반환한다.
