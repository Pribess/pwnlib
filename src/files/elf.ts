/*
        Copyright (C) 2022 Heewon Cho
        elf.ts
*/

import fs from "fs";
import path from "path";
import { EscapedString, StringToUint8Array, Uint8ArrayToString } from "../etc/data.js";
import { Log, Type } from "../etc/log.js";

const machinecode: {
        [code: number]: string;
    } = {
        0x3E: 'amd64',
        0x03: 'i386',
        0x28: 'arm',
        0xB7: 'aarch64',
        0x08: 'mips',
        0x14: 'powerpc',
        0x15: 'powerpc64',
        0x02: 'sparc',
        0x2B: 'sparc64',
        0x32: 'ia64',
        0xF3: 'riscv'
    }

export default class ELF {
    data: Uint8Array;
    view: DataView;

    bits: number;
    endian: string;

    elf_header: {
        e_ident: string,
        e_type: bigint,
        e_machine: bigint,
        e_version: bigint,
        e_entry: bigint,
        e_phoff: bigint,
        e_shoff: bigint,
        e_flags: bigint,
        e_ehsize: bigint,
        e_phentsize: bigint,
        e_phnum: bigint,
        e_shentsize: bigint,
        e_shnum: bigint,
        e_shstrndx: bigint
    };
    
    constructor(filepath: string) {
        this.data = fs.readFileSync(path.resolve(filepath));
        path.resolve()
        this.view = new DataView(this.data.buffer);

        if (Uint8ArrayToString(this.data.slice(0, 4)) != "\x7FELF") {
            Log(Type.Error, "invalid ELF magic number '" + EscapedString((Uint8ArrayToString(this.data.slice(0, 4)))) + "'");
        }

        const e_ident = this.data.slice(0, 16);
        this.bits = e_ident[4] == 1 ? 32 : 64;
        this.endian = e_ident[5] == 1 ? "little" : "big";

        this.elf_header = this.bits == 32 ? {
            e_ident:        Uint8ArrayToString(this.data.slice(0, 16)),
            e_type:         BigInt(this.view.getUint16(16, true)),
            e_machine:      BigInt(this.view.getUint16(18, true)),
            e_version:      BigInt(this.view.getUint32(20, true)),
            e_entry:        BigInt(this.view.getUint32(24, true)),
            e_phoff:        BigInt(this.view.getUint32(28, true)),
            e_shoff:        BigInt(this.view.getUint32(32, true)),
            e_flags:        BigInt(this.view.getUint32(36, true)),
            e_ehsize:       BigInt(this.view.getUint16(40, true)),
            e_phentsize:    BigInt(this.view.getUint16(42, true)),
            e_phnum:        BigInt(this.view.getUint16(44, true)),
            e_shentsize:    BigInt(this.view.getUint16(46, true)),
            e_shnum:        BigInt(this.view.getUint16(48, true)),
            e_shstrndx:     BigInt(this.view.getUint16(50, true))
        } : {
            e_ident:        Uint8ArrayToString(this.data.slice(0, 16)),
            e_type:         BigInt(this.view.getUint16(16, true)),
            e_machine:      BigInt(this.view.getUint16(18, true)),
            e_version:      BigInt(this.view.getUint32(20, true)),
            e_entry:        BigInt(this.view.getBigUint64(24, true)),
            e_phoff:        BigInt(this.view.getBigUint64(32, true)),
            e_shoff:        BigInt(this.view.getBigUint64(40, true)),
            e_flags:        BigInt(this.view.getUint32(48, true)),
            e_ehsize:       BigInt(this.view.getUint16(52, true)),
            e_phentsize:    BigInt(this.view.getUint16(54, true)),
            e_phnum:        BigInt(this.view.getUint16(56, true)),
            e_shentsize:    BigInt(this.view.getUint16(58, true)),
            e_shnum:        BigInt(this.view.getUint16(60, true)),
            e_shstrndx:     BigInt(this.view.getUint16(62, true))
        };

        console.log(this.elf_header);
        Log(Type.Notify, `'${path.resolve(filepath)}'`);
        console.log(this.checksec());
    }

    checksec(): string {
        return  `    Arch:     ${machinecode[Number(this.elf_header.e_machine)]}-${this.bits}-${this.endian}\n` +
                `    RELRO:    \n` +
                `    SSP:      \n` +
                `    NX:       \n` +
                `    PIE:      `
    }
};