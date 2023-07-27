const Token = require("../../../../models/Token");
const db = require("../../../connect");

describe("Token", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe("getOneById", () => {
    test("it resolves with a token on successful db query", async () => {
      let tokenData = {
        token_id: 1,
        users_id: 1,
        token: "123456789",
      };
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [tokenData] });

      const result = await Token.getOneById(1);
      console.log("banana", result);

      expect(result).toBeInstanceOf(Token);
      expect(result.token_id).toBe(1);
    });
  });

  describe("getOneByToken", () => {
    test("it resolves with a token on successful db query", async () => {
      let tokenData = {
        token_id: 1,
        users_id: 1,
        token: "123456789",
      };
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [tokenData] });

      const result = await Token.getOneByToken("123456789");
      console.log("banana", result);

      expect(result).toBeInstanceOf(Token);
      expect(result.token).toBe("123456789");
    });
  });

  describe("create", () => {
    test("it resolves with a token on successful db query", async () => {
      let tokenData = {
        token_id: 1,
        users_id: 1,
        token: "123456789",
      };

      jest
        .spyOn(db, "query")
        .mockResolvedValueOnce({ rows: [{ ...tokenData }] });
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [tokenData] });

      const result = await Token.create(tokenData);
      expect(result).toHaveProperty("users_id");
    });
  });

  describe('removeToken', () => {
    test('it resolves with "Token Deleted" on successful token removal', async () => {
      const mockDbQuery = jest.spyOn(db, 'query').mockResolvedValueOnce(true);
      const testToken = "123456789";
      const result = await Token.removeToken(testToken);
  
      expect(mockDbQuery).toHaveBeenCalledWith('DELETE FROM token WHERE token = $1', [testToken]);
      expect(result).toBe("Token Deleted");
    });
  })  
});