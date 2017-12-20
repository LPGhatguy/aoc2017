/*
	I wasted way too much time on this one not reading the instructions closely.

	Diagonals are *NOT* counted, but I was counting them. Oops.
*/

"use strict";

const LEN = 256;
const key = `stpzcrnm`;

const sequence = (len) => {
	const buffer = new Array(len);

	for (let i = 0; i < len; i++) {
		buffer[i] = i;
	}

	return buffer;
}

const hash = (source) => {
	const valueBuffer = source
		.split("")
		.map(v => v.charCodeAt(0));

	for (const extra of [17, 31, 73, 47, 23]) {
		valueBuffer.push(extra);
	}

	const buffer = sequence(LEN);

	let currentPosition = 0;
	let skipSize = 0;

	for (let round = 0; round < 64; round++) {
		for (const value of valueBuffer) {
			for (let i = 0; i < Math.floor(value / 2); i++) {
				const aIndex = (currentPosition + i) % LEN;
				const bIndex = (currentPosition + value - i - 1) % LEN

				const a = buffer[aIndex];
				buffer[aIndex] = buffer[bIndex];
				buffer[bIndex] = a;
			}

			currentPosition += value + skipSize;

			skipSize++;
		}
	}

	return buffer
		.reduce((accum, value) => {
			if (accum[accum.length - 1].length < 16) {
				accum[accum.length - 1].push(value);
			} else {
				accum.push([value]);
			}

			return accum;
		}, [[]])
		.map(chunk =>
			chunk.reduce((a, b) => a ^ b)
		)
		.map(n => n.toString(16).padStart(2, "0"))
		.join("");
};

const gridify = hashed => hashed
	.split("")
	.map(char => parseInt(char, 16).toString(2).padStart(4, "0"))
	.reduce((accum, value) => [...accum, ...value], [])
	.map(n => parseInt(n));

const sum1 = row => row
	.reduce((accum, value) => accum + value, 0);

const findRegion = (grid, visited, i, j) => {
	const toVisit = [[i, j]];
	const region = [];

	while (toVisit.length > 0) {
		const [i, j] = toVisit.pop();

		if (i < 0 || i > 127 || j < 0 || j > 127) {
			continue;
		}

		const coordHash = `${ i }-${ j }`;

		if (visited.has(coordHash)) {
			continue;
		}

		visited.add(coordHash);

		if (grid[i][j] !== 1) {
			continue;
		}

		region.push([i, j]);
		toVisit.push(
			[i + 1, j],
			[i - 1, j],
			[i, j + 1],
			[i, j - 1]
		);
	}

	if (region.length === 0) {
		return null;
	}

	return region;
};

const grid = sequence(128)
	.map((n) => gridify(hash(`${ key }-${ n }`)));

const visited = new Set();
const regions = [];

for (let i = 0; i < 128; i++) {
	for (let j = 0; j < 128; j++) {
		const coordHash = `${ i }-${ j }`;

		if (visited.has(coordHash)) {
			continue;
		}

		const region = findRegion(grid, visited, i, j);

		if (region) {
			regions.push(region);
		}
	}
}

console.log(regions.length);