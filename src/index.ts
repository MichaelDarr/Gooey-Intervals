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

process.stdout.write(staff.getAscii().join('\n') + CURSOR_HIDE)

var thisIsATest = false

var stdin = process.stdin
stdin.setRawMode( true )
stdin.resume()
stdin.setEncoding( 'utf8' )

stdin.on( 'data', function( key ){

  switch(key) {
    case '\u0003':
      process.exit();
    case '\u001b[A':
      staff.keystrokeUp()
      break
    case '\u001b[B':
      staff.keystrokeDown()
      break
    case '\u001b[C':
      staff.keystrokeLeft()
      break
    case '\u001b[D':
      staff.keystrokeRight()
      break
    case '\r':
      staff.keystrokeEnter();
      break
    case 't':
      staff = new Staff(ClefType.Treble)
      break
    case 'b':
      staff = new Staff(ClefType.Bass)
      break
  }
});


setInterval(() => {
  rewriteLines(staff.getAscii())
}, 30)




function rewriteLines(lines: string[]) {
  for(var i = 0; i < lines.length - 1; i++) {
    process.stdout.write(ERASE_LINE + CURSOR_UP)
  }
  process.stdout.write(ERASE_LINE + CURSOR_LEFT + CURSOR_HIDE)

  process.stdout.write(lines.join('\n'))
}
