/*
        Copyright (C) 2022 Heewon Cho
        elf.ts
*/

import { green, red, yellow } from "colorette";
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

export function ELF(filepath: string): Elf {
    return new Elf(filepath);
}

export class Elf {
    data: Uint8Array;
    view: DataView;

    bits: number;
    endian: string;

    islittle: boolean;

    elf_header: {
        e_ident:        string,
        e_type:         bigint,
        e_machine:      bigint,
        e_version:      bigint,
        e_entry:        bigint,
        e_phoff:        bigint,
        e_shoff:        bigint,
        e_flags:        bigint,
        e_ehsize:       bigint,
        e_phentsize:    bigint,
        e_phnum:        bigint,
        e_shentsize:    bigint,
        e_shnum:        bigint,
        e_shstrndx:     bigint
    };

    pheaders: {
        p_type:         bigint,
        p_flags:        bigint,
        p_offset:       bigint,
        p_vaddr:        bigint,
        p_paddr:        bigint,
        p_filesz:       bigint,
        p_memsz:        bigint,
        p_align:        bigint
    }[];

    sheaders: {
        sh_name:        string,
        sh_type:        bigint,
        sh_flags:       bigint,
        sh_addr:        bigint,
        sh_offset:      bigint,
        sh_size:        bigint,
        sh_link:        bigint,
        sh_info:        bigint,
        sh_addralign:   bigint,
        sh_entsize:     bigint
    }[];

