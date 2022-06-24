/*
        Copyright (C) 2022 Heewon Cho
        endian.js (test)
*/

import assert from "assert"

import pwn from "../../dist/pwn.js";

const testCase = [
    { input: BigInt(0x1234), expect: BigInt(0x3412) },
    { input: BigInt(0x0102), expect: BigInt(0x0201) }
];

describe('p16', () => {
    testCase.forEach(({input, expect}) => {
        const result = BigInt(new DataView(pwn.p16(input).buffer).getUint16(0, false));
        const msg = result === expect ? "pass" : "fail";
        it(msg, () => {
            assert.strictEqual(result, expect)
        });
    })
});