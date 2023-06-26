import { simpleGit, CleanOptions, Options, TaskOptions } from 'simple-git'
simpleGit().clean(CleanOptions.FORCE)


export default (options?: Options) => {
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

export { simpleGit, CleanOptions, Options, TaskOptions }