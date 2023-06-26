import { init, TaskOptions } from '@f-git/init'
import ora from 'ora'
const git = init()

export default async (remote = 'origin', branch: string, options: TaskOptions) => {
  const { current } = await git.status()
  branch = (branch || current) as string

  const spinner = ora(`pull 至本地分支: ${current} 中...`).start()

  try {
    await git.pull(remote, branch, options)
    spinner.stop()
    console.log('pull complete!')
  } catch (err) {
    spinner.stop()
    console.error(err.message)
  }
}