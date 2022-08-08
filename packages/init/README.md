# `init`

> TODO: description

## Usage

```js
const init = require('@f-git/init')

const git = init({
  baseDir: process.cwd(),
  binary: 'git',
});

(async () => {
 const log = await git.log()
 const status = await git.status()

 console.log(log)
 console.log(status)
})()
```