    constructor(filepath: string) {
        if (!fs.existsSync(filepath)) {
            Log(Type.Error, `no such file or directory: '${filepath}'`);
        } else if (!fs.lstatSync(filepath).isFile() ) {
            Log(Type.Error, `is not a file: '${filepath}'`);
        }
        try {
            fs.accessSync(filepath, fs.constants.R_OK);
        } catch (err) {
            Log(Type.Error, `permission denied: '${filepath}'`);
        }

        this.data = fs.readFileSync(path.resolve(filepath));
        path.resolve()
        this.view = new DataView(this.data.buffer);

        if (Uint8ArrayToString(this.data.slice(0, 4)) != "\x7FELF") {
            Log(Type.Error, "invalid ELF magic number '" + EscapedString((Uint8ArrayToString(this.data.slice(0, 4)))) + "'");
        }

        const e_ident = this.data.slice(0, 16);
        this.bits = e_ident[4] == 1 ? 32 : 64;
        this.endian = e_ident[5] == 1 ? "little" : "big";
        
        this.islittle = this.endian == "little" ? true : false;

        this.elf_header = this.bits == 32 ? {
            e_ident:        Uint8ArrayToString(this.data.slice(0, 16)),
            e_type:         BigInt(this.view.getUint16(16, this.islittle)),
            e_machine:      BigInt(this.view.getUint16(18, this.islittle)),
            e_version:      BigInt(this.view.getUint32(20, this.islittle)),
            e_entry:        BigInt(this.view.getUint32(24, this.islittle)),
            e_phoff:        BigInt(this.view.getUint32(28, this.islittle)),
            e_shoff:        BigInt(this.view.getUint32(32, this.islittle)),
            e_flags:        BigInt(this.view.getUint32(36, this.islittle)),
            e_ehsize:       BigInt(this.view.getUint16(40, this.islittle)),
            e_phentsize:    BigInt(this.view.getUint16(42, this.islittle)),
            e_phnum:        BigInt(this.view.getUint16(44, this.islittle)),
            e_shentsize:    BigInt(this.view.getUint16(46, this.islittle)),
            e_shnum:        BigInt(this.view.getUint16(48, this.islittle)),
            e_shstrndx:     BigInt(this.view.getUint16(50, this.islittle))
        } : {
            e_ident:        Uint8ArrayToString(this.data.slice(0, 16)),
            e_type:         BigInt(this.view.getUint16(16, this.islittle)),
            e_machine:      BigInt(this.view.getUint16(18, this.islittle)),
            e_version:      BigInt(this.view.getUint32(20, this.islittle)),
            e_entry:        BigInt(this.view.getBigUint64(24, this.islittle)),
            e_phoff:        BigInt(this.view.getBigUint64(32, this.islittle)),
            e_shoff:        BigInt(this.view.getBigUint64(40, this.islittle)),
            e_flags:        BigInt(this.view.getUint32(48, this.islittle)),
            e_ehsize:       BigInt(this.view.getUint16(52, this.islittle)),
            e_phentsize:    BigInt(this.view.getUint16(54, this.islittle)),
            e_phnum:        BigInt(this.view.getUint16(56, this.islittle)),
            e_shentsize:    BigInt(this.view.getUint16(58, this.islittle)),
            e_shnum:        BigInt(this.view.getUint16(60, this.islittle)),
            e_shstrndx:     BigInt(this.view.getUint16(62, this.islittle))
        };

        this.pheaders = [];

        for (let idx: bigint = BigInt(0) ; idx < this.elf_header.e_phnum ; idx++) {
            let offset: number = Number(this.elf_header.e_phoff + idx * this.elf_header.e_phentsize);
            this.pheaders.push(this.bits == 32 ? {
                p_type:     BigInt(this.view.getUint32(offset, this.islittle)),
                p_offset:   BigInt(this.view.getUint32(offset + 0x04, this.islittle)),
                p_vaddr:    BigInt(this.view.getUint32(offset + 0x08, this.islittle)),
                p_paddr:    BigInt(this.view.getUint32(offset + 0x0C, this.islittle)),
                p_filesz:   BigInt(this.view.getUint32(offset + 0x10, this.islittle)),
                p_memsz:    BigInt(this.view.getUint32(offset + 0x14, this.islittle)),
                p_flags:    BigInt(this.view.getUint32(offset + 0x18, this.islittle)),
                p_align:    BigInt(this.view.getUint32(offset + 0x1C, this.islittle))
            } : {
                p_type:     BigInt(this.view.getUint32(offset, this.islittle)),
                p_flags:    BigInt(this.view.getUint32(offset + 0x04, this.islittle)),
                p_offset:   BigInt(this.view.getBigUint64(offset + 0x08, this.islittle)),
                p_vaddr:    BigInt(this.view.getBigUint64(offset + 0x10, this.islittle)),
                p_paddr:    BigInt(this.view.getBigUint64(offset + 0x18, this.islittle)),
                p_filesz:   BigInt(this.view.getBigUint64(offset + 0x20, this.islittle)),
                p_memsz:    BigInt(this.view.getBigUint64(offset + 0x28, this.islittle)),
                p_align:    BigInt(this.view.getBigUint64(offset + 0x30, this.islittle))
            });
        }

        this.sheaders = [];

        const address: number = Number(this.elf_header.e_shoff + (this.elf_header.e_shnum - 1n) * this.elf_header.e_shentsize);
        const shrtrtab: bigint = this.bits == 32 ? BigInt(this.view.getUint32(address + 0x10, this.islittle)) : BigInt(this.view.getBigUint64(address + 0x18, this.islittle));

        for (let idx: bigint = BigInt(1) ; idx < this.elf_header.e_shnum - 1n ; idx++) {
            let offset: number = Number(this.elf_header.e_shoff + idx * this.elf_header.e_shentsize);
            const sh_name: bigint = this.bits == 32 ? BigInt(this.view.getUint32(offset, this.islittle)) : BigInt(this.view.getUint32(offset, this.islittle));
            
            let name: string = "";
            for (let idx: bigint = BigInt(0) ; this.data[Number(shrtrtab + sh_name + idx)] != 0x00 ; idx++) {
                name = name + String.fromCharCode(this.data[Number(shrtrtab + sh_name + idx)]);
            }

            this.sheaders.push(this.bits == 32 ? {
                sh_name:        name,
                sh_type:        BigInt(this.view.getUint32(offset + 0x04, this.islittle)),
                sh_flags:       BigInt(this.view.getUint32(offset + 0x08, this.islittle)),
                sh_addr:        BigInt(this.view.getUint32(offset + 0x0C, this.islittle)),
                sh_offset:      BigInt(this.view.getUint32(offset + 0x10, this.islittle)),
                sh_size:        BigInt(this.view.getUint32(offset + 0x14, this.islittle)),
                sh_link:        BigInt(this.view.getUint32(offset + 0x18, this.islittle)),
                sh_info:        BigInt(this.view.getUint32(offset + 0x1C, this.islittle)),
                sh_addralign:   BigInt(this.view.getUint32(offset + 0x20, this.islittle)),
                sh_entsize:     BigInt(this.view.getUint32(offset + 0x24, this.islittle))
            } : {
                sh_name:        name,
                sh_type:        BigInt(this.view.getUint32(offset + 0x04, this.islittle)),
                sh_flags:       BigInt(this.view.getBigUint64(offset + 0x08, this.islittle)),
                sh_addr:        BigInt(this.view.getBigUint64(offset + 0x10, this.islittle)),
                sh_offset:      BigInt(this.view.getBigUint64(offset + 0x18, this.islittle)),
                sh_size:        BigInt(this.view.getBigUint64(offset + 0x20, this.islittle)),
                sh_link:        BigInt(this.view.getUint32(offset + 0x28, this.islittle)),
                sh_info:        BigInt(this.view.getUint32(offset + 0x2C, this.islittle)),
                sh_addralign:   BigInt(this.view.getBigUint64(offset + 0x30, this.islittle)),
                sh_entsize:     BigInt(this.view.getBigUint64(offset + 0x38, this.islittle))
            });
        }

        console.log(this.elf_header, this.pheaders, this.sheaders);
        Log(Type.Notify, `'${path.resolve(filepath)}'`);
        console.log(this.checksec());
    }

    checksec(): string {
        return  `    Arch:     ${machinecode[Number(this.elf_header.e_machine)]}-${this.bits}-${this.endian}\n` +
                `    RELRO:    ${this.relro}\n` +
                `    SSP:      \n` +
                `    NX:       \n` +
                `    PIE:      `
    }

    get relro(): string {
        return this.pheaders.some((element): boolean => {
            if (element.p_type == BigInt(0x6474e552)) {
                return true;
            } else {
                return false;
            }
        }) ? (this.sheaders.some((element) => {
            if (element.sh_name == ".plt.got") {
                return true;
            } else {
                return false;
            }
        }) ? green("Full RELRO") : yellow("Partial RELRO")) : red("No RELRO");
    }
};