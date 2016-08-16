const Game = require('./game.js');

function MovingObject(options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
}

MovingObject.prototype.draw = function(ctx) {
  let canvas = document.getElementById('canvas');
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();

  }
};

MovingObject.prototype.move = function () {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  this.pos = this.game.wrap(this.pos);
};

MovingObject.prototype.isCollidedWith = function (otherObject) {
  const xDiff = this.pos[0] - otherObject.pos[0];
  const yDiff = this.pos[1] - otherObject.pos[1];
  const distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
  return (distance - (this.radius + otherObject.radius) < 0);
};

MovingObject.prototype.collideWith = function(otherObject) {
  
};

module.exports = MovingObject;
