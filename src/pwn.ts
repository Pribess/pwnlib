/*
        Copyright (C) 2022 Heewon Cho
        pwn.ts
*/

import Process from "./tunnels/process.js";
import Remote from "./tunnels/remote.js";

export default {
    Process,
    Remote
};

process.on("uncaughtException", (err) => {
    console.log('Caught exception: ' + err);
});