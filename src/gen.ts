import { createHash, randomBytes } from 'crypto';

export const generate = (timeToRun: number): [Buffer, number] => {
    let maxHash = Buffer.alloc(32, 0); // 256 bit Buffer with all zeros
    let hashesGenerated = 0;
    const input = randomBytes(8); // Start as random 8 bytes, keep incrementing every iteration
    const startTime = Date.now(); // Unix time

    while (Date.now() - startTime < timeToRun) {
        // A challenge for the reader: Is there a more performant way to run a loop for a specified duration?

        const hash = createHash('sha256')
            .update(input)
            .digest();
        hashesGenerated++;
        incrementBE(input);

        for (let i = 0; i < hash.length; i++) {
            if (hash[i] < maxHash[i]) {
                break;
            }
            if (hash[i] > maxHash[i]) {
                maxHash = hash;
                break;
            }
        }
    }
    return [maxHash, hashesGenerated];
};

export const incrementBE = (buffer: Buffer) => {
    for (let i = buffer.length - 1; i >= 0; i--) {
        if (buffer[i]++ !== 255) break;
    }
};
