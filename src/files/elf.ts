/*
        Copyright (C) 2022 Heewon Cho
        elf.ts
*/

import fs from "fs";
import { EscapedString, StringToUint8Array, Uint8ArrayToString } from "../etc/data.js";
import { Log, Type } from "../etc/log.js";

export default class ELF {
    data: Uint8Array;
    view: DataView;

    elf: {

    };
    
    constructor(path: string) {
        this.data = fs.readFileSync(path);
        this.view = new DataView(this.data.buffer);
        if (Uint8ArrayToString(this.data.slice(0, 4)) != "\x7FELF") {
            Log(Type.Error, "invalid ELF magic number '" + EscapedString((Uint8ArrayToString(this.data.slice(0, 4)))) + "'");
        }
    }
};