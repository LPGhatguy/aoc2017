#[macro_use]
extern crate lazy_static;
extern crate regex;

use std::collections::HashMap;

use regex::Regex;

lazy_static! {
    static ref VALUES: Vec<&'static str> = vec![
        "a", "b", "c", "d", "e", "f", "g", "h",
        "i", "j", "k", "l", "m", "n", "o", "p",
    ];

    static ref NAME_TO_NUM: HashMap<&'static str, usize> = {
        let mut map = HashMap::new();

        for (key, value) in VALUES.iter().enumerate() {
            map.insert(*value, key);
        }

        map
    };
}

static INPUT: &'static str = include_str!("input.txt");

fn spin(list: &mut Vec<&'static str>, x: usize) {
    let tail_len = list.len().saturating_sub(x);
    let tail = list.split_off(tail_len);

    for e in tail.iter().rev() {
        list.insert(0, *e);
    }
}

fn pt1() {
    let spin_pattern = Regex::new(r"^s(\d+)").unwrap();
    let exchange_pattern = Regex::new(r"^x(\d+)/(\d+)").unwrap();
    let partner_pattern = Regex::new(r"^p([a-zA-Z])/([a-zA-Z])").unwrap();

    let mut values = VALUES.clone();

    for instruction in INPUT.split(",") {
        if let Some(captures) = spin_pattern.captures(instruction) {
            let value = captures.get(1).unwrap().as_str().parse::<usize>().unwrap();

            spin(&mut values, value);
        } else if let Some(captures) = exchange_pattern.captures(instruction) {
            let a = captures.get(1).unwrap().as_str().parse::<usize>().unwrap();
            let b = captures.get(2).unwrap().as_str().parse::<usize>().unwrap();

            values.swap(a, b);
        } else if let Some(captures) = partner_pattern.captures(instruction) {
            let a_name = captures.get(1).unwrap().as_str();
            let b_name = captures.get(2).unwrap().as_str();

            let a = values.iter().position(|v| *v == a_name).unwrap();
            let b = values.iter().position(|v| *v == b_name).unwrap();

            values.swap(a, b);
        }
    }

    println!("{}", values.join(""));
}

fn main() {
    pt1();
}
