#!/usr/bin/env node

const packageConfig = require('./package.json')
const push = require('@f-git/push')
const pull = require('@f-git/pull')
const checkout = require('@f-git/checkout')
const commit = require('@f-git/commit')

const { program } = require('commander')
const stash = require('@f-git/stash')

// 这样输出-V或--version就能看到版本号了
program.version(packageConfig.version)

// 使用zhizu init my
program
  .command('ph')
  .action(() => {
    push()
  });

program
  .command('pl')
  .action(() => {
    pull()
  })

program
  .command('co [branch]')
  .action((branch, options) => {
    checkout(branch)
  })

program
  .command('cm')
  .action(() => {
    commit()
  })

program
  .command('s [pop]')
  .action((pop) => {
    pop = pop === 'pop' || pop === 'p' ? 'pop' : undefined
    stash(pop)
  })
// program.option('-ig,--initgit', 'init git');

program.parse(process.argv)
