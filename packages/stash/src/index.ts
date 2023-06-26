import init, { TaskOptions } from '@f-git/init'
const git = init()

export default async function (options?: TaskOptions) {
  try {
    await git.stash(options)
    console.log('stash complete!')
  } catch (err) {
    console.error(err.message)
  }
}