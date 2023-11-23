//  898・Includes
// type Includes<T extends readonly any[], U> = T extends U ? true : false // 몇 가지 동작에서 이상하게 동작함, 숫자랑 문자열에서

// ...일단 infer 키워드
type MyEqual<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;

type Includes<T extends readonly any[], U> = T extends [infer First, ...infer Rest]
  ? MyEqual<First, U> extends true
    ? true
    : Includes<Rest, U>
  : false;
