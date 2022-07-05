/*
        Copyright (C) 2022 Heewon Cho
        process.ts
*/

import { ChildProcess, spawn } from "child_process";
import { Log, Type } from "../etc/log.js";

import Pipe from "./primitives/pipe.js";

export default class Process extends Pipe {
    process: ChildProcess;

    constructor(path: string, args?: string[]) {
        Log(Type.Progress, `starting local process '${path}'`);
        const process: ChildProcess = spawn(path, args);
        super(process.stdin);
        Log(Type.Success, `local process '${path}' initialized successfully: pid ${process.pid}`)

        this.process = process;
        this.process.stdout?.on("data", (data) => {
            this.buffer.push(data);
            this.emitter.emit("BufferFilled");
        });
    }

    release(): void {
        this.process.kill("SIGINT");
        Log(Type.Notify, `killed local process '${this.process.spawnfile} (pid ${this.process.pid})`)
    }
};