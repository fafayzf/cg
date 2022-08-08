const git = require('@f-git/init')
const colors = require('colors')
const ora = require('ora')

module.exports = async (remote = 'origin', branch, options) => {
  const { current } = await git.status()
  branch = branch || current

  const spinner = ora(`pull 至本地分支: ${colors.yellow(current)} 中...`).start()

  try {
    await git.pull(remote, branch, options)
    spinner.stop()
    console.log('pull complete!')
  } catch (err) {
    spinner.stop()
    console.log(colors.red(err.message))
  }
}