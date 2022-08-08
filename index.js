#!/usr/bin/env node

const packageConfig = require('./package.json')
const push = require('@f-git/push')
const pull = require('@f-git/pull')
const checkout = require('@f-git/checkout')
const commit = require('@f-git/commit')

const { program } = require('commander')
const stash = require('@f-git/stash')

program.version(packageConfig.version)

// push
program
  .command('ph')
  .action(() => {
    push()
  })

program
  .command('push')
  .action(() => {
    push()
  })

// pull
program
  .command('pl')
  .action(() => {
    pull()
  })

program
  .command('pull')
  .action(() => {
    pull()
  })

// checkout
program
  .command('ck [branch]')
  .action((branch, options) => {
    checkout(branch)
  })

program
  .command('checkout [branch]')
  .action((branch, options) => {
    checkout(branch)
  })

// commit
program
  .command('cm')
  .action(() => {
    commit()
  })

program
  .command('commit')
  .action(() => {
    commit()
  })

// stash
program
  .command('s [pop]')
  .action((pop) => {
    pop = pop === 'pop' || pop === 'p' ? 'pop' : undefined
    stash(pop)
  })

program
  .command('stash [pop]')
  .action((pop) => {
    pop = pop === 'pop' || pop === 'p' ? 'pop' : undefined
    stash(pop)
  })

program.parse(process.argv)
