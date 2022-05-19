const repos = ["hexh250786313/coc-git", "hexh250786313/coc-yank"];

describe("gh-sync-repo", () => {
  repos.forEach((repo) => {
    test(`Sync: ${repo}`, async () => {
      expect(typeof repo).toBe("string");
    });
  });
});
