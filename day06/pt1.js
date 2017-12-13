"use strict";

const input = `5	1	10	0	1	7	13	14	3	12	8	10	7	12	0	6`;

const balanceStep = values => {
	values = [...values];

	let highest = -Infinity;
	let highestIndex = null;

	for (let i = 0; i < values.length; i++) {
		if (values[i] > highest) {
			highestIndex = i;
			highest = values[i];
		}
	}

	values[highestIndex] = 0;

	let remaining = highest;
	let currentIndex = (highestIndex + 1) % values.length;

	while (remaining > 0) {
		values[currentIndex]++;
		remaining--;
		currentIndex = (currentIndex + 1) % values.length;
	}

	return values;
};

// such hash, wow
const hash = values => values.join(" ");

let values = input
	.split("\t")
	.map(line => parseInt(line.trim()));

const seen = new Set();
seen.add(hash(values));

let cycles = 0;

while (true) {
	values = balanceStep(values);
	cycles++;

	if (seen.has(hash(values))) {
		break;
	}

	seen.add(hash(values));
}

console.log(cycles);