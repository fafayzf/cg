import json from '@rollup/plugin-json'
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import dts from 'rollup-plugin-dts'
import { defineConfig, RollupOptions } from 'rollup'
import { resolve, dirname, join } from 'node:path'
import { sync as syncFiles } from 'fast-glob'

import { readFileSync } from 'fs'

const inputs = syncFiles(['./packages/**/src/index.(ts|js)'], { dot: true, deep: 4 })

const configs: RollupOptions[] = []

function commonPlugins(pkgDir) {  
  return [
    json(),
    commonjs(),
    nodeResolve({
      preferBuiltins: true
    }),
    typescript({
      tsconfig: resolve(pkgDir, './tsconfig.json'),
    })
  ]
}

for(let input of inputs) {
  const pkgDir = join(dirname(input), '..')
  const pkg = JSON.parse(readFileSync(resolve(pkgDir, './package.json')).toString());

  const deps = Object.keys(
    Object.assign({}, pkg.peerDependencies, pkg.dependencies)
  )

  const cjsConfig = defineConfig({
    input,
    output: {
      dir: resolve(pkgDir, 'dist'),
      entryFileNames: `[name].cjs`,
      chunkFileNames: 'chunks/dep-[hash].js',
      exports: 'named',
      format: 'cjs',
      sourcemap: true,
      sourcemapExcludeSources: true
    },
    external: [...deps],
    plugins: [...commonPlugins(pkgDir)],
  })

  const esmConfig = defineConfig({
    input,
    output: {
      dir: resolve(pkgDir, 'dist'),
      entryFileNames: `[name].js`,
      chunkFileNames: 'chunks/dep-[hash].js',
      exports: 'named',
      format: 'esm',
      sourcemap: true,
      sourcemapExcludeSources: true
    },
    external: id => deps.some(dep => id === dep || id.startsWith(`${dep}`)),
    plugins: [...commonPlugins(pkgDir)],
  })
  

  
  const dtsConfig = defineConfig({
    input,
    output: {
      dir: resolve(pkgDir, 'dist'),
      entryFileNames: `[name].d.ts`,
      exports: 'named',
      format: 'cjs'
    },
    plugins: [dts()]
  })

  configs.push(...[cjsConfig, esmConfig, dtsConfig])
}

export default configs