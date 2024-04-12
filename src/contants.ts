import process from 'node:process'
import { existsSync } from 'node:fs'
import { join, dirname } from 'node:path'

// .git dir
export const GIT_DIR = '.git'

// root path
export const CWD = process.cwd()
export const ROOT = findRootDir(CWD)

// find root dir
export function findRootDir(dir: string) {
  if (existsSync(join(dir, GIT_DIR))) {
      return dir
  }
  const parentDir = dirname(dir)
  if (dir === parentDir) {
      return dir
  }
  return findRootDir(parentDir)
}

