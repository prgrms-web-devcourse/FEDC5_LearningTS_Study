// 189・Awaited
// 별 백만개 답을 봐도 모르겠싐...
type MyAwaited<T> = T extends PromiseLike<infer TYPE> ? MyAwaited<TYPE> : T;

// type MyAwaited<T extends PromiseLike<any>> = T extends PromiseLike<infer K>
//   ? K extends Promise<any>
//     ? MyAwaited<K>
//     : K
//   : never;

// 유틸리티 사용을 할 때 많이 사용하는 코드이다.
