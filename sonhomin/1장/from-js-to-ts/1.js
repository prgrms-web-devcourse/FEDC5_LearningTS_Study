function announceMachines(announce, ...args) {
  let label;
  let labelsCount = 0;

  for (const machine of args) {
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
