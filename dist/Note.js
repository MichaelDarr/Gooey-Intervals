"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MusicDefinitions_1 = require("./MusicDefinitions");
class Note {
    constructor(clefType) {
        this.clefType = clefType;
        this.notePosition = 0;
        switch (clefType) {
            case (MusicDefinitions_1.ClefType.Treble):
                this.noteIdentifier = 17;
                break;
            case (MusicDefinitions_1.ClefType.Bass):
                this.noteIdentifier = 19;
                break;
        }
    }
    addNoteToStaff(staffExtension) {
        let middleOfStaff;
        let finalNotePosition;
        middleOfStaff = Math.floor(staffExtension.length / 2);
        finalNotePosition = middleOfStaff - this.notePosition;
        if (this.notePosition % 2 == 0) {
            if (Math.abs(this.notePosition) >= 6) {
                staffExtension[finalNotePosition] = String.raw `   -(::)-   `;
            }
            else {
                staffExtension[finalNotePosition] = String.raw `----(::)----`;
            }
        }
        else {
            staffExtension[finalNotePosition] = String.raw `    (::)    `;
        }
        let notePositionCounter = this.notePosition + (this.notePosition % 2);
        while (notePositionCounter > 7) {
            notePositionCounter -= 2;
            staffExtension[middleOfStaff - notePositionCounter] = String.raw `   ------   `;
        }
        while (notePositionCounter < -7) {
            notePositionCounter += 2;
            staffExtension[middleOfStaff - notePositionCounter] = String.raw `   ------   `;
        }
    }
    //ASCII: A - G = 65 - 71
    getNoteName() {
        let noteRelativeNum;
        let noteChar;
        noteRelativeNum = this.noteIdentifier % 8;
        noteRelativeNum += 65;
        noteChar = String.fromCharCode(noteRelativeNum);
        return noteChar;
    }
    moveUp() {
        if (this.notePosition >= 11)
            return;
        this.noteIdentifier += 1;
        this.notePosition += 1;
    }
    moveDown() {
        if (this.notePosition <= -11)
            return;
        this.noteIdentifier -= 1;
        this.notePosition -= 1;
    }
}
exports.Note = Note;
