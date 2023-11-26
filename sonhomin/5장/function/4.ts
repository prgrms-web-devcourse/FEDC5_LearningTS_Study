// Write your createCodeCracker function here! ✨
// You'll need to export it so the tests can run it.

// 주방관리 소프트웨어 디지털 화

/**
 * 1. 함수를 포함하는 내부 객체를 반환하는 createKitchen 함수를 구현해라
 * 2. 초기예산 , 두가지 기능을 매개변수로
 * 3. cleaner : dirt, time(?) 필요함 => 남은먼지반환
 * 4. supplier : expense 파라미터
 * 5. supplier 에서 반환하는 것은 stock의 각 재료
 *
 * 6. announce 문자열을 반환하는 함수 => #은 각 숫자로 대체
 *  "I have # much dirt, # budget, # bread(s), # fruit(s), # sauce(s), and # vegetable(s)."
 *
 * 7. clean함수는 기존먼지양 + 시간을 넣어서 먼지양을 반환
 *
 * 8. purchase  : expense 금액을 입력받고 예산이 충분하면 supplier호출하고 재고증가
 * 9.
 */

type stock = {
  bread: number;
  fruit: number;
  sauce: number;
  vegetable: number;
};
type cleaner = (dirt: number, time?: number) => number;
type Supplier = (expense: number) => stock;

function createKitchen(budget: number, cleaner: cleaner, supplier: Supplier) {
  let dirt: number = 0;
  const stock: stock = {
    bread: 0,
    fruit: 0,
    sauce: 0,
    vegetable: 0,
  };
  return {
    announce() {
      return `I have ${dirt} much dirt, ${budget} budget, ${stock.bread} bread(s), ${stock.fruit} fruit(s), ${stock.sauce} sauce(s), and ${stock.vegetable} vegetable(s).`;
    },
  };
}
