/*
function Robot(name, abilities) {
	this.name = name;
	this.abilities = abilities;
	this.power = 100;
}

Robot.prototype.announce = function announce() {
	console.log("Greetings. I am " + this.name + ".");

	for (var i = 0; i < this.abilities.length; i += 1) {
		console.log("I am able to " + this.abilities[i] + ".");
	}
};

Robot.prototype.charge = function charge(amount) {
	if (this.power < 100) {
		this.power = Math.min(this.power + amount, 100);
		console.log("Recharged power supplies to " + this.power + ".");
	}

	if (this.power === 100) {
		console.log("I am at optimal operational capacity.");
	}
};
Robot.prototype.move = function move(distance) {
	if (this.power < distance) {
		console.log("I do not have enough power to move " + distance + " units.");
	} else {
		console.log("Moving " + distance + " units.");
		this.power -= distance;
	}
};
*/

// ES2015이전엔 클래스가 없어서 생성자로 객체를 생성한다
// ES2015이후 클래스를 사용하면, 클래스 내부 메소드로 prototype에 저장할 수 있다.

class Robot {
  constructor(name, abilities) {
    this.name = name;
    this.abilities = abilities;
    this.power = 100;
  }
  announce() {
    console.log("Greetings. I am " + this.name + ".");

    for (var i = 0; i < this.abilities.length; i += 1) {
      console.log("I am able to " + this.abilities[i] + ".");
    }
  }
  charge(amount) {
    if (this.power < 100) {
      this.power = Math.min(this.power + amount, 100);
      console.log("Recharged power supplies to " + this.power + ".");
    }

    if (this.power === 100) {
      console.log("I am at optimal operational capacity.");
    }
  }
  move(distance) {
    if (this.power < distance) {
      console.log("I do not have enough power to move " + distance + " units.");
    } else {
      console.log("Moving " + distance + " units.");
      this.power -= distance;
    }
  }
}

/*
function Humanoid(name, abilities, catchphrase) {
	Robot.apply(this, [name, abilities]);
	this.catchphrase = catchphrase;
}
for (var i in Robot.prototype) {
	if ({}.hasOwnProperty.call(Robot.prototype, i)) {
		Humanoid.prototype[i] = Robot.prototype[i];
	}
}
/////이게 확장(상속)의 코드일까..?
Humanoid.prototype.announce = function announce() {
	Robot.prototype.announce.apply(this);
	console.log(" > " + this.catchphrase + " <");
};
*/

// Humanoid안에서 Robot객체에 name, abilities를 넘기므로 확장을 써야한다
class Humanoid extends Robot {
  constructor(name, abilities, catchphrase) {
    super(name, abilities);
    this.catchphrase = catchphrase;
  }
  announce() {
    // super(this.announce) 아니고
    super.announce(); // 이렇게임,, (객체 초기자표기법)
    console.log(" > " + this.catchphrase + " <");
  }
}

module.exports.Humanoid = Humanoid;
module.exports.Robot = Robot;
