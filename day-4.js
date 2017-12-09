"use strict";

const { readFileSync } = require("fs");

const input = readFileSync("day-4-input.txt", "utf8");

// const input = `
// oaoe rxeq vssdqtu xrk cjv yaoqp loo
// mveua dogbam szydvri hyzk lbega abzqw xwjn wniug kwbre
// npaoy uivpxwd oynpa rcdk uixpvdw
// kxrkkx qivtt xsm xsm rqvgdjl jilosjs rji
// `.trim()

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