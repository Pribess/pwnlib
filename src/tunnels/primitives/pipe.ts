/*
        Copyright (C) 2022 Heewon Cho
        pipe.ts
*/


import net from "net";

import EventEmitter from "events";
import { Writable } from "stream";
import ByteQueue from "../../utilities/bytequeue.js";
import WaitFor from "../../utilities/waitfor.js";

export default class Pipe {
    stream: Writable & net.Socket;
    buffer: ByteQueue;
    emitter: EventEmitter;

    constructor(stream: any) {
        this.stream = stream;
        this.buffer = new ByteQueue();
        this.emitter = new EventEmitter();
    }

    send(data: Uint8Array): void {
        this.stream.write(data);
    }

    async recv(size: number): Promise<Uint8Array> {
        while (true) {
            try {
                return this.buffer.pop(size);
            } catch (e) {
                await WaitFor(this.emitter, "BufferFilled");
            }
        }
    }

};