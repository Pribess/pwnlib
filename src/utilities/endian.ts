/*
        Copyright (C) 2022 Heewon Cho
        endian.ts
*/

import { Exception, Type } from "../etc/exception.js";

export function p16(value: number): Uint8Array {
    if (value < 0 || value > 65535) {
        Exception(Type.Error, "p16 requires number between 0 and 65,535");
    }
    const size = 2;
    const buff = new Uint8Array(size);
    buff.forEach((element, index, array): void => {
        array[index] = (value >> (index * 8)) & 0xFF;
    });
    return buff;
}

export function p32(value: number): Uint8Array {
    if (value < 0 || value > 4294967295) {
        Exception(Type.Error, "p32 requires number between 0 and 4,294,967,295");
    }
    const size = 4;
    const buff = new Uint8Array(size);
    buff.forEach((element, index, array): void => {
        array[index] = (value >> (index * 8)) & 0xFF;
    });
    return buff;
}

export function p64(value: number): Uint8Array {
    if (value < 0 || value > 18446744073709551615n) {
        Exception(Type.Error, "p32 requires number between 0 and 18,446,744,073,709,551,615");
    }
    const size = 8;
    const buff = new Uint8Array(size);
    buff.forEach((element, index, array): void => {
        array[index] = (value >> (index * 8)) & 0xFF;
    });
    return buff;
}

// export function u16(value: number): number {

// }

// export function u32(value: number): number {

// }

// export function u64(value: number): number {

// }
