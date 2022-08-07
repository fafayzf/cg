const simpleGit = require('simple-git')

const git = simpleGit({
  progress({
    method,
    stage,
    progress
  }) {
    console.log(`git.${ method } ${ stage } stage ${ progress }% complete`)
  }
})

module.exports = git