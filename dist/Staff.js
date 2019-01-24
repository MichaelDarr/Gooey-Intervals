"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MusicDefinitions_1 = require("./MusicDefinitions");
const Note_1 = require("./Note");
class Staff {
    constructor(clefType) {
        this.clefType = clefType;
        this.notes = [];
        this.notes;
        this.notes[0] = new Note_1.Note(clefType);
    }
    getAscii() {
        let musicArr;
        musicArr = this.getAsciiClef();
        this.addNotesToStaff(musicArr);
        return musicArr;
    }
    getAsciiClef() {
        switch (this.clefType) {
            case (MusicDefinitions_1.ClefType.Treble):
                return (
                //     ID    Position
                [String.raw `            ` // F   28    11
                    ,
                    String.raw `            ` // E   27    10
                    ,
                    String.raw `            ` // D   26    9
                    ,
                    String.raw `            ` // C   25    8
                    ,
                    String.raw `            ` // B   24    7
                    ,
                    String.raw `      |\    ` // A   23    6
                    ,
                    String.raw `      |/    ` // G   22    5
                    ,
                    String.raw `------|-----` // F   21    4
                    ,
                    String.raw `     /|     ` // E   20    3
                    ,
                    String.raw `----/-|-----` // D   19    2
                    ,
                    String.raw `   / _|_    ` // C   18    1
                    ,
                    String.raw `--/-/-|-\---` // B   17    0
                    ,
                    String.raw ` ( (  |  \  ` // A   16    -1
                    ,
                    String.raw `--\-\_|)-/--` // G   15    -2
                    ,
                    String.raw `   \__|_/   ` // F   14    -3
                    ,
                    String.raw `------|-----` // E   13    -4
                    ,
                    String.raw `      |     ` // D   12    -5
                    ,
                    "    `-'     " // C   11    -6
                    ,
                    String.raw `            ` // B   10    -7
                    ,
                    String.raw `            ` // A   9     -8
                    ,
                    String.raw `            ` // G   8     -9
                    ,
                    String.raw `            ` // A   7     -10
                    ,
                    String.raw `            ` // G   6     -11
                ]);
            case (MusicDefinitions_1.ClefType.Bass):
                return (
                //     ID    Position
                [String.raw `            ` // F   30    11
                    ,
                    String.raw `            ` // E   29    10
                    ,
                    String.raw `            ` // F   28    9
                    ,
                    String.raw `            ` // E   27    8
                    ,
                    String.raw `            ` // D   26    7
                    ,
                    String.raw `            ` // C   25    6
                    ,
                    String.raw `   __       ` // B   24    5
                    ,
                    String.raw `-/----\-----` // A   23    4
                    ,
                    " `()   | o  " // G   22    3
                    ,
                    String.raw `-------|----` // F   21    2
                    ,
                    String.raw `       | o  ` // E   20    1
                    ,
                    String.raw `------/-----` // D   19    0
                    ,
                    String.raw `     /      ` // C   18    -1
                    ,
                    String.raw `----/-------` // B   17    -2
                    ,
                    String.raw `   /        ` // A   16    -3
                    ,
                    String.raw `------------` // G   15    -4
                    ,
                    String.raw `            ` // F   14    -5
                    ,
                    String.raw `            ` // E   13    -6
                    ,
                    String.raw `            ` // D   12    -7
                    ,
                    String.raw `            ` // C   11    -8
                    ,
                    String.raw `            ` // B   10    -9
                    ,
                    String.raw `            ` // A   9    -10
                    ,
                    String.raw `            ` // G   8    -11
                ]);
                throw 'No clef in staff object';
        }
    }
    addNotesToStaff(staff) {
        let staffExtension;
        staffExtension =
            [String.raw `            `,
                String.raw `            `,
                String.raw `            `,
                String.raw `            `,
                String.raw `            `,
                String.raw `            `,
                String.raw `            `,
                String.raw `------------`,
                String.raw `            `,
                String.raw `------------`,
                String.raw `            `,
                String.raw `------------`,
                String.raw `            `,
                String.raw `------------`,
                String.raw `            `,
                String.raw `------------`,
                String.raw `            `,
                String.raw `            `,
                String.raw `            `,
                String.raw `            `,
                String.raw `            `,
                String.raw `            `,
                String.raw `            `
            ];
        for (var i = 0; i < this.notes.length; i++) {
            this.notes[i].addNoteToStaff(staffExtension);
        }
        for (var i = 0; i < staff.length; i++) {
            staff[i] += staffExtension[i];
        }
    }
    moveNoteUp() {
        this.notes[this.notes.length - 1].moveUp();
    }
    moveNoteDown() {
        this.notes[this.notes.length - 1].moveDown();
    }
}
exports.Staff = Staff;
