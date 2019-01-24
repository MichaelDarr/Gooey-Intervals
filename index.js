const ESC         = '\u001B['
    , ERASE_LINE  = ESC + '2K'
    , CURSOR_UP   = ESC + 'A'
    , CURSOR_LEFT = ESC + 'G'

process.stdout.write('testing1\nthis is a test\ndo you hear me')

var thisIsATest = false

setInterval(() => {
  rewriteLines((thisIsATest) ? ['testing1', 'this is a test', 'do you hear me'] : ['testing2', 'this is not a test', 'you heard me'])
  thisIsATest = !thisIsATest
}, 500)




rewriteLines = (lines) => {
  for(var i = 0; i < lines.length - 1; i++) {
    process.stdout.write(ERASE_LINE + CURSOR_UP)
  }
  process.stdout.write(ERASE_LINE + CURSOR_LEFT)

  process.stdout.write(lines.join('\n'))
}
