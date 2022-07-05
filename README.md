[中文说明](https://blog.hexuhua.vercel.app/post/22)

# gh-repo-sync

A cli running multiple "gh repo sync owner/cli-fork" commands to help sync all your forked GitHub repos

About gh ( github-cli ): https://github.com/cli/cli

## Required

Make sure you have github-cli installed and authenticated

- [github-cli](https://github.com/cli/cli#installation)

## Install

IT IS `gh-repo-sync-cli`, NOT `gh-repo-sync`!!! The [gh-repo-sync](https://github.com/hrajchert/gh-repo-sync) is another package 🤷

```shell
npm install -g gh-repo-sync-cli
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

Config in: `~/.config/gh-repo-sync/config.json`

```json
{
  "repos": [
    "owner/repo1",
    "owner/repo2"
  ]
}
```

Then run `gh-repo-sync` will sync all the forked repos

It will throw error when there are diverging changes

## Screenshot

![2022-05-25_20-26](https://user-images.githubusercontent.com/26080416/170264027-bf9b5474-d371-43aa-a2d7-f6667ab6b2b0.png)

## License

MIT © hexh250786313

