/*
        Copyright (C) 2022 Heewon Cho
        endian.ts
*/

import { StringToUint8Array, Uint8ArrayToString } from "../etc/data.js";
import { Log, Type } from "../etc/log.js";

export function p16(value: bigint): string {
    if (value < 0 || value > BigInt(65535)) {
        Log(Type.Error, "p16 requires number between 0 and 65,535");
    }
    const size = 2;
    const buff = new Uint8Array(size);
    buff.forEach((element, index, array): void => {
        array[index] = Number((value >> BigInt(index * 8)) & BigInt(0xFFn));
    });
    return Uint8ArrayToString(buff);
}

export function p32(value: bigint): string {
    if (value < 0 || value > BigInt(4294967295)) {
        Log(Type.Error, "p32 requires number between 0 and 4,294,967,295");
    }
    const size = 4;
    const buff = new Uint8Array(size);
    buff.forEach((element, index, array): void => {
        array[index] = Number((value >> BigInt(index * 8)) & BigInt(0xFF));
    });
    return Uint8ArrayToString(buff);
}

export function p64(value: bigint): string {
    if (value < 0 || value > BigInt(18446744073709551615n)) {
        Log(Type.Error, "p64 requires number between 0 and 18,446,744,073,709,551,615");
    }
    const size = 8;
    const buff = new Uint8Array(size);
    buff.forEach((element, index, array): void => {
        array[index] = Number((value >> BigInt(index * 8)) & BigInt(0xFFn));
    });
    return Uint8ArrayToString(buff);
}

export function u16(value: string): bigint {
    if (value.length != 2) {
        Log(Type.Error, "u16 requires a buffer of 2 bytes");
    }
    return BigInt(new DataView(StringToUint8Array(value).buffer).getUint16(0, true));
}

export function u32(value: string): bigint {
    if (value.length != 4) {
        Log(Type.Error, "u32 requires a buffer of 4 bytes");
    }
    return BigInt(new DataView(StringToUint8Array(value).buffer).getUint32(0, true));
}

export function u64(value: string): bigint {
    if (value.length != 8) {
        Log(Type.Error, "u64 requires a buffer of 8 bytes");
    }
    return new DataView(StringToUint8Array(value).buffer).getBigUint64(0, true);
}
