const inquirer = require('inquirer')
const git = require('@f-git/init')
const commit = require('@f-git/commit')
const stash = require('@f-git/stash')
const colors = require('colors')
// const ora = require('ora')

const MESSAGE = {
    MODIFIED: '本地有新增或者变动的文件，请选择暂存或提交'
}

module.exports = async (remote = 'origin', branch, options) => {
  const { current, modified, not_added } = await git.status()
  console.log(current, modified, not_added);
  if (modified.length > 0 && not_added.length > 0) {
    const result = await inquirer.prompt([
      {
        type: 'list',
        name: 'modifyType',
        message: MESSAGE.MODIFIED,
        choices: [
          '暂存 (git stash)', 
          '提交 (git add ./, git commit -m "xxx")',
        ],
      }
    ])

    if (result.modifyType === '暂存 (git stash)') {
      stash()
    }
    if (result.modifyType === '提交 (git add ./, git commit -m "xxx")') {
      commit()
    }
  }
  return
  branch = current || branch

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