export default function isAllArgsValid(args?: string[]): args is string[] {
  return (
    Array.isArray(args) &&
    args.length > 0 &&
    args.every(
      (repo) =>
        /^[^/]{1,}\/[^/]{1,}$/g.test(repo) && /^\S{1,}\/\S{1,}$/g.test(repo)
    )
  );
}
