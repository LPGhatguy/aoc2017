"use strict";

const { readFileSync } = require("fs");

const input = readFileSync("input.txt", "utf8");

const result = input
	.split("\n")
	.map(line => {
		const words = line
			.split(/\s+/)
			.map(word => word.split("").sort().join(""));

		const seen = new Set();

		for (const word of words) {
			if (seen.has(word)) {
				return false;
			}

			seen.add(word);
		}

		return true;
	})
	.reduce((accum, v) => v ? accum + 1 : accum);

console.log(result);