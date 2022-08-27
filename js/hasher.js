
// Initial implementation borrowed from
// https://stackoverflow.com/a/63287199

class Hasher {
  fileReader = new FileReader();
  wasmHash;
  file;

  constructor(file) {
    this.file = file;
  }

  async getMD5() {
    if (!this.wasmHash) {
      this.wasmHash = await hashwasm.createMD5();
    }
    const reader = this.file.stream().getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      this.wasmHash.update(value);
    }
    const hash = this.wasmHash.digest();
    return Promise.resolve(hash);
  }
}
