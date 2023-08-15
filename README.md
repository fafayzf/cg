## shell simplifies git commands

# Installing

```sh

npm i @f-git/cli -g

```

# Use


## pull

```sh

ff pull
# Or
ff pl

```

## push
Executing git add will let you choose whether to add all or add part, 
then execute git commit, 
and finally execute git push
```sh

ff push
# Or
ff ph

```


## checkout

```sh

# ff checkout <branch>

ff checkout dev
# Or
ff ck dev

```


## commit

```sh

ff commit
# Or
ff cm

```


## stash

```sh

ff stash

ff stash pop

# Or

ff s

ff s pop

```

### packages

|package name          |address   |                                        
|------                |:-----:|
| @f-git/init          |[https://github.com/fafayzf/f-git/blob/master/packages/init/README.md](https://github.com/fafayzf/f-git/blob/master/packages/init/README.md)|
| @f-git/pull          |[https://github.com/fafayzf/f-git/blob/master/packages/pull/README.md](https://github.com/fafayzf/f-git/blob/master/packages/pull/README.md)|
| @f-git/push          |[https://github.com/fafayzf/f-git/blob/master/packages/push/README.md](https://github.com/fafayzf/f-git/blob/master/packages/push/README.md)|
| @cf-git/commit        |[https://github.com/fafayzf/f-git/blob/master/packages/commit/README.md](https://github.com/fafayzf/f-git/blob/master/packages/commit/README.md)|
| @f-git/checkout      |[https://github.com/fafayzf/f-git/blob/master/packages/checkout/README.md](https://github.com/fafayzf/f-git/blob/master/packages/checkout/README.md)|
| @f-git/stash         |[https://github.com/fafayzf/f-git/blob/master/packages/stash/README.md](https://github.com/fafayzf/f-git/blob/master/packages/stash/README.md)|