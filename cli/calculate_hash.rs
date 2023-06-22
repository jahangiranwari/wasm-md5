use std::env;
use std::fs::File;
use std::io::{BufReader, Error, ErrorKind, Read};
use std::time::Instant;
use md5::{Digest, Md5};

fn main() -> Result<(), Box<dyn std::error::Error>> {
    if env::args().count() == 1 {
        return Err(Box::new(Error::new(
            ErrorKind::Other,
            "Please provide a file",
        )));
    }

    let start = Instant::now();

    // Get file
    let args: Vec<String> = env::args().collect();
    let file_path = &args[1];
    let file: File = File::open(file_path)?;

    // Find the size of the file
    let len: u64 = file.metadata()?.len();

    // Buffer size for processing chunks 65,536
    let buffer_size = len.min(1_000_000) as usize;
    let reader = BufReader::with_capacity(buffer_size, file);

    // create a Md5 hasher instance
    let mut hasher = Md5::new();

    for chunk in reader.bytes() {
        hasher.update(&[chunk?]);
    }

    let hash = hasher.finalize();
    let duration: String = format!("{:.2?}", start.elapsed());

    let hash = format!("{:x}", hash);
    let file_size = format!("{:.2}", (len as f64 / 1024.0 / 1024.0));
    let throughput = (len as u128 / (start.elapsed().as_millis())) as f64 / 1024.0;
    let throughput = format!("{:.2?}", throughput);

    println!(
        "{:14}{:10}{:34}{:15}{}",
        "File", "Size (MB)", "Hash", "Duration (ms)", "Throughput (MB/s)"
    );
    println!(
        "{:14}{:10}{:34}{:15}{}",
        file_path, file_size, hash, duration, throughput
    );

    Ok(())
}
