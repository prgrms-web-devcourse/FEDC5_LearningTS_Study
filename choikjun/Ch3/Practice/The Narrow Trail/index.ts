export function runCommands() {
	// Declare your variables and runtime logic here! ✨
	let resource: "food" | "water" | undefined;
	let food = 5;
	let water = 5;

	for (let day = 1; day < 8; day++) {
		const dice = Math.floor(Math.random() * 6) + 1; // 1 ~ 6 숫자

		if (dice === 1) {
			resource = "food";
			food--;
			water--;
		} else if (dice === 2) {
			resource = "water";
			food--;
			water--;
		} else {
			if (!resource) {
				resource = dice % 2 === 0 ? "food" : "water";
				food--;
				water--;
			} else {
				if (resource === "food") {
					food += dice - 1;
					water--;
					resource = undefined;
				} else {
					water += dice - 1;
					food--;
					resource = undefined;
				}
			}
		}

		if (food === 0 || water === 0) {
			return false;
		}
	}

	return true;
}
