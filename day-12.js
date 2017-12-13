"use strict";

const { readFileSync } = require("fs");

const input = readFileSync("day-12-input.txt", "utf8");

const connections = input
	.split("\n")
	.map(line => {
		const [, sourceString, connectionString] = line.match(/(\d+) <\-> (.+)/);

		const source = parseInt(sourceString);
		const connections = connectionString
			.split(",")
			.map(v => parseInt(v.trim()));

		return {
			source,
			connections,
		};
	});

const connectionMap = new Map();

for (const connection of connections) {
	connectionMap.set(connection.source, connection.connections);
}

// Let's actually solve the problem now

const visited = new Set();
const toVisit = new Set([0]);

while (true) {
	// Pop a value off of our 'toVisit' set
	const current = toVisit.values().next().value;

	if (current == null) {
		break;
	}

	toVisit.delete(current);
	visited.add(current);

	// Visit all of this node's children
	const children = connectionMap.get(current);

	for (const child of children) {
		if (!visited.has(child)) {
			toVisit.add(child);
		}
	}
}

const unvisited = new Set();
for (const connection of connections) {
	if (!visited.has(connection.source)) {
		unvisited.add(connection.source);
	}
}

console.log(`Visited ${ visited.size } nodes`);
console.log(`Missed ${ unvisited.size } nodes`);