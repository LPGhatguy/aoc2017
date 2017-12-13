"use strict";

const { readFileSync } = require("fs");

const input = readFileSync("input.txt", "utf8");

// const input = `
// 0
// 3
// 0
// 1
// -3
// `.trim();

const values = input
	.split("\n")
	.map(line => parseInt(line.trim()));

let cursor = 0;
let stepCount = 0;

while (true) {
	const next = cursor + values[cursor];
	values[cursor]++;
	stepCount++;

	if (next >= values.length) {
		break;
	}

	cursor = next;
}

console.log(stepCount);