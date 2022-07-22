/*
        Copyright (C) 2022 Heewon Cho
        pwn.ts
*/

export * from "./tunnels/process.js";
export * from "./tunnels/remote.js";

export * from "./utilities/endian.js";

export * from "./files/elf.js";

import Update from "./etc/update.js";

Update();


import Process from "process";

Process.on("uncaughtException", (err) => {
    console.log('Caught exception: ' + err, err.stack);
    Process.exit(1);
});