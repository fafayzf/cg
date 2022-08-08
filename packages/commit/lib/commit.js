const init = require('@f-git/init')
const inquirer = require('inquirer')
const git = init()

const MESSAGE = {
  ADDCONFIRM: '是否add全部文件',
  ADDCHOOSEFILES: '请选择add的文件',
  SELECTCOMMITTYPE: '请选择commit类型?',
  INPUTCOMMIT: '请输入commit内容'
}

const commit = async () => {

  const {
    modified,
    not_added
  } = await git.status()

  if (modified.length > 0 || not_added.length > 0) {
    const choices = ([...modified, ...not_added] || []).map((item, index) => {
      return {
        name: item,
        value: item,
        short: index + 1,
      }
    })

    // confirm add all files
    const confirmAllFiles = await inquirer.prompt([{
      type: 'confirm',
      name: 'confirm',
      message: MESSAGE.ADDCONFIRM,
    }])

    // commit files
    let addFiles = []

    if (!confirmAllFiles.confirm) {
      addFiles = await inquirer.prompt([{
        type: 'checkbox',
        name: 'name',
        message: MESSAGE.ADDCHOOSEFILES,
        choices,
      }, ])
      addFiles.name.map((item, index) => {
        console.log(`${index + 1}: ${item}`)
      })
    } else {
      addFiles = {
        name: ['./']
      }
    }

    const result = await inquirer.prompt([

      {
        type: 'list',
        name: 'commitType',
        message: MESSAGE.SELECTCOMMITTYPE,
        choices: [
          'fix',
          'feat',
          'merge',
          'update',
          'style',
          'docs',
          'chore'
        ],
      },
      {
        type: 'input',
        name: 'commit',
        message: MESSAGE.INPUTCOMMIT,
      },
    ])

    await git.add(addFiles.name)
    console.log('add complete!')

    await git.commit(`${result.commitType}: ${result.commit}`)
    console.log('commit complete!')
  }

}

module.exports = commit