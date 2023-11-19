// 01 Syntactic Sugar Practice
// 최용재

// Put your announceMachines function here! ✨
// See ./original.js for its older JavaScript code.

function announceMachines(announce, ...machines) {
	let labelsCount = 0;

	for (const machine of machines) {
		let label;

		if (machine.label) {
			label = machine.label;
			labelsCount += 1;
		} else {
			label = `Make: ${machine.make}; Model: ${machine.model}`;
		}

		announce(label);
	}

	return labelsCount;
}

module.exports.announceMachines = announceMachines;
