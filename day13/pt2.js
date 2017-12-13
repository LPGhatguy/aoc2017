"use strict";

const { readFileSync } = require("fs");

const input = readFileSync("input.txt", "utf8");

const firewalls = input
	.split("\n")
	.map(line => {
		const [, depthS, rangeS] = line.match(/(\d+): (\d+)/);

		return {
			depth: parseInt(depthS),
			range: parseInt(rangeS),
		};
	});

const max = firewalls
	.reduce((max, firewall) => Math.max(max, firewall.depth), 0);

const makeState = () => {
	const firewallState = new Array(max).fill(null);

	for (const firewall of firewalls) {
		firewallState[firewall.depth] = {
			position: 0,
			range: firewall.range,
			depth: firewall.depth,
		};
	}

	return firewallState
};

const step = (firewallState, n) => {
	for (const state of firewallState) {
		if (!state) {
			continue;
		}

		state.position += n;
	}
};

let delay = 0;

while (true) {
	let died = false;
	const state = makeState();

	step(state, delay);

	for (let x = 0; x <= max; x++) {
		const firewall = state[x];

		if (firewall) {
			if (firewall.position % ((firewall.range - 1) * 2) === 0) {
				died = true;
				break;
			}
		}

		step(state, 1);
	}

	if (!died) {
		break;
	}

	delay++;

	if (delay % 1000 === 0) {
		console.log("Trying delay", delay);
	}
}

console.log("Good after a delay of", delay);