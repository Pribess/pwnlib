/*
        Copyright (C) 2022 Heewon Cho
        pwn.ts
*/

import Process from "./tunnels/process.js";
import Remote from "./tunnels/remote.js";

import { p16, p32, p64, u16, u32, u64 } from "./utilities/endian.js";

import ELF from "./files/elf.js";

export default {
    Process,
    Remote,

    p16,
    p32,
    p64,
    u16,
    u32,
    u64,
    
    ELF
};

import Update from "./etc/update.js";

Update();

process.on("uncaughtException", (err) => {
    console.log('Caught exception: ' + err);
});