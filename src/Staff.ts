import {ClefType, Note} from './MusicDefinitions'

export class Staff {

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

    this.getNoteName()
  }

  getAscii(): string[] {
    let musicArr: string[]

    musicArr = this.getAsciiClef()

    this.addNoteToStaff(musicArr)

    return musicArr
  }

  getAsciiClef(): string[] {
    switch(this.clefType) {
      case(ClefType.Treble):
        return(
                                     //     ID    Position
          [ String.raw`            ` // D   26    9
          , String.raw`            ` // C   25    8
          , String.raw`            ` // B   24    7
          , String.raw`      |\    ` // A   23    6
          , String.raw`      |/    ` // G   22    5
          , String.raw`------|-----` // F   21    4
          , String.raw`     /|     ` // E   20    3
          , String.raw`----/-|-----` // D   19    2
          , String.raw`   / _|_    ` // C   18    1
          , String.raw`--/-/-|-\---` // B   17    0
          , String.raw` ( (  |  \  ` // A   16    -1
          , String.raw`--\-\_|)-/--` // G   15    -2
          , String.raw`   \__|_/   ` // F   14    -3
          , String.raw`------|-----` // E   13    -4
          , String.raw`      |     ` // D   12    -5
          ,           "    `-'     " // C   11    -6
          , String.raw`            ` // B   10    -7
          , String.raw`            ` // A   9     -8
          , String.raw`            ` // G   8     -9
          ]
        )

      case(ClefType.Bass):
        return(
                                     //     ID    Position
          [ String.raw`            ` // F   28    9
          , String.raw`            ` // E   27    8
          , String.raw`            ` // D   26    7
          , String.raw`            ` // C   25    6
          , String.raw`   __       ` // B   24    5
          , String.raw`-/----\-----` // A   23    4
          ,           " `()   | o  " // G   22    3
          , String.raw`-------|----` // F   21    2
          , String.raw`       | o  ` // E   20    1
          , String.raw`------/-----` // D   19    0
          , String.raw`     /      ` // C   18    -1
          , String.raw`----/-------` // B   17    -2
          , String.raw`   /        ` // A   16    -3
          , String.raw`------------` // G   15    -4
          , String.raw`            ` // F   14    -5
          , String.raw`            ` // E   13    -6
          , String.raw`            ` // D   12    -7
          , String.raw`            ` // C   11    -8
          , String.raw`            ` // B   10    -9
          ]
        )

      throw 'No clef in staff object'
    }
  }

  addNoteToStaff(staff: string[]): void {
    let middleOfStaff: number
    let finalNotePosition: number
    let staffExtension: string[]

    staffExtension =
      [ String.raw`            `
      , String.raw`            `
      , String.raw`            `
      , String.raw`            `
      , String.raw`            `
      , String.raw`------------`
      , String.raw`            `
      , String.raw`------------`
      , String.raw`            `
      , String.raw`------------`
      , String.raw`            `
      , String.raw`------------`
      , String.raw`            `
      , String.raw`------------`
      , String.raw`            `
      , String.raw`            `
      , String.raw`            `
      , String.raw`            `
      , String.raw`            `
      ]

    middleOfStaff = Math.floor(staff.length / 2)
    finalNotePosition = middleOfStaff + this.notePosition

    if(this.notePosition % 2 == 0) {
      if(Math.abs(this.notePosition) >= 6) {
        staffExtension[finalNotePosition] = String.raw`  --(::)--  `
      }
      else {
        staffExtension[finalNotePosition] = String.raw`----(::)----`
      }
    }
    else {
      staffExtension[finalNotePosition] = String.raw`    (::)    `
    }

    for(var i = 0; i < staff.length; i++) {
      staff[i] += staffExtension[i]
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
}
