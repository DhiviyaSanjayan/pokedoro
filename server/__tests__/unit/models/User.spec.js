const User = require("../../../models/User");
const db = require("../../../database/connect");

describe("User", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe("getById", () => {
    test("it resolves with a user on successful db query", async () => {
      let userData = {
        username: "Mike_tyson",
        pass_word: "Tyson1",
        time_studied: "email@example.com",
      };

      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [userData] });

      const result = await User.getById(1);
      console.log("banana", result);

      expect(result).toBeInstanceOf(User);
      expect(result.id).toBe(1);
    });
  });

  describe("getOneByUserId", () => {
    test("it resolves with a user on successful db query", async () => {
      let userData = {
        username: "Mike_tyson",
        pass_word: "Tyson1",
        time_studied: "email@example.com",
      };
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [userData] });

      const result = await User.getOneByUserId("Mike_tyson");
      console.log("banana", result);

      expect(result).toBeInstanceOf(User);
      expect(result.username).toBe("Mike_tyson");
    });
  });

  describe("getOneByUsername", () => { // Corrected test case name
    test("it resolves with a user on successful db query", async () => {
      let userData = {
        username: "Mike_tyson",
        pass_word: "Tyson1",
        time_studied: "email@example.com",
      };
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [userData] });
  
      const result = await User.getOneByUsername("Mike_tyson"); // Corrected method name
      console.log("banana", result);
  
      expect(result).toBeInstanceOf(User);
      expect(result.username).toBe("Mike_tyson");
    });
  });

  describe("create", () => {
    test("it resolves with a user on successful db query", async () => {
      let userData = {
        username: "Mike_tyson",
        pass_word: "Tyson1",
        time_studied: "email@example.com",
      };

      jest
        .spyOn(db, "query")
        .mockResolvedValueOnce({ rows: [{ ...userData }] });
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [userData] });

      const result = await User.create(userData);
      expect(result).toHaveProperty("username");
    });
  });

  
});