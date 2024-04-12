import { Repository } from '@napi-rs/simple-git'
import { ROOT } from './contants'

export const repo = new Repository(ROOT)

export const head = repo.head()
export const shorthhead = head.shorthand()
