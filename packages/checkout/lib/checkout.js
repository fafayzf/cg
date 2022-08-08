const inquirer = require('inquirer')
const init = require('@f-git/init')
const commit = require('@f-git/commit')
const stash = require('@f-git/stash')
const colors = require('colors')
const git = init()

const MESSAGE = {
    MODIFIED: '本地有新增或者变动的文件，请选择暂存或提交',
    MODIFYTYPE: [
      '暂存 (git stash)', 
      '提交 (git add ./, git commit -m "xxx")',
    ]
}

module.exports = async (branch, options) => {

  const { current, modified, not_added } = await git.status()

  if (modified.length > 0 || not_added.length > 0) {
    const result = await inquirer.prompt([
      {
        type: 'list',
        name: 'modifyType',
        message: MESSAGE.MODIFIED,
        choices: MESSAGE.MODIFYTYPE,
      }
    ])

    if (result.modifyType === MESSAGE.MODIFYTYPE[0]) {
      await stash()
    }
    if (result.modifyType === MESSAGE.MODIFYTYPE[1]) {
      await commit()
    }
  }
  branch = branch || current
  try {
    await git.checkout(branch, options)
  } catch (err) {
    console.log(colors.red(err.message))
  }
} 