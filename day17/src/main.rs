fn pt1() {
    let cycle_count = 312;
    let mut buffer: Vec<usize> = vec![0];
    let mut position = 0;

    for next_value in 1..2018 {
        position = (position + cycle_count) % buffer.len() + 1;
        buffer.insert(position, next_value);

        println!("Insert value {} at position {}", next_value, position);
    }

    println!("Values around current position: {:?}", &buffer[(position - 1)..(position + 2)]);
}

fn main() {
    pt1();
}
