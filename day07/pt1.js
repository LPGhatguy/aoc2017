"use strict";

const { readFileSync } = require("fs");

const input = readFileSync("input.txt", "utf8");

const values = input
	.split("\n")
	.map(line => {
		const [, name, weight] = line.match(/^(\S+) \((\d+)\)/);
		const supportMatch = line.match(/-> (.+)/);

		let children = null;

		if (supportMatch) {
			children = supportMatch[1].split(", ");
		}

		return {
			name,
			weight,
			children,
		};
	});

// The values that will be known to not be children
const roots = new Set(values.map(v => v.name));

for (const value of values) {
	if (value.children) {
		for (const childName of value.children) {
			roots.delete(childName);
		}
	}
}

console.log("Known as roots:", roots);