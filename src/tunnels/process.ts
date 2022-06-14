/*
        Copyright (C) 2022 Heewon Cho
        process.ts
*/

import { ChildProcess, spawn } from "child_process";

import Pipe from "./primitives/pipe.js";

export default class Process extends Pipe {
    process: ChildProcess;

    constructor(path: string, args?: string[]) {
        const process: ChildProcess = spawn(path, args);
        super(process.stdin);

        this.process = process;
        this.process.stdout?.on("data", (data) => {
            this.buffer.push(data);
            this.emitter.emit("BufferFilled");
        });
    }
};