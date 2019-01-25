import {ClefType} from './MusicDefinitions'

export class Note {

  noteIdentifier: number
  notePosition: number = 0
  noteAccidentals: number = 0

  constructor(public clefType: ClefType, public previousNote: Note) {

    switch(clefType) {
      case(ClefType.Treble):
        this.noteIdentifier = 15
        break
      case(ClefType.Bass):
        this.noteIdentifier = 17
        break
    }

    if(previousNote) {
      this.noteIdentifier = previousNote.noteIdentifier
      this.notePosition = previousNote.notePosition
      this.noteAccidentals = previousNote.noteAccidentals
    }
  }

  addNoteToStaff(staffExtension: string[]): void {
    let middleOfStaff: number
    let finalNotePosition: number
    let accidentalString: string

    middleOfStaff = Math.floor(staffExtension.length / 2)
    finalNotePosition = middleOfStaff - this.notePosition

    if(this.notePosition % 2 == 0) {
      if(Math.abs(this.notePosition) >= 6) {
        staffExtension[finalNotePosition] = this.createAccidentalString('   -') + String.raw`(||)-   `
      }
      else {
        staffExtension[finalNotePosition] = this.createAccidentalString('----') + String.raw`(||)----`
      }
    }
    else {
      staffExtension[finalNotePosition] = this.createAccidentalString('    ') + String.raw`(||)    `
    }

    let notePositionCounter: number = this.notePosition + (this.notePosition % 2)
    while(notePositionCounter > 7) {
      notePositionCounter -= 2
      staffExtension[middleOfStaff - notePositionCounter] = String.raw`   ------   `
    }

    while(notePositionCounter < -7) {
      notePositionCounter += 2
      staffExtension[middleOfStaff - notePositionCounter] = String.raw`   ------   `
    }
  }

  createAccidentalString(baseString: string): string {
    let accidentalString: string = ''
    let accidentalsAreSharp: boolean = (this.noteAccidentals > 0 )

    for(var i = 0; i < Math.abs(this.noteAccidentals); i++) {
      accidentalString += (accidentalsAreSharp ? '#' : 'b')
    }

    return baseString.slice(0, 4 - accidentalString.length) + accidentalString
  }

  //ASCII: A - G = 65 - 71
  getNoteName(): string {
    let noteRelativeNum: number
    let noteString: string
    let accidentalsAreSharp: boolean = (this.noteAccidentals > 0 )

    noteRelativeNum = this.noteIdentifier % 7
    noteRelativeNum += 65

    noteString = String.fromCharCode(noteRelativeNum)

    for(var i = 0; i < Math.abs(this.noteAccidentals); i++) {
      noteString += (accidentalsAreSharp ? '#' : 'b')
    }

    return noteString
  }

  // A = 0, G# = 11
  getNoteChromatic(): number {
    let noteRelativeNum: number
    let accidentalsAreSharp: boolean = (this.noteAccidentals > 0 )

    noteRelativeNum = this.noteIdentifier % 7

    switch(noteRelativeNum) {
      case 1: case 2:
        noteRelativeNum += 1
        break
      case 3:
        noteRelativeNum += 2
        break
      case 4: case 5:
        noteRelativeNum += 3
        break
      case 6:
        noteRelativeNum += 4
    }

    for(var i = 0; i < Math.abs(this.noteAccidentals); i++) {
      noteRelativeNum += ((accidentalsAreSharp) ? 1 : -1)
    }

    return noteRelativeNum
  }

  moveUp(): void {
    if(this.notePosition >= 11) return
    this.noteIdentifier += 1
    this.notePosition += 1
  }

  moveDown(): void {
    if(this.notePosition <= -11) return
    if(this.previousNote && this.previousNote.notePosition >= this.notePosition) return
    this.noteIdentifier -= 1
    this.notePosition -= 1
  }

  addSharps(): void {
    if(this.noteAccidentals < 3) {
      this.noteAccidentals += 1
    }
  }

  addFlats(): void {
    if(this.noteAccidentals > -3) {
      this.noteAccidentals -= 1
    }
  }
}
