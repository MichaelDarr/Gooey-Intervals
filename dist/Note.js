"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MusicDefinitions_1 = require("./MusicDefinitions");
class Note {
    constructor(clefType, previousNote) {
        this.clefType = clefType;
        this.previousNote = previousNote;
        this.notePosition = 0;
        this.noteAccidentals = 0;
        switch (clefType) {
            case (MusicDefinitions_1.ClefType.Treble):
                this.noteIdentifier = 15;
                break;
            case (MusicDefinitions_1.ClefType.Bass):
                this.noteIdentifier = 17;
                break;
        }
        if (previousNote) {
            this.noteIdentifier = previousNote.noteIdentifier;
            this.notePosition = previousNote.notePosition;
            this.noteAccidentals = previousNote.noteAccidentals;
        }
    }
    addNoteToStaff(staffExtension) {
        let middleOfStaff;
        let finalNotePosition;
        let accidentalString;
        middleOfStaff = Math.floor(staffExtension.length / 2);
        finalNotePosition = middleOfStaff - this.notePosition;
        if (this.notePosition % 2 == 0) {
            if (Math.abs(this.notePosition) >= 6) {
                staffExtension[finalNotePosition] = this.createAccidentalString('   -') + String.raw `(||)-   `;
            }
            else {
                staffExtension[finalNotePosition] = this.createAccidentalString('----') + String.raw `(||)----`;
            }
        }
        else {
            staffExtension[finalNotePosition] = this.createAccidentalString('    ') + String.raw `(||)    `;
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
    createAccidentalString(baseString) {
        let accidentalString = '';
        let accidentalsAreSharp = (this.noteAccidentals > 0);
        for (var i = 0; i < Math.abs(this.noteAccidentals); i++) {
            accidentalString += (accidentalsAreSharp ? '#' : 'b');
        }
        return baseString.slice(0, 4 - accidentalString.length) + accidentalString;
    }
    //ASCII: A - G = 65 - 71
    getNoteName() {
        let noteRelativeNum;
        let noteString;
        let accidentalsAreSharp = (this.noteAccidentals > 0);
        noteRelativeNum = this.noteIdentifier % 7;
        noteRelativeNum += 65;
        noteString = String.fromCharCode(noteRelativeNum);
        for (var i = 0; i < Math.abs(this.noteAccidentals); i++) {
            noteString += (accidentalsAreSharp ? '#' : 'b');
        }
        return noteString;
    }
    // A = 0, G# = 11
    getNoteChromatic() {
        let noteRelativeNum;
        let accidentalsAreSharp = (this.noteAccidentals > 0);
        noteRelativeNum = this.noteIdentifier % 7;
        switch (noteRelativeNum) {
            case 1:
            case 2:
                noteRelativeNum += 1;
                break;
            case 3:
                noteRelativeNum += 2;
                break;
            case 4:
            case 5:
                noteRelativeNum += 3;
                break;
            case 6:
                noteRelativeNum += 4;
        }
        for (var i = 0; i < Math.abs(this.noteAccidentals); i++) {
            noteRelativeNum += ((accidentalsAreSharp) ? 1 : -1);
        }
        return noteRelativeNum;
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
        if (this.previousNote && this.previousNote.notePosition >= this.notePosition)
            return;
        this.noteIdentifier -= 1;
        this.notePosition -= 1;
    }
    addSharps() {
        if (this.noteAccidentals < 3) {
            this.noteAccidentals += 1;
        }
    }
    addFlats() {
        if (this.noteAccidentals > -3) {
            this.noteAccidentals -= 1;
        }
    }
}
exports.Note = Note;
