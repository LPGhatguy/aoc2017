"use strict";

const { readFileSync } = require("fs");

const input = readFileSync("day-1pt2-input.txt", "utf8");

let sum = 0;

for (let i = 0; i < input.length; i++) {
	const current = input[i];
	const next = input[(i + (input.length / 2)) % input.length];

	if (current === next) {
		sum += parseInt(current);
	}
}

console.log(sum);