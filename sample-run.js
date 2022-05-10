'use strict';

const BuildTower = require('./build-tower');

const towers = [
  [5, 4, 3, 2, 1],
  [],
  []
];
const startingTower = new BuildTower(towers);

startingTower.displayTower();
startingTower.sortTower(0,1);
startingTower.displayTower();

