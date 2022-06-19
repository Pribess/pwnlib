/*
        Copyright (C) 2022 Heewon Cho
        endian.ts
*/

import { Exception, Type } from "../etc/exception.js";

export function p16(value: number): number {
    if (value < 0 || value > 65535) {
        Exception(Type.Error, "p16 requires number between 0 and 65,535");
    }
    return ((value & 0xFF) << 8)
    | ((value >> 8) & 0xFF);
}

export function p32(value: number): number {
    if (value < 0 || value > 4294967295) {
        Exception(Type.Error, "p32 requires number between 0 and 4,294,967,295");
    }
    return ((value & 0xFF) << 24)
    | ((value & 0xFF00) << 8)
    | ((value >> 8) & 0xFF00)
    | ((value >> 24) & 0xFF);
}

// export function p64(value: number): number {

// }

// export function u16(value: number): number {

// }

// export function u32(value: number): number {

// }

// export function u64(value: number): number {

// }
