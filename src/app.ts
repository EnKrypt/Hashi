import 'source-map-support/register';
import { createHash, randomBytes } from 'crypto';

const timeToRun = 1000; // 1 second
const trials = 5; // Test will run these many times with final score averaged

const test = (trialNumber: number) => {
    console.log(`Running test ${trialNumber}/${trials}`);
    let maxHash = Buffer.alloc(32, 0); // 256 bit Buffer with all zeros
    let hashesGenerated = 0;
    const startTime = Date.now(); // Unix time

    while (Date.now() - startTime < timeToRun) {
        // A challenge for the reader: Is there a more performant way to run a loop for a specified duration?

        const hash = createHash('sha256')
            .update(randomBytes(8))
            .digest();
        hashesGenerated++;

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

    let ones = 0;
    const resultInBinary = parseInt(maxHash.toString('hex'), 16).toString(2);
    for (const digit of resultInBinary) {
        if (digit === '1') {
            ones++;
        } else {
            break;
        }
    }
    const score = (ones * 10) / resultInBinary.length;
    console.log(
        `Test complete. Generated ${hashesGenerated} hashes. Maximum ${ones} consecutive ones. Score is ${score.toFixed(
            2
        )}\n`
    );
    return score;
};

console.log(`Hashi Benchmark`);
console.log(
    `Configured to run ${trials} tests of ${timeToRun / 1000} second(s) each.\n`
);
const scores = [];
for (let i = 0; i < trials; i++) {
    scores.push(test(i + 1));
}
const final = (scores.reduce((a, b) => a + b, 0) / trials).toFixed(2);
console.log(`All tests done!`);
console.log(`Final score (averaged) is ${final}`);
