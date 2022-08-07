#!/usr/bin/env node
// 读取packgaejson
const packageConfig = require('./package.json')
const push = require('@f-git/push')
const pull = require('@f-git/pull')

const { program } = require('commander')

// 这样输出-V或--version就能看到版本号了
program.version(packageConfig.version)

// 使用zhizu init my
program
  .command('push')
  .action(() => {
    push()
  });

program
  .command('pull')
  .action(() => {
    pull()
  })
// program.option('-ig,--initgit', 'init git');

program.parse(process.argv);
