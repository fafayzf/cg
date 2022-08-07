const git = require('@f-git/init')
const colors = require('colors')

module.exports = async (options) => {
  try {
    await git.stash(options)
    console.log('stash complete!')
  } catch (err) {
    console.log(colors.red(err.message))
  }
}