//  18・Length of Tuple
// 일단 배열체크

// type Length<T extends any[]> = T["length"];

type Length<T extends readonly any[]> = T["length"];

/*
  일단 문제의 의도를 잘 맞춰서 기분 좋았던 문제
  자 배열이 들어오면? extends any[] 를 해서 배열인지 체크해줍시다.
  그리고 T << 제네릭의 길이를 구하는 방법은 TupleLength 밖에 없다고 한다.
  T['length']로 선언해서 구했는데 위 코드는 에러가 났다.
  type cases를 확인해보니 readonly를 붙이라카더라...
*/
