/*
        Copyright (C) 2022 Heewon Cho
        remote.ts
*/

import net from "net";
import { Log, Type } from "../etc/log.js";

import Pipe from "./primitives/pipe.js";

export function remote(host: string, port: number): Remote {
    return new Remote(host, port);
}
export class Remote extends Pipe {
    host: string;
    port: number;

    constructor(host: string, port: number) {
        Log(Type.Progress, `opening connection to ${host} on port ${port}`);
        super(net.connect({ host: host, port: port }));
        Log(Type.Success, `opening connection to ${host} on port ${port}: Done`);
        this.host = host;
        this.port = port;
        this.stream.on("data", (data) => {
            this.buffer.push(data);
            this.emitter.emit("BufferFilled");
        });
    }

    release(): void {
        this.stream.destroy();
        Log(Type.Notify, `closed connection to ${this.host} on port ${this.port}`)
    }
};