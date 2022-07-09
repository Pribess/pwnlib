/*
        Copyright (C) 2022 Heewon Cho
        exception.ts
*/

import { bold, magenta, red, yellow, green, blue } from "colorette";
import process from "process";

export enum Type {
    Notify,
    Progress,
    Error,
    Warn,
    Success
};

export function Log(type: Type, err: string) {
    switch (type) {
        case Type.Notify:
            err = `[${bold(blue("*"))}] ${err}`
            console.log(err);
            break;
        case Type.Progress:
            err = `[${bold(magenta("~"))}] ${err}`
            console.log(err);
            break;
        case Type.Error:
            err = `[${bold(red("-"))}] ${err}`
            console.log(err);
            console.trace();
            process.exit(1);
            break;
        case Type.Warn:
            err = `[${bold(yellow("!"))}] ${err}`
            console.log(err);
            break;
        case Type.Success:
            err = `[${bold(green("+"))}] ${err}`
            console.log(err);
            break;
    }
};