const GameView = require('./game_view.js');


document.addEventListener("DOMContentLoaded", function(){
  const container = document.getElementById("canvas");
  var ctx = container.getContext('2d');
  const newGame = new GameView(ctx);
  newGame.start();
});
