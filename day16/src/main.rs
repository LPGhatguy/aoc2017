#[macro_use]
extern crate lazy_static;
extern crate regex;

use regex::Regex;

lazy_static! {
    static ref VALUES: Vec<&'static str> = vec![
        "a", "b", "c", "d", "e", "f", "g", "h",
        "i", "j", "k", "l", "m", "n", "o", "p",
    ];
}

static INPUT: &'static str = include_str!("input.txt");

enum Instruction {
    Spin(usize),
    Exchange(usize, usize),
    Partner(&'static str, &'static str),
}

fn spin(list: &mut Vec<&'static str>, x: usize) {
    let tail_len = list.len().saturating_sub(x);
    let mut tail = list.split_off(tail_len);
    tail.append(list);

    *list = tail;
}

fn parse() -> Vec<Instruction> {
    let spin_pattern = Regex::new(r"^s(\d+)").unwrap();
    let exchange_pattern = Regex::new(r"^x(\d+)/(\d+)").unwrap();
    let partner_pattern = Regex::new(r"^p([a-zA-Z])/([a-zA-Z])").unwrap();

    let mut instructions = Vec::new();

    for instruction in INPUT.split(",") {
        if let Some(captures) = spin_pattern.captures(instruction) {
            let value = captures.get(1).unwrap().as_str().parse::<usize>().unwrap();

            instructions.push(Instruction::Spin(value));
        } else if let Some(captures) = exchange_pattern.captures(instruction) {
            let a = captures.get(1).unwrap().as_str().parse::<usize>().unwrap();
            let b = captures.get(2).unwrap().as_str().parse::<usize>().unwrap();

            instructions.push(Instruction::Exchange(a, b));
        } else if let Some(captures) = partner_pattern.captures(instruction) {
            let a_name = captures.get(1).unwrap().as_str();
            let b_name = captures.get(2).unwrap().as_str();

            instructions.push(Instruction::Partner(a_name, b_name));
        }
    }

    instructions
}

fn dance(instructions: &[Instruction], values: &mut Vec<&'static str>) {
    for instruction in instructions {
        match *instruction {
            Instruction::Spin(value) => spin(values, value),
            Instruction::Exchange(a, b) => values.swap(a, b),
            Instruction::Partner(a_name, b_name) => {
                let a = values.iter().position(|v| *v == a_name).unwrap();
                let b = values.iter().position(|v| *v == b_name).unwrap();

                values.swap(a, b);
            },
        }
    }
}

fn pt1() {
    let instructions = parse();
    let mut values = VALUES.clone();
    dance(&instructions, &mut values);

    println!("{}", values.join(""));
}

fn pt2() {
    let instructions = parse();
    let mut values = VALUES.clone();

    for i in 0..1_000_000_000 {
        dance(&instructions, &mut values);

        if i % 1_000 == 0 {
            println!("{}", i);
        }
    }

    println!("{}", values.join(""));
}

fn main() {
    println!("Part one:");
    pt1();

    println!("Part two:");
    pt2();
}
