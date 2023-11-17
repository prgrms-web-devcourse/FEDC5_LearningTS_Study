// test 왜틀릴까요 .....

/*
7일 후 food와 water 둘다 남아있어야한다.
매일 1~6의 랜덤 수를 생성한다.
그 숫자에 따라 그날의 명령이 생긴다.
3~6 :  available값 설정 안되어있으면 even(짝)-food , 홀-water
설정되어있으면 숫자만큼 늘리고 available값 해제
그리고 Fodd,water 모두 -1. 한쪽이라도 0되면 return false
7일 지속하면 Return true
*/
export function runCommands() {
  // Declare your variables and runtime logic here! ✨
  let available: string | undefined;
  let food: number = 5;
  let water: number = 5;

  for (let day = 1; day <= 7; day++) {
    const randomNumber = Math.ceil(Math.random() * 6);
    switch (randomNumber) {
      case 1:
        available = "food";
        break;
      case 2:
        available = "water";
        break;
      default:
        switch (available) {
          case "food":
            available = undefined;
            food += randomNumber;
            break;
          case "water":
            available = undefined;
            water += randomNumber;
            break;
          default: // available 설정값 없는 경우
            if (randomNumber % 2 === 0) {
              available = "food";
            } else {
              available = "water";
            }
            break;
        }
        break;
    }
    food -= 1;
    water -= 1;
    if (food === 0 || water === 0) {
      return false;
    }
  }
  return true;
}
