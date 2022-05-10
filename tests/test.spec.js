'use strict';


const mocha = require('mocha'); // test framework
const sinon = require('sinon'); // test mocks
const chai = require('chai'); // test assertions
const expect = chai.expect;

const BuildTower = require('../build-tower');

describe('Tower of Hanoi', function() {
  it('should instantiate BuildTower class', function() {
    const towers = [[1]];
    const buildTower = new BuildTower(towers);

    expect(buildTower.towers).to.deep.equal(towers);
  });

  it('should error on instantiation if towers has the wrong data structure', function() {
    const towers = { val: 1 };

    expect(() => new BuildTower(towers)).to.throw('Incorrect tower structure; expecting Array');
  });

  describe('rodsWithStackCount', function() {
    it('should count number of towers with disks', function() {
      const towers = [[], [2], [1, 3]]
      const buildTower = new BuildTower(towers);

      expect(buildTower.rodsWithStackCount()).to.equal(2);
    });
  });

  describe('sortTower', function() {
    it('should sort the disks on a tower')
  });
});

