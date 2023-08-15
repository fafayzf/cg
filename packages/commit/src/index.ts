import { init } from '@f-git/init'
import inquirer from 'inquirer'
const git = init()

const MESSAGE = {
  ADDCONFIRM: '是否add全部文件',
  ADDCHOOSEFILES: '请选择add的文件',
  SELECTCOMMITTYPE: '请选择commit类型(type)?',
  ADDCOMMITSCOPE: '请输入commit的修改范围(scope); 若无, 按enter键跳过',
  INPUTCOMMIT: '请输入commit内容(description)'
}

async function commit() {

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
    let addFiles: any = []

    if (!confirmAllFiles.confirm) {
      addFiles = await inquirer.prompt([{
        type: 'checkbox',
        name: 'name',
        message: MESSAGE.ADDCHOOSEFILES,
        choices,
      }, ])
      addFiles.name.map((item: string, index: number) => {
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
          'feat',
          'fix',
          'merge',
          'style',
          'docs',
          'build',
          'chore',
          'test',
          'update',
          'pref',
          'refactor',
          'revert',
        ],
      },
      {
        type: 'input',
        name: 'commitScope',
        message: MESSAGE.ADDCOMMITSCOPE
      },
      {
        type: 'input',
        name: 'commitDesc',
        message: MESSAGE.INPUTCOMMIT,
      },
    ])

    await git.add(addFiles.name)
    console.log('add complete!')

    const commitContent = result.commitScope 
      ? `${result.commitType}(${result.commitScope}): ${result.commitDesc}`
      : `${result.commitType}: ${result.commitDesc}`
    console.log(commitContent)
    await git.commit(commitContent)
    console.log('commit complete!')
  }

}

export { commit }
export default commit