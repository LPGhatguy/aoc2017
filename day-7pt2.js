"use strict";

/*
	This is by far the hackiest solution I've had I think.
*/

const { readFileSync } = require("fs");

const input = readFileSync("day-7-input.txt", "utf8");

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
			weight: parseInt(weight),
			children,
		};
	});

// The values that will be known to not be children
const roots = new Set(values.map(v => v.name));
const valueMap = new Map();

for (const value of values) {
	valueMap.set(value.name, value);

	if (value.children) {
		for (const childName of value.children) {
			roots.delete(childName);
		}
	}
}

const weight = value => {
	let total = value.weight;

	if (value.children) {
		const childrenWeight = value.children
			.map(childName => valueMap.get(childName))
			.reduce((accum, child) => accum + weight(child), 0);

		total += childrenWeight;
	}

	return total;
};

const rootName = Array.from(roots)[0];

const root = valueMap.get(rootName);
let current = root;

while (true) {
	const weights = current.children
		.map(childName => valueMap.get(childName))
		.map(child => weight(child));

	const counts = new Map();

	for (const weight of weights) {
		counts.set(weight, (counts.get(weight) || 0) + 1);
	}

	console.log("Within", current.name, "with children", current.children);
	console.log("\tWeights:", weights);

	if (counts.size === 1) {
		console.log("\tMy children are balanced, see parent!");
		break;
	}

	let lowestCount = Infinity;
	let leastCommonWeight = null;
	let goodWeight;

	for (const [weight, count] of counts) {
		if (count < lowestCount) {
			goodWeight = leastCommonWeight;
			leastCommonWeight = weight;
		}
	}

	const outlierIndex = weights.indexOf(leastCommonWeight);

	const outlierName = current.children[outlierIndex];
	const outlier = valueMap.get(outlierName);

	if (!outlier.children) {
		console.log(`Outlier ${ outlierName } had weight ${ weights[outlierIndex] }, but needed ${ goodWeight }`);
		break;
	}

	console.log("\tOutlier:", JSON.stringify(outlier));

	current = outlier;
}