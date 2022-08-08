const init = require('@f-git/init')
const colors = require('colors')
const git = init()

module.exports = async (options) => {
  try {
    await git.stash(options)
    console.log('stash complete!')
  } catch (err) {
    console.log(colors.red(err.message))
  }
}