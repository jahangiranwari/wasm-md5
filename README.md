# MD5 using Hash-Wasm

A spike to evaluate [hash-wasm](https://github.com/Daninet/hash-wasm/) package.

### Browser
To calculate MD5 in browser locally run below command to start local server:
```bash
$ docker-compose up -d web
```
The app is now available at http://localhost for testing.

### Node.js
To calculate MD5 in a Node environment run below command to login to CLI:
```bash
$ docker-compose run --rm cli
/opt/wasm # npm install
```
Any folder currently inside the project's `cli` folder is available for testing. You can now calculate MD5 by running below command:
```bash
/opt/wasm # node calculateHash.js a_new_day.mp4
File          Size (MB)  Hash                             Duration (ms)   Throughput (MB/s)
a_new_day.mp4 158.13     196747eff931c619f4b2c484cb8371ee 1063.94         148.63
```

### Ruby
To compare MD5 we use Ruby's `Digest::MD5` library. First run below command to login to CLI:
```bash
$ docker-compose run --rm cli
```
Any folder currently inside the project's `cli` folder is available for testing. You can now calculate MD5 by running below command:
```bash
/opt/wasm # ruby calculateHash.rb a_new_day.mp4
File          Size (MB)  Hash                             Duration (ms)   Throughput (MB/s)
a_new_day.mp4 158        196747eff931c619f4b2c484cb8371ee 878.72          179.81
```
**Note**: The purpose of computing MD5 from command line is just to compare the generated hash and not to evaluate the performance.