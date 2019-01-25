"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MusicDefinitions_1 = require("./MusicDefinitions");
const Note_1 = require("./Note");
class Staff {
    constructor(clefType) {
        this.clefType = clefType;
        this.notes = [];
        this.isMovingNotes = true;
        this.notes;
        this.notes[0] = new Note_1.Note(clefType, null);
    }
    getAscii() {
        let musicArr;
        musicArr = this.getAsciiClef();
        this.addNotesToStaff(musicArr);
        musicArr.push('');
        if (this.isMovingNotes) {
            musicArr.push('Current note: ' + this.notes[this.notes.length - 1].getNoteName());
        }
        else {
            musicArr.push('Interval: ' + this.getQuality() + ' ' + this.getInterval());
        }
        musicArr.push('');
        return musicArr;
    }
    getQuality() {
        let halfStepsBase = this.notes[0].getNoteChromatic();
        let halfStepsTo = this.notes[1].getNoteChromatic();
        let halfStepsTotal = 0;
        let intervalName = this.getInterval();
        let halfStepsMajor = this.getMajorIntervalInHalfSteps();
        let halfStepsOff;
        let intervalRawNum = this.notes[1].notePosition - this.notes[0].notePosition + 1;
        let intervalNum = intervalRawNum % 9;
        while (halfStepsBase != halfStepsTo) {
            halfStepsTotal += 1;
            halfStepsBase += 1;
            if (halfStepsBase > 11) {
                halfStepsBase = 0;
            }
        }
        halfStepsOff = halfStepsTotal - halfStepsMajor;
        return this.getIntervalQuality(halfStepsOff);
    }
    getIntervalQuality(helfStepDifferential) {
        let intervalNum = this.notes[1].notePosition - this.notes[0].notePosition + 1;
        if (intervalNum > 8) {
            intervalNum = (intervalNum % 8) + 1;
        }
        let isPerfect = false;
        switch (intervalNum) {
            case 1:
            case 4:
            case 5:
            case 8:
                isPerfect = true;
        }
        if (isPerfect) {
            switch (helfStepDifferential) {
                case -3:
                    return "Triply Diminished";
                case -2:
                    return "Doubly Diminished";
                case -1:
                    return "Diminished";
                case 0:
                    return "Perfect";
                case 1:
                    return "Augmented";
                case 2:
                    return "Doubly Augmented";
                case 3:
                    return "Triply Augmented";
            }
        }
        switch (helfStepDifferential) {
            case -3:
                return "Doubly Diminished";
            case -2:
                return "Diminished";
            case -1:
                return "Minor";
            case 0:
                return "Major";
            case 1:
                return "Augmented";
            case 2:
                return "Doubly Augmented";
            case 3:
                return "Triply Augmented";
        }
    }
    getMajorIntervalInHalfSteps() {
        let intervalRawNum = this.notes[1].notePosition - this.notes[0].notePosition;
        let intervalNum = intervalRawNum % 7;
        switch (intervalNum) {
            case 1:
                return 2;
            case 2:
                return 4;
            case 3:
                return 5;
            case 4:
                return 7;
            case 5:
                return 9;
            case 6:
                return 11;
            default:
                return 0;
        }
    }
    getInterval() {
        let intervalNum = this.notes[1].notePosition - this.notes[0].notePosition + 1;
        let intervalString = '';
        switch (intervalNum) {
            case 1:
                intervalString += 'Unison';
                break;
            case 2:
                intervalString += '2nd';
                break;
            case 3:
                intervalString += '3rd';
                break;
            case 8:
                intervalString += 'Octave';
                break;
            default:
                intervalString += intervalNum.toString() + 'th';
        }
        return intervalString;
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
        let staffExtensionFull;
        for (var i = 0; i < this.notes.length; i++) {
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
            this.notes[i].addNoteToStaff(staffExtension);
            for (var k = 0; k < staff.length; k++) {
                staff[k] += staffExtension[k];
            }
        }
    }
    keystrokeUp() {
        this.notes[this.notes.length - 1].moveUp();
    }
    keystrokeDown() {
        this.notes[this.notes.length - 1].moveDown();
    }
    keystrokeLeft() {
        this.notes[this.notes.length - 1].addSharps();
    }
    keystrokeRight() {
        this.notes[this.notes.length - 1].addFlats();
    }
    keystrokeEnter() {
        if (this.notes.length < 2) {
            this.notes.push(new Note_1.Note(this.clefType, this.notes[0]));
        }
        else if (this.isMovingNotes) {
            this.isMovingNotes = false;
        }
        else {
            this.isMovingNotes = true;
            this.notes = [new Note_1.Note(this.clefType, null)];
        }
    }
}
exports.Staff = Staff;
