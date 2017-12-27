fn pt1() {
    let cycle_count = 312;
    let mut buffer: Vec<usize> = vec![0];
    let mut position = 0;

    for next_value in 1..2018 {
        position = (position + cycle_count) % buffer.len() + 1;
        buffer.insert(position, next_value);
    }

    println!("First two values: {:?}", &buffer[0..2]);
    println!("Values around current position: {:?}", &buffer[(position - 1)..(position + 2)]);
}

fn pt2() {
    let cycle_count = 312;
    let mut position = 1;
    let mut value_after_zero = 1;

    for next_value in 2..(50_000_000 + 1) {
        position = (position + cycle_count) % next_value + 1;

        if position == 1 {
            value_after_zero = next_value;
        }
    }

    println!("Value after zero: {:?}", value_after_zero);
}

fn main() {
    println!("Part one:");
    pt1();

    println!("Part two:");
    pt2();
}
