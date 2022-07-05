/*
        Copyright (C) 2022 Heewon Cho
        endian.ts
*/

export function StringToUint8Array(str: string): Uint8Array {
    let cnt = str.length;
    const buff = new Uint8Array(str.length);
    while(cnt--) {
        buff[cnt] = Number(str.charCodeAt(cnt));
    }
    return buff;
}

export function Uint8ArrayToString(arr: Uint8Array): string {
    return String.fromCharCode.apply(null, Array.from(arr));
}

export function EscapedString(str: string): string {
    const buff = new Uint8Array(str.length);
    let rst: string = "";
    buff.forEach((element, index, array): void => {
        rst += "\\";
        rst += "x";
        rst += str.charCodeAt(index).toString(16);
    });
    return rst;
}