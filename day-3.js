"use strict";

/*
	spiral:
		37  36  35  34  33  32  31
		38  17  16  15  14  13  30
		39  18   5   4   3  12  29
		40  19   6   1   2  11  28
		41  20   7   8   9  10  27
		42  21  22  23	24	25  26
		43  44  45  46  47  49  49  50

	in shell:
		1:   1^2 + 1  -  3^2
		2:   3^2 + 1  -  5^2
		3:   5^2 + 1  -  7^2

	<= S * 2: (S, O)
	<=

	shell 1 distance to (0, 0):

	N  2  3  4  5  6  7  8  9
	O  0  1  2  3  4  5  6  7
	D  1  2  1  2  1  2  1  2

	shell 2 distance:

	N  10  11  12  13  14  15  16  17  18  19  20  21  22  23  24  25
	O   0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15
	D   3   2   3   4   3   2   3   4   3   2   3   4   3   2   3   4


*/

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
		console.log(x, y);

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

const taxicab = (x, y) => Math.abs(x) + Math.abs(y);

const [x, y] = nToEuclidean(312051);
console.log(taxicab(x, y));