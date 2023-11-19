// Write your Bird type here! ✨

// 조류를 구분할 수 있게 개체 유형을 작성
// 문자열인 이름 외에 모든 속성은 문자열 리터럴의 유니온 조합

type Bird = {
  name: string;
  diet: "carnivore" | "omnivore";
  intelligent?: boolean;
  noisy?: boolean;
  dangerous?: boolean;
};

export const birds: Bird[] = [
  {
    dangerous: true,
    diet: "omnivore",
    name: "White-Throated Magpie-Jay",
    noisy: true,
  },
  {
    diet: "omnivore",
    intelligent: true,
    name: "Eurasian Magpie",
  },
  {
    diet: "carnivore",
    name: "Yellow-Billed Blue Magpie",
    noisy: true,
  },
  {
    intelligent: true,
    diet: "omnivore",
    name: "American Crow",
  },
];
