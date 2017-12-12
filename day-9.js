"use strict";

const { readFileSync } = require("fs");

const input = readFileSync("day-9-input.txt", "utf8");

let depth = 0;
let score = 0;
let inGarbage = false;

for (let i = 0; i < input.length; i++) {
	const char = input[i];

	if (inGarbage) {
		if (char == ">") {
			inGarbage = false;
		} else if (char == "!") {
			i++;
		}
	} else {
		if (char == "<") {
			inGarbage = true;
		} else if (char == "{") {
			depth++;
			score += depth;
		} else if (char == "}") {
			depth--;
		}
	}
}

console.log("score", score);