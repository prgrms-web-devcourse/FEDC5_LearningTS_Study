// Put your Robot and Humanoid classes here! ✨
// See ./original.js for their older JavaScript code.
// 2. Prototypes to Classes
// 최용재
class Robot {
	constructor(name, abilities) {
		this.name = name;
		this.abilities = abilities;
		this.power = 100;
	}

	announce() {
		console.log(`Greetings. I am ${this.name}.`);

		for (const ability of this.abilities) {
			console.log(`I am able to ${ability}.`);
		}
	}
	charge(amount) {
		if (this.power < 100) {
			this.power = Math.min(this.power + amount, 100);
			console.log(`Recharged power supplies to ${this.power}.`);
		}

		if (this.power === 100) {
			console.log("I am at optimal operational capacity.");
		}
	}

	move(distance) {
		if (this.power < distance) {
			console.log(`I do not have enough power to move ${distance} units.`);
		} else {
			console.log(`Moving ${distance} units.`);
			this.power -= distance;
		}
	}
}

class Humanoid extends Robot {
	constructor(name, abilities, catchphrase) {
		super(name, abilities);
		this.catchphrase = catchphrase;
	}

	announce() {
		super.announce();
		console.log(` > ${this.catchphrase} <`);
	}
}
module.exports.Humanoid = Humanoid;
module.exports.Robot = Robot;
