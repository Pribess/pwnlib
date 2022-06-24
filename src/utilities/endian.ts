/*
        Copyright (C) 2022 Heewon Cho
        endian.ts
*/

import { Exception, Type } from "../etc/exception.js";

export function p16(value: bigint): Uint8Array {
    if (value < 0 || value > BigInt(65535)) {
        Exception(Type.Error, "p16 requires number between 0 and 65,535");
    }
    const size = 2;
    const buff = new Uint8Array(size);
    buff.forEach((element, index, array): void => {
        array[index] = Number((value >> BigInt(index * 8)) & BigInt(0xFFn));
    });
    return buff;
}

export function p32(value: bigint): Uint8Array {
    if (value < 0 || value > BigInt(4294967295)) {
        Exception(Type.Error, "p32 requires number between 0 and 4,294,967,295");
    }
    const size = 4;
    const buff = new Uint8Array(size);
    buff.forEach((element, index, array): void => {
        array[index] = Number((value >> BigInt(index * 8)) & BigInt(0xFF));
    });
    return buff;
}

export function p64(value: bigint): Uint8Array {
    if (value < 0 || value > BigInt(18446744073709551615n)) {
        Exception(Type.Error, "p64 requires number between 0 and 18,446,744,073,709,551,615");
    }
    const size = 8;
    const buff = new Uint8Array(size);
    buff.forEach((element, index, array): void => {
        array[index] = Number((value >> BigInt(index * 8)) & BigInt(0xFFn));
    });
    return buff;
}

export function u16(value: Uint8Array): bigint {
    if (value.byteLength != 2) {
        Exception(Type.Error, "u16 requires a buffer of 2 bytes");
    }
    return BigInt(new DataView(value.buffer).getUint16(0, true));
}

export function u32(value: Uint8Array): bigint {
    if (value.byteLength != 4) {
        Exception(Type.Error, "u32 requires a buffer of 4 bytes");
    }
    return BigInt(new DataView(value.buffer).getUint32(0, true));
}

export function u64(value: Uint8Array): bigint {
    if (value.byteLength != 8) {
        Exception(Type.Error, "u64 requires a buffer of 8 bytes");
    }
    return new DataView(value.buffer).getBigUint64(0, true);
}
