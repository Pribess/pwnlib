/*
        Copyright (C) 2022 Heewon Cho
        pwn.ts
*/

import process from "./tunnels/process.js";
import remote from "./tunnels/remote.js";

import { p16, p32, p64, u16, u32, u64 } from "./utilities/endian.js";

import ELF from "./files/elf.js";

export default {
    process,
    remote,

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

import Process from "process";

Process.on("uncaughtException", (err) => {
    console.log('Caught exception: ' + err);
});