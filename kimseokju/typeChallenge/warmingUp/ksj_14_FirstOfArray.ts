// 이번에는 머리를 썼다. type cases에 입력 예제를 좀 참조하면서 풀이했다.

// 배열이 빈 값이라면 당연히 타입은 모르는 거 아닌가? 하고 unknown을
// 입력했는데 type cases에서 에러를 출력했다.
// type First<T extends any[]> =  T extends [] ? unknown : T[0]

// 그래서 그거 보고 바꿨다.
type First<T extends any[]> = T extends [] ? never : T[0];

/*
  // 예제를 통한 해석을 해보자 
  type arr1 = ['a', 'b', 'c']

  type head1 = First<arr1> // expected to be 'a'

  위 코드에서 일단 head1이 실행되게 되면 First
*/

/*
type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type head1 = First<arr1> // expected to be 'a'
type head2 = First<arr2> // expected to be 3

type First<T extends any[]> = T extends [] ? never : T[0];

const vari:head1 = 'ab'
console.log(vari)

위와 같은 코드를 실행해봤는데 에러가 난다. 이 코드를 실행해본 이유는
vari에 할당되는 타입이 'a'일까 아니면 string일까에 대한 의문이였는데
a가 할당된다. 그렇다면 여기서 'a'가 아닌 string에 할당되게 하려면?

아래와 같이 간단하게 string으로 해줘도 되지만
type First<T extends any[]> = T extends [] ? never : string;

// 요런 방식도 있다.
type First<T extends any[]> = T extends [] ? never : (T[0] extends string ? string : number);

조금 더 깊게 알아봤는데
TypeScript에서는 타입스크립트의 타입 시스템이 런타임에 있는 값의 타입에 접근하는 것을 지원하지 않는다. 
컴파일러는 T[0]의 타입이 무엇인지 알 수 있지만, 우리는 이 정보에 접근할 수 없다..

*/
