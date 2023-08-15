import { init } from '@f-git/init'
import { TaskOptions } from 'simple-git'
const git = init()

async function stash(options?: TaskOptions) {
  try {
    await git.stash(options)
    console.log('stash complete!')
  } catch (err) {
    console.error(err.message)
  }
}

export { stash }
export default stash