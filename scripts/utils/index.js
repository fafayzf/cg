const simpleGit = require('simple-git')

module.exports = simpleGit({
  progress ({method, stage, progress}) {
    console.log(`git.${ method } ${ stage } stage ${ progress }% complete`)
  }
})