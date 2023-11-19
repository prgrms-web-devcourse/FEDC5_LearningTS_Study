// 최용재
// Write your Bird type here! ✨
type Bird = {
	diet: "omnivore" | "carnivore";
	name: string;
	dangerous?: boolean;
	noisy?: boolean;
	intelligent?: boolean;
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
