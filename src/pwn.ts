/*
        Copyright (C) 2022 Heewon Cho
        pwn.ts
*/

import Process from "./tunnels/process.js";
import Remote from "./tunnels/remote.js";

import { p16, p32, p64 } from "./utilities/endian.js";

export default {
    Process,
    Remote,

    p16,
    p32,
    p64
};

import Update  from "./etc/update.js";

Update();

process.on("uncaughtException", (err) => {
    console.log('Caught exception: ' + err);
});