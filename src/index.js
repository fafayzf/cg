// read version
const packageConfig = require('../package.json')

// git push 
const push = require('./git-shell/git-push')
const { program } = require('commander')

// output version
program.version(packageConfig.version)

// command
program
  .command('push')
  .action(() => {
    push()
  })

program.parse(process.argv)