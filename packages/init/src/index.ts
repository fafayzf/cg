import { simpleGit, CleanOptions, Options, TaskOptions } from 'simple-git'
simpleGit().clean(CleanOptions.FORCE)


function init (options?: Options) {
  return simpleGit({
    ...options,
    progress({
      method,
      stage,
      progress
    }) {
      console.log(`git.${ method } ${ stage } stage ${ progress }% complete`)
    }
  })
}

export { simpleGit, CleanOptions, Options, TaskOptions, init }
export default init