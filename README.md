# gh-repo-sync

A cli running multiple "gh repo sync owner/cli-fork" commands to help sync all your forked GitHub repos

About gh ( github-cli ): https://github.com/cli/cli

## Required

Make sure you have github-cli installed and authenticated

- [github-cli](https://github.com/cli/cli#installation)

## Install

```shell
npm install -g gh-repo-sync
```

## Usage

```shell
gh-repo-sync --help
```

There are two ways to pass all repos names to `gh repo sync`

### via command line

```shell
gh-repo-sync owner/repo1 owner/repo2
```

### via config file

```json
// Config in: ~/.config/gh-repo-sync/config.json
{
  "repos": [
    "owner/repo1",
    "owner/repo2"
  ]
}
```

Then run `gh-repo-sync` will sync all the forked repos

## Screenshot



## License

MIT © hexh250786313

