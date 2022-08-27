require 'digest/md5'
require 'benchmark'

file = ARGV[0]

abort("ERROR: File not found.") unless File.file?(file)

hash = nil
perf = Benchmark.measure do
  hash = Digest::MD5.file(file).hexdigest
end

duration = perf.real
file_size = File.size(file) / 1024 / 1024
throughput = file_size / duration

format = "%-#{file.size}s %-10s %-32s %-15s %-7s"
puts format % ['File', 'Size (MB)', 'Hash', 'Duration (ms)', 'Throughput (MB/s)']
puts format % [file, file_size.round(2), hash, (duration * 1000).round(2) , throughput.round(2)]
