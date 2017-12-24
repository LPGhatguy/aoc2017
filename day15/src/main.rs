const FACTOR_A: u64 = 16807;
const FACTOR_B: u64 = 48271;

const START_A: u64 = 722;
const START_B: u64 = 354;

fn step(value: u64, factor: u64) -> u64 {
    (value * factor) % (2u64.pow(31) - 1)
}

fn pt1() {
    let mut total_same = 0;
    let mut last_a = START_A;
    let mut last_b = START_B;

    for _ in 0..40_000_000 {
        last_a = step(last_a, FACTOR_A);
        last_b = step(last_b, FACTOR_B);

        let mask_a = last_a & 0xFFFF;
        let mask_b = last_b & 0xFFFF;

        if mask_a == mask_b {
            total_same += 1
        }
    }

    println!("Total matches: {}", total_same);
}

fn main() {
    pt1();
}