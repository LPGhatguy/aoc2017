"use strict";

const nToEuclidean = n => {
	if (n == 1) {
		return [0, 0];
	}

	let shell = 0;
	let offset = 0;

	while (true) {
		const i = 1 + shell * 2;
		const lower = (i - 2) ** 2 + 1;
		const upper = i ** 2;

		if (n >= lower && n <= upper) {
			offset = n - lower;
			break;
		}

		shell++;
	}

	let [x, y] = [shell, shell - 1];
	let remainingOffset = offset;
	let phase = 0;

	while (remainingOffset-- > 0) {
		if (phase === 0) {
			y--;

			if (y == -shell) {
				phase++;
			}
		} else if (phase === 1) {
			x--;

			if (x == -shell) {
				phase++;
			}
		} else if (phase === 2) {
			y++;

			if (y == shell) {
				phase++;
			}
		} else if (phase === 3) {
			x++;

			if (x == shell) {
				phase++;
			}
		} else {
			throw new Error("no pls");
		}
	}

	return [x, y];
};

const grid = new Map();

const set = (x, y, v) => {
	let column = grid.get(y);

	if (column == null) {
		column = new Map();
		grid.set(y, column);
	}

	column.set(x, v);
};

const get = (x, y) => {
	const column = grid.get(y);

	if (column == null) {
		return null;
	}

	return column.get(x);
};

set(0, 0, 1);

const input = 312051;
let i = 1;
while (true) {
	i++;

	// This is wildly inefficient, wowza
	const [x, y] = nToEuclidean(i);

	const value = [
		get(x + 1, y),
		get(x + 1, y - 1),
		get(x, y - 1),
		get(x - 1, y - 1),
		get(x - 1, y),
		get(x - 1, y + 1),
		get(x, y + 1),
		get(x + 1, y + 1),
	].reduce((a, b) => (a || 0) + (b || 0));

	if (value > input) {
		console.log(value);
		break;
	}

	set(x, y, value);
}