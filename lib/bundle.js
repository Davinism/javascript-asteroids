/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const GameView = __webpack_require__(1);


	document.addEventListener("DOMContentLoaded", function(){
	  const container = document.getElementById("canvas");
	  var ctx = container.getContext('2d');
	  const newGame = new GameView(ctx);
	  newGame.start();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(2);

	function GameView(ctx) {
	  this.game = new Game();
	  this.ctx = ctx;
	}

	GameView.prototype.start = function() {
	  setInterval(() => {
	    this.game.step();
	    this.game.draw(this.ctx);
	  }, 20);
	};

	module.exports = GameView;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Asteroid = __webpack_require__(3);
	const Ship = __webpack_require__(6);
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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(4);
	const MovingObject = __webpack_require__(5);
	const Ship = __webpack_require__(6);

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


/***/ },
/* 4 */
/***/ function(module, exports) {

	const Util = {
	  inherits (childClass, parentClass) {
	    function Surrogate() {}
	    Surrogate.prototype = parentClass.prototype;
	    childClass.prototype = new Surrogate();
	    childClass.prototype.constructor = childClass;
	  }

	};
	Util.randomVec = function(length) {
	  let r = Math.random();
	  let y = r * length;
	  let x = Math.sqrt((length * length) - (y * y));
	  let ry = Math.random();
	  let rx = Math.random();
	  ry >= 0.5 ? ry = 1 : ry = -1;
	  rx >= 0.5 ? rx = 1 : rx = -1;
	  return [x * rx, y * ry];
	};

	module.exports = Util;

	// console.log(Util.randomVec(3));


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(2);

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


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(4);
	const MovingObject = __webpack_require__(5);
	const Game = __webpack_require__(2);

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


/***/ }
/******/ ]);