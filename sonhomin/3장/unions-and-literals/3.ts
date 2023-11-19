// Please fill in any missing type annotations here...
const headOfTable = "Me!";
let adjacentLeft: "Susie" | "Tommy";
let adjacentRight: "Susie" | "Tommy";
let furtherLeft: "Angelica" | "Chuckie" | undefined;
let furtherRight: "Timmy" | "Kimi" | "Chuckie" | undefined;

// I always invite Susie and Tommy! ♥
if (Math.random() > 0.5) {
  adjacentLeft = "Susie";
  adjacentRight = "Tommy";
} else {
  adjacentLeft = "Tommy";
  adjacentRight = "Susie";
}

// I invite Angelica about half of the time. We're not as close as Susie and Tommy. It's a long story.
// I try to fill `furtherLeft` first...
if (Math.random() > 0.5) {
  furtherLeft = "Angelica";
}
// 안젤리카를 앉히겠다.

// Same with Chuckie. I like them, but do I *really* like hanging out with them? Only sometimes.
// ...then after that `furtherRight`
if (Math.random() > 0.5) {
  if (furtherLeft) {
    // 여기서 오류가 발생하는데 undefined로 선언해줘야 해결됨
    furtherRight = "Chuckie";
  } else {
    furtherLeft = "Chuckie";
  }
}

// If I invited Angelica but not Chuckie, I'll invite Kimi. They get along well with Angelica but not Chuckie.
if (furtherLeft === "Angelica" && furtherRight !== "Chuckie") {
  furtherRight = "Kimi";
}

// If I invited Chuckie but not Angelica, I'll invite Timmy. They get along well with Chuckie but not Angelica.
if (furtherLeft === "Chuckie") {
  furtherRight = "Timmy";
}

console.log(`At the head of the table is... ${headOfTable}`);

console.log(`Adjacent to the left is: ${adjacentLeft}`);
console.log(`Adjacent to the right is: ${adjacentRight}`);

console.log(`Further down on the left is: ${adjacentLeft ?? "nobody"}`);
console.log(`Further down on the right is: ${adjacentRight ?? "nobody"}`);

export {};

// 리터럴 타입만 사용해라.
// 문자열 유형을 전혀 사용하지 말아라.
