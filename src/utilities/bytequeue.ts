/*
        Copyright (C) 2022 Heewon Cho
        bytequeue.ts
*/


export default class ByteQueue {
    queue: ArrayBuffer;

    constructor() {
        this.queue = new ArrayBuffer(0);
    }

    push(bytearray: Uint8Array): void {
        const origin = this.queue;
        this.queue = new ArrayBuffer(bytearray.length + this.queue.byteLength);
        const view = new Uint8Array(this.queue);
        for (const [index, value] of view.entries()) {
            if (index < origin.byteLength) {
                view[index] = new Uint8Array(origin)[index];
            } else {
                view[index] = new Uint8Array(bytearray)[index - origin.byteLength];
            }
        }
    }

    pop(size: number): Uint8Array {
        if (this.queue.byteLength < size) {
            throw new Error("Out of range.");
        }
        let result: Uint8Array = new Uint8Array(new ArrayBuffer(size));
        for (const [index, value] of new Uint8Array(this.queue).entries()) {
            if (index < size) {
                result[index] = value;
            }
        }
        this.queue = this.queue.slice(size);
        return result;
    }

    getSize(): number {
        return this.queue.byteLength;
    }
  }