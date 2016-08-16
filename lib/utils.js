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
