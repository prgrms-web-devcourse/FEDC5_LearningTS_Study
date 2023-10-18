const validation = {
  newTarget(target) {
    if (!target) {
      throw new Error("You must use new keyword");
    }
  },
};

export default validation;
