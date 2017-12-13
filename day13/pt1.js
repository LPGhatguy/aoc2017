"use strict";

const { readFileSync } = require("fs");

const input = readFileSync("input.txt", "utf8");
// const input = `
// 0: 3
// 1: 2
// 4: 4
// 6: 4
// `.trim();

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

const firewallState = new Map();

for (const firewall of firewalls) {
	firewallState.set(firewall.depth, {
		position: 0,
		velocity: 1,
		range: firewall.range,
		depth: firewall.depth,
	});
}

const step = () => {
	for (const [depth, state] of firewallState.entries()) {
		state.position += state.velocity;

		if (state.position >= state.range - 1 || state.position === 0) {
			state.velocity = -state.velocity;
		}
	}
};

let severity = 0;

for (let x = 0; x <= max; x++) {
	const firewall = firewallState.get(x);
	console.log(x);

	if (firewall) {
		if (firewall.position == 0) {
			console.log("Hit firewall at", x);
			severity += firewall.depth * firewall.range;
		}
	}

	console.log(firewallState);
	step();
}

console.log("Severity:", severity);