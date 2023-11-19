export function runCommands() {
	// Declare your variables and runtime logic here! ✨
	let availableResource: "food" | "water" | any;
	let Day: number = 1;
	let foodAsset: number = 5;
	let waterAssat: number = 5;

	// 7일간 진행하는 게임, 랜덤 1~6
	for (Day; Day < 8; Day++) {
		const generateRandomNumber = Math.round(Math.random() * 6) + 1;
		let caseChecker: any;

		if (generateRandomNumber === 1) {
			caseChecker = "food";
		} else if (generateRandomNumber === 2) {
			caseChecker = "water";
		} else {
			caseChecker = generateRandomNumber;
		}

		if (typeof caseChecker === "number") {
			switch (availableResource) {
				case "food":
					foodAsset += caseChecker;
					availableResource = undefined;
					break;

				case "water":
					waterAssat += caseChecker;
					availableResource = undefined;
					break;

				default:
					availableResource = generateRandomNumber % 2 === 0 ? "food" : "water";
					break;
			}
		}
		switch (caseChecker) {
			case "food":
				availableResource = "food";
				break;

			case "water":
				availableResource = "water";
				break;
		}

		foodAsset -= 1;
		waterAssat -= 1;

		if (foodAsset === 0 || waterAssat === 0) {
			return false;
		}
	}

	return true;
}
