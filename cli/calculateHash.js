const { createMD5 } = require('hash-wasm');
const fs = require('fs');
const { performance } = require('perf_hooks');

const file = process.argv.slice(2)[0];

if (!fs.existsSync(file)) {
  console.error("ERROR: File not found.");
  process.exit(1);
}

run(file)

async function fileHash(file) {
  const wasmHash = await createMD5();
  return new Promise((resolve, _reject) => {
    wasmHash.init();
    fs.createReadStream(file)
      .on('data', data => wasmHash.update(data))
      .on('end', () => resolve(wasmHash.digest()));
   });
}

async function run(file) {
  const start = performance.now();
  let hash = await fileHash(file)
  const end = performance.now();
  const duration = end - start;
  const fileSize = fs.statSync(file).size / 1024 / 1024;
  const throughput = fileSize / (duration / 1000);

  console.log('%s %s %s %s %s',
    'File'.padEnd(file.length), 'Size (MB)'.padEnd(10),
    'Hash'.padEnd(32), 'Duration (ms)'.padEnd(15), 'Throughput (MB/s)'
  )

  console.log('%s %s %s %s %s',
    file, fileSize.toFixed(2).padEnd(10),
    hash, duration.toFixed(2).padEnd(15), throughput.toFixed(2)
  )
}
