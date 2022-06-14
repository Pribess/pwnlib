/*
        Copyright (C) 2022 Heewon Cho
        waitfor.ts
*/

import { EventEmitter } from "stream";

export default function WaitFor(emitter: EventEmitter, event: string, callback?: (err: any) => void): Promise<void> {
    const promise = new Promise<void>((resolve, reject) => {
        const startListening = (): void => {
            emitter.addListener(event, handleEvent);
            emitter.addListener("error", handleError);
        };
      
        const stopListening = (): void => {
            emitter.removeListener(event, handleEvent);
            emitter.removeListener("error", handleError);
        };
      
        const handleEvent = (): void => {
            stopListening();
            resolve();
        };
      
        const handleError = (err: any): void => {
            stopListening();
            reject(err);
        };
      
        startListening();
    });

    if (callback) {

    }

    return promise;
};