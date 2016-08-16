const Asteroid = require('./asteroid.js');
const Ship = require('./ship.js');
function Game() {
  this.asteroids = [];
  this.ship = new Ship({pos: [Game.DIM_X/2, Game.DIM_Y/2], game: this});
  this.addAsteroids();
}
Game.DIM_X = 800;
Game.DIM_Y = 800;
Game.NUM_ASTEROIDS = 100;

Game.prototype.addAsteroids = function() {
  for(let i=0; i < Game.NUM_ASTEROIDS; i++){
    this.asteroids.push(new Asteroid({pos: this.randomPosition(), game: this}));
  }
};

Game.prototype.randomPosition = function() {
  return [Game.DIM_X * Math.random(), Game.DIM_Y * Math.random()];
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, 800, 800);
  this.allObjects().forEach(mover => mover.draw(ctx) );
};

Game.prototype.moveObjects = function(ctx) {
  this.allObjects().forEach(mover => mover.move() );
};

Game.prototype.wrap = function(pos) {
  let x =  pos[0] % Game.DIM_X;
  let y =  pos[1] % Game.DIM_Y;
  x < 0 ? x += Game.DIM_X : x;
  y < 0 ? y += Game.DIM_Y : y;
  return [x, y];
};

Game.prototype.allObjects = function(){
  return this.asteroids.concat([this.ship]);
};

Game.prototype.checkCollisions = function () {
  this.asteroids.forEach((mover, idx1) => {
    this.allObjects().forEach((otherMover, idx2) => {
      if (mover !== otherMover && mover.isCollidedWith(otherMover)) {
        // alert("COLLISION");
        mover.collideWith(otherMover);
      }
    });
  });
};

Game.prototype.step = function(){
  this.moveObjects(this.ctx);
  this.checkCollisions();
};

Game.prototype.remove = function(obj){
  const newArr = [];
  this.asteroids.forEach(asteroid => {
    if (obj !== asteroid)
      newArr.push(asteroid);
  });
  this.asteroids = newArr;
};

module.exports = Game;
