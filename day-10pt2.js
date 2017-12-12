"use strict";

const LEN = 256;
const input = `31,2,85,1,80,109,35,63,98,255,0,13,105,254,128,33`;

const lengths = input
	.split("")
	.map(v => v.charCodeAt(0));

for (const extra of [17, 31, 73, 47, 23]) {
	lengths.push(extra);
}

const buffer = new Array(LEN);

for (let i = 0; i < LEN; i++) {
	buffer[i] = i;
}

let currentPosition = 0;
let skipSize = 0;

for (let round = 0; round < 64; round++) {
	for (const length of lengths) {
		for (let i = 0; i < Math.floor(length / 2); i++) {
			const aIndex = (currentPosition + i) % LEN;
			const bIndex = (currentPosition + length - i - 1) % LEN

			const a = buffer[aIndex];
			buffer[aIndex] = buffer[bIndex];
			buffer[bIndex] = a;
		}

		currentPosition += length + skipSize;

		skipSize++;
	}
}

const dense = buffer
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

console.log(dense);