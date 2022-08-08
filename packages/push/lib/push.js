const init = require('@f-git/init')
const commit = require('@f-git/commit')
const ora = require('ora')
const colors = require('colors')
const git = init()

module.exports = async (remote = 'origin', branch, options) => {
    const { current, modified, not_added } = await git.status()
    if (modified.length > 0 || not_added.length > 0) {
        await commit()
    }
    
    branch = current || branch
    const spinner = ora(`push 至远程分支: ${colors.yellow(current)} 中...`).start()
    try {
        await git.push(remote, branch, options)
        spinner.stop()
        console.log('push complete!')
    } catch (err) {
        spinner.stop()
        if (err.message.indexOf("'git pull ...') before pushing again") > -1) {
            console.log(`远程分支: ${colors.yellow(current)} 有最新版本，请先执行 ${colors.yellow('git pull')} 拉取最新代码至本地`)
        }
    }
}

