"use strict";

const { readFileSync } = require("fs");

const input = readFileSync("input.txt", "utf8");

const result = input
	.split("\n")
	.map(line => {
		const pieces = line
			.split(/\s+/);

		const seen = new Set();

		for (const piece of pieces) {
			if (seen.has(piece)) {
				return false;
			}

			seen.add(piece);
		}

		return true;
	})
	.reduce((accum, v) => v ? accum + 1 : accum);

console.log(result);