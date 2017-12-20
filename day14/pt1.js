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

const fullGrid = sequence(128)
	.map((n) => gridify(hash(`${ key }-${ n }`)));

const occupied = fullGrid
	.reduce((accum, row) => accum + sum1(row), 0);

console.log(occupied);