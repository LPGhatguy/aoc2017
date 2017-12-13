"use strict";

const { readFileSync } = require("fs");

const input = readFileSync("input.txt", "utf8");

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
const unvisited = new Set(connections.map(v => v.source));
const groups = [];

while (true) {
	// Pick the next root to try to traverse
	const nextRoot = unvisited.values().next().value;

	if (nextRoot == null) {
		break;
	}

	// Crawl the graph starting from here
	const toVisit = new Set([nextRoot]);
	const group = new Set();

	groups.push(group);

	while (true) {
		// Pop a value off of our 'toVisit' set
		const current = toVisit.values().next().value;

		if (current == null) {
			break;
		}

		// Pop from toVisit
		toVisit.delete(current);

		// Remove from unvisited, add to visited
		unvisited.delete(current);
		visited.add(current);

		// Mark node as part of our group
		group.add(current);

		// Visit all of this node's children
		const children = connectionMap.get(current);

		for (const child of children) {
			if (!visited.has(child) && !toVisit.has(child)) {
				toVisit.add(child);
			}
		}
	}
}

console.log(`Visited ${ visited.size } nodes`);
console.log(`Missed ${ unvisited.size } nodes`);
console.log(`Found ${ groups.length } distinct groups`);