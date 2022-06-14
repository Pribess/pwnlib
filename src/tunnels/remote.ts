/*
        Copyright (C) 2022 Heewon Cho
        remote.ts
*/

import net from "net";

import Pipe from "./primitives/pipe.js";

export default class Remote extends Pipe {
    constructor(host: string, port: number) {
        super(net.connect({ host: host, port: port }));
        this.stream.on("data", (data) => {
            this.buffer.push(data);
            this.emitter.emit("BufferFilled");
        });
    }
};