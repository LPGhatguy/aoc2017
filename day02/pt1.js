"use strict";

const { readFileSync } = require("fs");

const input = readFileSync("input.txt", "utf8");

const result = input
	.split("\n")
	.map(line => {
		const values = line
			.split("\t")
			.map(v => parseInt(v))
			.reduce(({ min, max }, v) => ({
				max: Math.max(v, max),
				min: Math.min(v, min),
			}), { min: Infinity, max: -Infinity });

		console.log(values);

		return values.max - values.min;
	})
	.reduce((a, b) => a + b, 0);

console.log(result);