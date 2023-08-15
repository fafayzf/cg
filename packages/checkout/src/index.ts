import inquirer from 'inquirer'
import { init } from '@f-git/init'
import { TaskOptions } from 'simple-git'
import { commit } from '@f-git/commit'
import { stash } from '@f-git/stash'
import Colors from 'color'
const git = init()

const MESSAGE = {
    MODIFIED: '本地有新增或者变动的文件，请选择暂存或提交',
    MODIFYTYPE: [
      '暂存 (git stash)', 
      '提交 (git add ./, git commit -m "xxx")',
    ]
}

async function checkout(branch?: string, options?: TaskOptions) {

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
  branch = (branch || current) as string
  try {
    await git.checkout(branch, options)
  } catch (err) {
    console.log(new Colors().red(err.message))
  }
} 



export { checkout }
export default checkout