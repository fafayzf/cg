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
  .action(async () => {
    await push()
  })

program
  .command('push')
  .action(async () => {
    await push()
  })

// pull
program
  .command('pl')
  .action(async () => {
    await pull()
  })

program
  .command('pull')
  .action(async () => {
    await pull()
  })

// checkout
program
  .command('ck [branch]')
  .action(async (branch, options) => {
    await checkout(branch)
  })

program
  .command('checkout [branch]')
  .action(async (branch, options) => {
    await checkout(branch)
  })

// commit
program
  .command('cm')
  .action(async () => {
    await commit()
  })

program
  .command('commit')
  .action(async () => {
    await commit()
  })

// stash
program
  .command('s [pop]')
  .action(async (pop) => {
    pop = pop === 'pop' || pop === 'p' ? 'pop' : undefined
    await stash(pop)
  })

program
  .command('stash [pop]')
  .action(async (pop) => {
    pop = pop === 'pop' || pop === 'p' ? 'pop' : undefined
    await stash(pop)
  })

program.parse(process.argv)

export {}