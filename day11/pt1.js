"use strict";

// I'm super proud of this solution.
// Cubic coordinate system for hexagonal grids, see:
// https://www.redblobgames.com/grids/hexagons/

const { readFileSync } = require("fs");

const input = readFileSync("input.txt", "utf8");

const directions = input
	.split(",");

const commands = {
	// along x axis
	n: ([x, y, z]) => [0, y + 1, z - 1],
	s: ([x, y, z]) => [0, y - 1, z + 1],

	// along y axis
	ne: ([x, y, z]) => [x + 1, y, z - 1],
	sw: ([x, y, z]) => [x - 1, y, z + 1],

	// along z axis
	se: ([x, y, z]) => [x + 1, y - 1, z],
	nw: ([x, y, z]) => [x - 1, y + 1, z],
};

const distance = ([x, y, z]) => Math.max(Math.abs(x), Math.abs(y), Math.abs(z));

let position = [0, 0, 0];

for (const direction of directions) {
	position = commands[direction](position);
}

console.log(position, distance(position));