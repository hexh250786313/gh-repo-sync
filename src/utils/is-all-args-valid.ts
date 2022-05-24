export default function isAllArgsValid(args: string[]) {
  return args.every(
    (repo) => /[^/]{1,}\/[^/]{1,}/g.test(repo) && /\S{1,}\/\S{1,}/g.test(repo)
  );
}
