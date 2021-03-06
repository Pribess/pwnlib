/*
        Copyright (C) 2022 Heewon Cho
        pipe.ts
*/

import EventEmitter from "events";
import { Writable } from "stream";
import ByteQueue from "../../etc/bytequeue.js";
import WaitFor from "../../etc/waitfor.js";

export default class Pipe {
    stream: Writable;
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