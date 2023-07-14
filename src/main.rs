use std::{io, cmp::Ordering};
use rand::Rng;

fn main() {
    println!("Guess the number");
    let secret_number: u32 = rand::thread_rng().gen_range(1..101);
    loop {
        println!("Please input your answer");
        let mut guess: String = String::new();
        io::stdin().read_line(&mut guess).expect("Fail to read");
        println!("Your guess: {}", guess);

        let guess:u32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => continue,
        };

        match guess.cmp(&secret_number) {
            Ordering::Less => println!("Too small"),
            Ordering::Greater => println!("Too big"),
            Ordering::Equal => {
                println!("You're right");
                break;
            }
        }
    }
}
