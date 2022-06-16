'use strict';
const _ = require('lodash');

class BuildTower {
  constructor(towers) {
    if (!Array.isArray(towers)) {
      throw new Error('Incorrect tower structure; expecting Array');
    }

    // Class properties
    this.towers = towers;
    this.allDisks = _.uniq(_.flatten(towers));
    this.numMoves = 0;

    const suppliedDisks = towers.reduce((diskCount, tower) => diskCount + tower.length, 0);
    if (this.allDisks.length < suppliedDisks) {
      throw new Error('Some disks were the same size')
    }
  }


  rodsWithStackCount() {
    let numRodsWithStack = 0;
    for (const tower of this.towers) {
      numRodsWithStack += tower.length > 0 ? 1 : 0
    }

    return numRodsWithStack;
  }


  /**
   * Move disk from one tower to another
   * @param currentRod
   * @param destRod
   */
  moveDisk(currentRod, destRod) {
    if (this.peek(currentRod) > this.peek(destRod)) {
      throw new Error('Can\'t move the disk to destination');
    }
    const disk = currentRod.pop();
    destRod.push(disk);
  }

  peek(stack) {
    return stack[stack.length - 1] || 999;
  }

  /**
   * Return the index to the next tower; will start over again (-1)
   * @param currentIndex
   * @return {number|*}
   */
  nextTower(currentIndex) {
    if (currentIndex >= this.towers.length - 1) {
      return 0;
    }
    return currentIndex + 1;
  }

  /**
   * Sorts the tower from a starting rod to a destination rod, following the rules
   * @param startRod
   * @param destRod
   */
  sortTower(startRod = 0, destRod = this.towers.length - 1) {
    let index = startRod;
    while (this.towers[destRod].length < this.allDisks.length) {
      const tower = this.towers[index];
      if (tower.length > 0) {
        const topDiskIndex = tower.length - 1;
        const topDisk = tower[topDiskIndex];

        let otherRodIndex = this.nextTower(index);
        do {
          if (topDisk < this.peek(this.towers[otherRodIndex])) {
            this.moveDisk(tower, this.towers[otherRodIndex]);
            this.numMoves++;
            index = otherRodIndex;
            this.displayTower();
            console.log('Moves: ' + this.numMoves);
            break;
          }

          // start the dest loop over
          otherRodIndex = this.nextTower(otherRodIndex);
        } while (otherRodIndex !== index);
      }

      // start the rod loop over and move to the next
      index = this.nextTower(index);
    }
  }

  displayTower() {
    console.table(this.towers);
  }

}

module.exports = BuildTower;
