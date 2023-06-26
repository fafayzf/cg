import json from '@rollup/plugin-json'
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import dts from 'rollup-plugin-dts'
import { defineConfig, RollupOptions } from 'rollup'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { sync as syncFile } from 'fast-glob'

import { readFileSync } from 'fs'

const inputs = syncFile(['./packages/init/src/index.ts'], { dot: true, deep: 4 })
const configs: RollupOptions[] = []

function commonPlugins(pkgDir) {  
  return [
    json(),
    commonjs(),
    typescript({
      tsconfig: resolve(pkgDir, './tsconfig.json'),
    })
  ]
}

for(let input of inputs) {
  const pkgDir = join(dirname(input), '..')
  const pkg = JSON.parse(readFileSync(resolve(pkgDir, './package.json')).toString());
  console.log(pkg)
  const deps = Object.keys(
    Object.assign({}, pkg.peerDependencies, pkg.dependencies)
  )
  
  const cjsConfig = defineConfig({
    input,
    output: {
      dir: resolve(pkgDir, 'dist'),
      entryFileNames: `node-cjs/[name].cjs`,
      chunkFileNames: 'node-cjs/chunks/dep-[hash].js',
      exports: 'named',
      format: 'cjs',
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
      entryFileNames: `types/[name].d.ts`,
      exports: 'named',
      format: 'cjs'
    },
    plugins: [dts()]
  })

  configs.push(...[cjsConfig, dtsConfig])
}

export default configs