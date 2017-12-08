"use strict";

const { readFileSync } = require("fs");

const input = readFileSync("day-8-input.txt", "utf8");

const lineReg = /^(\S+) (\S+) (\S+) if (\S+) (\S+) (\S+)/;

const conditions = {
	"==": (a, b) => a == b,
	">=": (a, b) => a >= b,
	"<=": (a, b) => a <= b,
	"<": (a, b) => a < b,
	">": (a, b) => a > b,
	"!=": (a, b) => a !== b,
};

const operators = {
	inc: (a, b) => a + b,
	dec: (a, b) => a - b,
};

const registers = input
	.split("\n")
	.reduce((registers, line) => {
		const [, register, op, value, condRegister, condition, condValue] = line.match(lineReg);

		if (conditions[condition](registers[condRegister] || 0, parseInt(condValue))) {
			registers[register] = operators[op](registers[register] || 0, parseInt(value));
		}

		return registers;
	}, {});

let largest = 0;
for (const key of Object.keys(registers)) {
	console.log(key, registers[key]);
	largest = Math.max(largest, registers[key]);
}

console.log(largest);