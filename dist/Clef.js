"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MusicDefinitions_1 = require("./MusicDefinitions");
class Clef {
    constructor(clefType) {
        this.clefType = clefType;
    }
    staffAscii() {
        switch (this.clefType) {
            case (MusicDefinitions_1.ClefType.Treble):
                return ([String.raw `      |\    `,
                    String.raw `      |/    `,
                    String.raw `------|-----`,
                    String.raw `     /|     `,
                    String.raw `----/-|-----`,
                    String.raw `   / _|_    `,
                    String.raw `--/-/-|-\---`,
                    String.raw ` ( (  |  \  `,
                    String.raw `--\-\_|)-/--`,
                    String.raw `   \__|_/   `,
                    String.raw `------|-----`,
                    String.raw `      |     `,
                    "    `-'     "
                ]);
            case (MusicDefinitions_1.ClefType.Bass):
                return ([String.raw `            `,
                    String.raw `   __       `,
                    String.raw `-/----\-----`,
                    " `()   | o  ",
                    String.raw `-------|----`,
                    String.raw `       | o  `,
                    String.raw `------/-----`,
                    String.raw `     /      `,
                    String.raw `----/-------`,
                    String.raw `   /        `,
                    String.raw `------------`,
                    String.raw `            `,
                    String.raw `            `
                ]);
                throw 'No clef in Cleff object';
        }
    }
}
exports.Clef = Clef;
