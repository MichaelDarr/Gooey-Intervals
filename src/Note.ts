import {ClefType} from './MusicDefinitions'

export class Note {

  noteIdentifier: number
  notePosition: number

  constructor(public clefType: ClefType) {

    this.notePosition = 0

    switch(clefType) {
      case(ClefType.Treble):
        this.noteIdentifier = 17
        break
      case(ClefType.Bass):
        this.noteIdentifier = 19
        break
    }
  }

  addNoteToStaff(staffExtension: string[]): void {
    let middleOfStaff: number
    let finalNotePosition: number

    middleOfStaff = Math.floor(staffExtension.length / 2)
    finalNotePosition = middleOfStaff - this.notePosition

    if(this.notePosition % 2 == 0) {
      if(Math.abs(this.notePosition) >= 6) {
        staffExtension[finalNotePosition] = String.raw`   -(::)-   `
      }
      else {
        staffExtension[finalNotePosition] = String.raw`----(::)----`
      }
    }
    else {
      staffExtension[finalNotePosition] = String.raw`    (::)    `
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

  //ASCII: A - G = 65 - 71
  getNoteName(): string {
    let noteRelativeNum: number
    let noteChar: string

    noteRelativeNum = this.noteIdentifier % 8
    noteRelativeNum += 65

    noteChar = String.fromCharCode(noteRelativeNum)

    return noteChar
  }

  moveUp(): void {
    if(this.notePosition >= 11) return
    this.noteIdentifier += 1
    this.notePosition += 1
  }

  moveDown(): void {
    if(this.notePosition <= -11) return
    this.noteIdentifier -= 1
    this.notePosition -= 1
  }
}
