const User = require("../../../../models/User");
jest.mock("../../../connect");
const db = require('../../../connect');

describe("User", () => {
    beforeEach(() => jest.clearAllMocks());
  
    afterAll(() => jest.resetAllMocks());

    describe('getAll', () => {
        test('it resolves with user on successful db query', async () => {
    
          jest.spyOn(db, 'query')
              .mockResolvedValueOnce({
                  rows: [
                      { user_id: 1, username: "user1", pass_word: "test user 1", time_studied: 0 },
                      { user_id: 3, username: "user3", pass_word: "test user 2", time_studied: 0 },
                      { user_id: 2, username: "user2", pass_word: "test user 3", time_studied: 0 },
                  ]
              });
    
          const all = await User.getAll();
          expect(all).toHaveLength(3)
        })
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
              time_studied: 0,
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
              time_studied: 0,
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
