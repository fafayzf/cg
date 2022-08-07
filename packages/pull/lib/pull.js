const git = require('@f-git/init')

module.exports = async () => {
  const { current, modified, not_added } = await git.status()
  console.log(current, modified, not_added);
}