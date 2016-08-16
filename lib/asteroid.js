const Util = require("./utils.js");
const MovingObject = require("./moving_object.js");
const Ship = require("./ship.js");

function Asteroid(options) {
  const defaultOptions = {color: Asteroid.COLOR, radius: Asteroid.RADIUS, vel: Util.randomVec(Asteroid.VEL * Math.random())};
  MovingObject.call(this, Object.assign(defaultOptions, options));
}

Asteroid.COLOR = "#FF00BF";
Asteroid.RADIUS = 15;
Asteroid.VEL = 5;

Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;

Asteroid.prototype.collideWith = function(otherObject) {
  if ((otherObject instanceof Ship)) {
    otherObject.relocate();
  }
  else {
    this.game.remove(otherObject);
    this.game.remove(this);
  }
};

// console.log(Util.randomVec(3));
