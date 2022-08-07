const inquirer = require('inquirer')
const git = require('@f-git/init')
const ora = require('ora')
const colors = require('colors')

const MESSAGE = {
    ADDCONFIRM: '是否add全部文件',
    ADDCHOOSEFILES: '请选择add的文件',
    SELECTCOMMITTYPE: '请选择commit类型?',
    INPUTCOMMIT: '请输入commit内容'
}

module.exports = async (remote = 'origin', branch, options) => {
    const { current, modified, not_added } = await git.status()
    if (modified.length > 0 || not_added.length > 0) {
        const choices = ([...modified, ...not_added] || []).map((item, index) => {
        return {
            name: item,
            value: item,
            short: index + 1,
        }
        })

        // confirm add all files
        const confirmAllFiles = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirm',
            message: MESSAGE.ADDCONFIRM,
        }
        ])

        // commit files
        let addFiles = []

        if (!confirmAllFiles.confirm) {
        addFiles = await inquirer.prompt([
            {
            type: 'checkbox',
            name: 'name',
            message: MESSAGE.ADDCHOOSEFILES,
            choices,
            },
        ])
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

