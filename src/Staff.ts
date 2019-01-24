import {ClefType} from './MusicDefinitions'

export class Staff {
  constructor(public clefType: ClefType) {
  }

  getAscii(): string[] {
    switch(this.clefType) {
      case(ClefType.Treble):
        return(
          [ String.raw`      |\    `
          , String.raw`      |/    `
          , String.raw`------|-----`
          , String.raw`     /|     `
          , String.raw`----/-|-----`
          , String.raw`   / _|_    `
          , String.raw`--/-/-|-\---`
          , String.raw` ( (  |  \  `
          , String.raw`--\-\_|)-/--`
          , String.raw`   \__|_/   `
          , String.raw`------|-----`
          , String.raw`      |     `
          ,           "    `-'     "
          ]
        )
      case(ClefType.Bass):
        return(
          [ String.raw`            `
          , String.raw`   __       `
          , String.raw`-/----\-----`
          ,           " `()   | o  "
          , String.raw`-------|----`
          , String.raw`       | o  `
          , String.raw`------/-----`
          , String.raw`     /      `
          , String.raw`----/-------`
          , String.raw`   /        `
          , String.raw`------------`
          , String.raw`            `
          , String.raw`            `
          ]
        )

      throw 'No clef in staff object'
    }

  }
}
