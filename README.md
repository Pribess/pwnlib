# pwnlib - pwnable libary for node.js

<img src="https://img.shields.io/github/last-commit/pribess/pwnlib?style=flat-square"></img>
<img src="https://img.shields.io/npm/dt/pwnlib?style=flat-square"></img>
<img src="https://img.shields.io/npm/l/pwnlib?style=flat-square">
<a href="https://discord.gg/Vdns6W3Bfz"><img src="https://img.shields.io/discord/986318660803108935?color=7289da&label=%20&logo=discord&logoColor=white&style=flat-square"></a>

```javascript
import * as pwn from "pwnlib";

const r = pwn.remote("example.com", 12345);

const sh = pwn.shcraft()
            .sh();

r.send(sh.bin);
pwn.stdio(r.stream);
```

in typescript

```typescript
import * as pwn from "pwnlib";

const r: pwn.Remote = pwn.remote("example.com", 12345);

const sh: pwn.ShellCraft = pwn.shcraft()
            .sh();

r.send(sh.bin);
pwn.stdio(r.stream);
```
