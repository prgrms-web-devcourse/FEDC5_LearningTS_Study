export function runCommands() {
  // Declare your variables and runtime logic here! ✨
  let next: "food" | "water" | undefined;
  let food = 5;
  let water = 5;

  for (let day = 1; day <= 7; day += 1) {
    const random = Math.floor(Math.random() * 6) + 1;
    let command: "food" | "water" | number;

    switch (random) {
      // 주사위가 1이면 음식 , 2이면 물 3~6인경우 랜덤 3~6을 대입
      case 1:
        command = "food";
        break;
      case 2:
        command = "water";
        break;
      default:
        command = random;
        break;
    }

    if (typeof command === "number") {
      switch (next) {
        case "food":
          food += command;
          next = undefined;
          break;
        case "water":
          water += command;
          next = undefined;
          break;
        default:
          next = random % 2 === 0 ? "food" : "water";
          // 짝수인경우 음식, 홀수인경우 물
          break;
      }
    }

    switch (command) {
      case "food":
        next = "food";
        break;
      case "water":
        next = "water";
        break;
    }

    // 물 음식 1씩 감소
    food -= 1;
    water -= 1;

    if (food === 0 || water === 0) {
      return false;
      // 사먕
    }
  }
  return true;
  // 생존
}
