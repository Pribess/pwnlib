/*
        Copyright (C) 2022 Heewon Cho
        elf.ts
*/

import fs from "fs";

export default class ELF {
    data: Uint8Array;
    
    constructor(path: string) {
        this.data = fs.readFileSync(path);
    }
};