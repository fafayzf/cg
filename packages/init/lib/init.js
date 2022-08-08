const simpleGit = require('simple-git')

module.exports = (options) => simpleGit({
  ...options,
  progress({
    method,
    stage,
    progress
  }) {
    console.log(`git.${ method } ${ stage } stage ${ progress }% complete`)
  }
})