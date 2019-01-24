import process = require('process')

import {ClefType} from './MusicDefinitions'
import {Staff} from './Staff'

const ESC         = '\u001B['
    , ERASE_LINE  = ESC + '2K'
    , CURSOR_UP   = ESC + 'A'
    , CURSOR_LEFT = ESC + 'G'
    , CURSOR_HIDE = ESC + '?25l'

let staff: Staff

staff = new Staff(ClefType.Treble)

process.stdout.write(staff.getAscii().join('\n'))

var thisIsATest = false

/*setInterval(() => {
  rewriteLines(staff.getAscii())
}, 500)*/




function rewriteLines(lines: string[]) {
  for(var i = 0; i < lines.length - 1; i++) {
    process.stdout.write(ERASE_LINE + CURSOR_UP)
  }
  process.stdout.write(ERASE_LINE + CURSOR_LEFT + CURSOR_HIDE)

  process.stdout.write(lines.join('\n'))
}
