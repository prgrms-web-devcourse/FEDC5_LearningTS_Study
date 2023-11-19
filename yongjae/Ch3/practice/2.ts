// 최용재

export function runCommands() {
	// Declare your variables and runtime logic here! ✨

	let availableResource: "food" | "water" | undefined;
	let day = 1;
	let food = 5;
	let water = 5;

	const diceRoll = () => {
		return Math.floor(Math.random() * 6) + 1;
	};
	while (day <= 7) {
		const randomNumber = diceRoll();
		let command: "finish" | "food" | "water" | number;
		switch (randomNumber) {
			case 1:
				command = "food";
				break;
			case 2:
				command = "water";
				break;
			default:
				command = randomNumber;
				break;
		}
		if (typeof command === "number") {
			switch (availableResource) {
				case "food":
					food += command;
					availableResource = undefined;
					break;
				case "water":
					water += command;
					availableResource = undefined;
					break;
				default:
					availableResource = randomNumber % 2 ? "water" : "food";
					break;
			}
		}

		switch (command) {
			case "food":
				availableResource = "food";
				break;
			case "water":
				availableResource = "water";
				break;
		}

		food -= 1;
		water -= 1;
		if (food === 0 || water === 0) {
			return false;
		}
		day += 1;
	}
	return true;
}
