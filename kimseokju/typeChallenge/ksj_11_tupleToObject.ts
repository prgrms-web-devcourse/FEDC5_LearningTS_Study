// 이거 쉬움...맞지..? 그치..?
// 답이랑 근접했는데 T[?] ? 에 뭘 넣어야하는지 몰라서 걍 정답봄
type TupleToObject<T extends readonly any[]> = {
  [K in T[number]]: K;
};

/*
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

type result = TupleToObject<typeof tuple> // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
 
*/

// 예제를 통한 해석 가보자
/*
    자 일단 아래 코드는 type TupleToObject를 선언하는데
    입력 타입 제네릭 T는 any, 즉 어떤 타입을 가지고 있던 일단 배열이여야한다.
    type TupleToObject<T extends readonly any[]> = {
    
    그 다음 코드는 자 일단 T는 튜플타입이고 T[number]은 모든 원소에 대한 유니언 타입을 나타낸다.
    여기서 T가 ['tesla', 'model 3', 'model X', 'model Y'] << 이런 식의 배열이니까
    T[number]은 'tesla' | 'model 3' | 'model X' | 'model Y' 요렇게 된다.
    그리고 in 키워드를 사용해서 반복을 진행하고 여기서 새로운 속성을 K에 할당한다.
    그리고 각 반복에서 새로운 속성은 K 로 할당된다.
    [K in T[number]]: K;

    즉 여기서는 'tesla', 'model 3', 'model X', 'model Y' << 요 값들을 한번씩 순회하는데
    해당 값을 새로운 속성인 K로 정의해서 할당해주니까 
    'tesla' : 'tesla',
    'model 3' : 'model 3',
    'model X' : 'model X',
    'model Y' : 'model Y'
    요렇게 나온다.
*/
