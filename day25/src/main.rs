use std::collections::HashMap;

struct Tape {
    states: HashMap<&'static str, State>,
    state: State,
    steps: u64,
    values: HashMap<i64, bool>,
    slot: i64,
}

impl Tape {
    fn get_value(&self) -> bool {
        match self.values.get(&self.slot) {
            Some(v) => *v,
            None => false,
        }
    }

    fn write(&mut self, value: bool) {
        self.values.insert(self.slot, value);
    }

    fn offset(&mut self, offset: i64) {
        self.slot += offset;
    }

    fn step(&mut self) {
        if self.get_value() {
            let write = self.state.write_1;
            let offset = self.state.offset_1;
            let next = self.state.next_1;

            self.write(write);
            self.offset(offset);
            self.state = *self.states.get(next).unwrap();
        } else {
            let write = self.state.write_0;
            let offset = self.state.offset_0;
            let next = self.state.next_0;

            self.write(write);
            self.offset(offset);
            self.state = *self.states.get(next).unwrap();
        }

        self.steps += 1;
    }
}

#[derive(Clone, Copy)]
struct State {
    pub write_0: bool,
    pub offset_0: i64,
    pub next_0: &'static str,

    pub write_1: bool,
    pub offset_1: i64,
    pub next_1: &'static str,
}

struct StateA;
struct StateB;
struct StateC;
struct StateD;
struct StateE;
struct StateF;

fn main() {
    let mut states = HashMap::new();

    states.insert("a", State {
        write_0: true,
        offset_0: 1,
        next_0: "b",

        write_1: false,
        offset_1: -1,
        next_1: "f",
    });

    states.insert("b", State {
        write_0: false,
        offset_0: 1,
        next_0: "c",

        write_1: false,
        offset_1: 1,
        next_1: "d",
    });

    states.insert("c", State {
        write_0: true,
        offset_0: -1,
        next_0: "d",

        write_1: true,
        offset_1: 1,
        next_1: "e",
    });

    states.insert("d", State {
        write_0: false,
        offset_0: -1,
        next_0: "e",

        write_1: false,
        offset_1: -1,
        next_1: "d",
    });

    states.insert("e", State {
        write_0: false,
        offset_0: 1,
        next_0: "a",

        write_1: true,
        offset_1: 1,
        next_1: "c",
    });

    states.insert("f", State {
        write_0: true,
        offset_0: -1,
        next_0: "a",

        write_1: true,
        offset_1: 1,
        next_1: "a",
    });

    let mut tape = Tape {
        state: *states.get("a").unwrap(),
        states,
        steps: 0,
        values: HashMap::new(),
        slot: 0,
    };

    let diagnostic_after: u64 = 12994925;

    for _ in 0..diagnostic_after {
        tape.step();
    }

    let sum = tape.values
        .values()
        .fold(0, |accum, v| accum + (if *v { 1 } else { 0 }));

    println!("Checksum: {}", sum);
}
