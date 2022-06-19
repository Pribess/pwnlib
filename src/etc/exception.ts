/*
        Copyright (C) 2022 Heewon Cho
        exception.ts
*/

import { bold, cyan, gray, red, yellow } from "colorette";
import process from "process";

export enum Type {
    Notify,
    Progress,
    Error,
    Warn,
    Success
};

export function Exception(type: Type, err: string) {
    switch (type) {
        case Type.Notify:
            err = `[${bold(cyan("*"))}] ${err}`
            console.log(err);
            break;
        case Type.Progress:
            err = `[${bold(gray("~"))}] ${err}`
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
            err = `[${bold(red("+"))}] ${err}`
            console.log(err);
            break;
    }
};