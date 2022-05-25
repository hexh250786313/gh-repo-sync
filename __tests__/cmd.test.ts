import { run } from "../src/cmd";
import ifExistGH from "../src/utils/if-exist-gh";
import ifLoginGH from "../src/utils/if-login-gh";
import isAllArgsValid from "../src/utils/is-all-args-valid";

jest.mock("../src/utils/if-exist-gh", () =>
  jest.requireActual("../__mocks__/if-exist-gh.js")
);

jest.mock("../src/utils/if-login-gh", () =>
  jest.requireActual("../__mocks__/if-login-gh.js")
);

jest.mock("../src/utils/is-all-args-valid", () =>
  jest.requireActual("../__mocks__/is-all-args-valid.js")
);

describe("Unit test for cmd", () => {
  let spyOnWrite: jest.SpyInstance;

  beforeAll(async () => {
    spyOnWrite = jest
      .spyOn(global.process.stdout, "write")
      .mockImplementation();
    await run();
  });

  afterAll(() => {
    spyOnWrite.mockRestore();
  });

  it("Should check github status is valid", () => {
    expect(ifExistGH).toHaveBeenCalled();
    expect(ifLoginGH).toHaveBeenCalled();
  });

  it("Should check if args are all valid", async () => {
    expect(isAllArgsValid).toHaveBeenCalled();
  });
});
