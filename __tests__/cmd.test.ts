import { run } from "../src/cmd";
import sync from "../src/utils/sync";
import ifExistGH from "../src/utils/if-exist-gh";
import ifLoginGH from "../src/utils/if-login-gh";

jest.mock("../src/utils/if-exist-gh", () =>
  jest.requireActual("../__mocks__/if-exist-gh.js")
);

jest.mock("../src/utils/if-login-gh", () =>
  jest.requireActual("../__mocks__/if-login-gh.js")
);

jest.mock("../src/utils/sync", () =>
  jest.requireActual("../__mocks__/sync.js")
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

  it("Should call sync with correct args", async () => {
    const callsArgs = (sync as any).mock.calls;
    for (let i = 0; i < callsArgs.length; i++) {
      expect(sync)
        .toHaveBeenCalledWith
        // callsArgs[i][0] + (Math.random() > 0.1 ? "" : "1")
        ();
    }
  });
});
