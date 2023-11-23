// 43・Exclude
// extends 키워드는 만능이여...

// T에서 U를 빼야한다. T - U
type MyExclude<T, U> = T extends U ? never : T;

//<'a' | 'b' | 'c', 'a'> // 'b' | 'c'
// 예제 코드를 보면
// 위에서 T는 'a' | 'b' | 'c', U는 'a'
// 'a' extends 'a'는 참이므로 타입이 never로 바뀌어 'a'는 제외되고
// 따라서 ExcludedType은 'b' | 'c'가 된다.
