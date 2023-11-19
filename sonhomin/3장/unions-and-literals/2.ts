// Please clarify any overly wide (permissive) type annotations here! ✨
let difficulty: 1 | 2 | 3;
let group: "appetizer" | "entree" | "dessert";
// 가능한 값은 3개만 존재하도록
let title: string;

// Start with something quick and painless to prepare...
difficulty = 1;
group = "appetizer";
title = "Raspberry Vinaigrette Salad";
console.log(`[${group}] ${title}: ${difficulty}/3 difficulty`);

// Next up, a nice hearty dish to center the meal...
difficulty = 2;
group = "entree";
title = "Cauliflower Steaks";
console.log(`[${group}] ${title}: ${difficulty}/3 difficulty`);

// Make a real impact with fancy delectable desserts...
difficulty = 3;
group = "dessert";
// 오타해결
title = "Coconut Chocolate Ganache";
console.log(`[${group}] ${title}: ${difficulty}/3 difficulty`);

// Send everyone off with a nice closer.
difficulty = 1;
group = "dessert";
title = "Biscuits and Coffee";
console.log(`[${group}] ${title}: ${difficulty}/3 difficulty`);

export {};
