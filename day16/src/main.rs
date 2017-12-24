extern crate regex;

use regex::Regex;

static input: &'static str = include_str!("input.txt");

fn spin(list: &mut Vec<u64>, x: usize) {
}

fn pt1() {
	let spin_pattern = Regex::new(r"^s(\d+)").unwrap();
	let exchange_pattern = Regex::new(r"^x(\d+)/(\d+)").unwrap();
	let partner_pattern = Regex::new(r"^p([a-zA-Z])/([a-zA-Z])").unwrap();

	let values: Vec<u64> = (0..16).collect();

	for instruction in input.split(",") {
		if let Some(captures) = spin_pattern.captures(instruction) {
			let value = captures.get(1).unwrap().as_str().parse::<u64>().unwrap();

			println!("Spin {}", value);
		} else if let Some(captures) = exchange_pattern.captures(instruction) {

		} else if let Some(captures) = partner_pattern.captures(instruction) {

		}
	}
}

fn main() {
	pt1();
}
