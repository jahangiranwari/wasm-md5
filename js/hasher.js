
// Initial implementation borrowed from
// https://stackoverflow.com/a/63287199

class Hasher {
  chunkSize = 64 * 1024 * 1024;
  fileReader = new FileReader();
  wasmHash;
  file;
  fileSize;

  constructor(file) {
    this.file = file;
    this.fileSize = file.size;
  }

  async getMD5() {
    if (!this.wasmHash) {
      this.wasmHash = await hashwasm.createMD5();
    }
    const chunkNumber = Math.floor(this.fileSize / this.chunkSize);
    for (let i = 0; i <= chunkNumber; i++) {
      const chunk = this.file.slice(this.chunkSize * i, Math.min(this.chunkSize * (i + 1), this.fileSize));
      await this.hashChunk(chunk);
    }
    const hash = this.wasmHash.digest();
    return Promise.resolve(hash);
  }

  hashChunk(chunk) {
    return new Promise((resolve, _reject) => {
      this.fileReader.onload = async(e) => {
        const view = new Uint8Array(e.target.result);
        this.wasmHash.update(view);
        resolve();
      };
      this.fileReader.readAsArrayBuffer(chunk);
    });
  }

}
