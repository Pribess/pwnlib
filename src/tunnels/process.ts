/*
        Copyright (C) 2022 Heewon Cho
        process.ts
*/

import { ChildProcess, spawn } from "child_process";
import which from "which";
import { Log, Type } from "../etc/log.js";

import Pipe from "./primitives/pipe.js";

export function process(executable: string, args?: string[]): Process {
    return new Process(executable, args);
}

export class Process extends Pipe {
    process: ChildProcess;

    constructor(executable: string, args?: string[]) {
        let process: ChildProcess = spawn(executable, args);
        Log(Type.Progress, `starting local process '${which.sync(executable)}'`);
        if (process.pid == undefined) {
            Log(Type.Error, `'${which.sync(executable)}' is not executable`);
        } else {
            Log(Type.Success, `local process '${which.sync(executable)}' initialized successfully: pid ${process.pid}`)
        }
        super(process.stdin);

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