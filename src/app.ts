import 'source-map-support/register';
import { generate } from './gen';

const timeToRun = 1000; // 1 second
const trials = 5; // Test will run these many times with final score averaged

const test = (trialNumber: number) => {
    console.log(`Running test ${trialNumber}/${trials}`);

    const [maxHash, numberOfHashesGenerated] = generate(timeToRun);

    let ones = 0;
    const resultInBinary = BigInt('0x' + maxHash.toString('hex')).toString(2);
    for (const digit of resultInBinary) {
        if (digit === '1') {
            ones++;
        } else {
            break;
        }
    }
    const score = (ones * 10) / resultInBinary.length;
    console.log(
        `Test complete. Generated ${numberOfHashesGenerated} hashes. Maximum ${ones} consecutive ones. Score is ${score.toFixed(
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
