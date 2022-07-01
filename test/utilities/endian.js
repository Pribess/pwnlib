/*
        Copyright (C) 2022 Heewon Cho
        endian.js (test)
*/

import assert from "assert"

import pwn from "../../dist/pwn.js";

describe('p16', () => {
    [
        { input: BigInt(0x1234), expect: "\x34\x12" },
        { input: BigInt(0x0102), expect: "\x02\x01" }
    ].forEach(({input, expect}) => {
        const result = pwn.p16(input);
        const msg = result === expect ? "pass" : "fail";
        it(msg, () => {
            assert.strictEqual(result, expect)
        });
    })
});

describe('p32', () => {
    [
        { input: BigInt(0x12345678), expect: "\x78\x56\x34\x12" },
        { input: BigInt(0x01020304), expect: "\x04\x03\x02\x01" }
    ].forEach(({input, expect}) => {
        const result = pwn.p32(input);
        const msg = result === expect ? "pass" : "fail";
        it(msg, () => {
            assert.strictEqual(result, expect)
        });
    })
});

describe('p64', () => {
    [
        { input: BigInt(0x12345678DEADBEEFn), expect: "\xEF\xBE\xAD\xDE\x78\x56\x34\x12" },
        { input: BigInt(0x01020304DEADBEEFn), expect: "\xEF\xBE\xAD\xDE\x04\x03\x02\x01" }
    ].forEach(({input, expect}) => {
        const result = pwn.p64(input);
        const msg = result === expect ? "pass" : "fail";
        it(msg, () => {
            assert.strictEqual(result, expect)
        });
    })
});

describe('u16', () => {
    [
        { input: "\x12\x34", expect: BigInt(0x3412) },
        { input: "\x01\x02", expect: BigInt(0x0201) }
    ].forEach(({input, expect}) => {
        const result = pwn.u16(input);
        const msg = result === expect ? "pass" : "fail";
        it(msg, () => {
            assert.strictEqual(result, expect)
        });
    })
});

describe('u32', () => {
    [
        { input: "\x12\x34\x56\x78", expect: BigInt(0x78563412) },
        { input: "\x01\x02\x03\x04", expect: BigInt(0x04030201) }
    ].forEach(({input, expect}) => {
        const result = pwn.u32(input);
        const msg = result === expect ? "pass" : "fail";
        it(msg, () => {
            assert.strictEqual(result, expect)
        });
    })
});

describe('u64', () => {
    [
        { input: "\x12\x34\x56\x78\xDE\xAD\xBE\xEF", expect: BigInt(0xEFBEADDE78563412n) },
        { input: "\x01\x02\x03\x04\xDE\xAD\xBE\xEF", expect: BigInt(0xEFBEADDE04030201n) }
    ].forEach(({input, expect}) => {
        const result = pwn.u64(input);
        const msg = result === expect ? "pass" : "fail";
        it(msg, () => {
            assert.strictEqual(result, expect)
        });
    })
});