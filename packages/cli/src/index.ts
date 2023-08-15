#!/usr/bin/env node

import pkg from '../package.json'
import { push } from '@f-git/push'
import { pull } from '@f-git/pull'
import { commit } from '@f-git/commit'
import { checkout } from '@f-git/checkout'
import { program } from 'commander'
import { stash } from '@f-git/stash'

program.version(pkg.version)

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


export {}