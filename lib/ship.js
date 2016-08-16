const Util = require("./utils.js");
const MovingObject = require("./moving_object.js");
const Game = require("./game.js");

function Ship(options) {
  const defaultOptions = {color: Ship.COLOR, radius: Ship.RADIUS, vel: [0,0]};
  MovingObject.call(this, Object.assign(defaultOptions, options));

}
Ship.RADIUS = 8;
Ship.COLOR = "#00FF40";


Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function() {
  this.pos = this.game.randomPosition();
  this.vel = [0, 0];
};

Ship.prototype.power = function(impulse){
  
};

module.exports = Ship;
