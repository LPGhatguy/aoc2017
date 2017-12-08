"use strict";

const { readFileSync } = require("fs");

const input = readFileSync("day-2pt2-input.txt", "utf8");

const result = input
	.split("\n")
	.map(line => {
		// let's be clever and sort each line
		// then we only have to compare each value with the values after it
		const values = line
			.trim()
			.split(/\s+/)
			.map(v => parseInt(v))
			// aagh, why does JS sort numbers lexicographically!?
			// this tripped me up for like 10 minutes even though I wrote
			// a blog post about this
			// http://horriblesoftware.com/2016/07/29/JS-Sorting.html
			.sort((a, b) => (a > b) ? -1 : (a < b) ? 1 : 0);

		let found = null;
		for (let i = 0; i < values.length; i++) {
			for (let j = i + 1; j < values.length; j++) {
				const check = values[i] / values[j];

				if (Number.isInteger(check)) {
					found = check;
					break;
				}
			}

			if (found) {
				break;
			}
		}

		return found;
	})
	.reduce((a, b) => a + b, 0);

console.log(result);