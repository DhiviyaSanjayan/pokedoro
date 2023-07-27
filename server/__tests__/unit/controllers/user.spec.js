const userController = require('../../../controllers/user')
const User = require('../../../models/User');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }))
const mockRes = { status: mockStatus }

describe('user controller', () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe('index', () => {
    test('it returns user with a 200  status code', async () => {
        let users = [{
          users_id: 1,
          username: "Mike_tyson",
          pass_word: "Tyson1",
          time_studied: "email@example.com",
        }]
        jest.spyOn(User, 'getAll').mockResolvedValue(users);
        await userController.index(null, mockRes);
        expect(mockStatus).toHaveBeenCalledWith(200);
        expect(mockJson).toHaveBeenCalledWith(users);
    });
      
    
    describe('show', () => {
        test('it returns a user with a 200 status code', async () => {
        let testUser = {
          users_id: 1,
          username: "Mike_tyson",
          pass_word: "Tyson1",
          time_studied: "email@example.com",
        }
            
        jest.spyOn(User, 'getOneByUsername')
            .mockResolvedValue(new User(testUser));

        const mockReq = { params: { id: 1 } }
        await userController.show(mockReq, mockRes);
        expect(mockStatus).toHaveBeenCalledWith(200);
        // expect(mockJson).toHaveBeenCalledWith(new User(testUser));
        })
    });
  });

   describe('create', () => {
    test('it returns a new user with a 201 status code', async () => {
        let testUser = {
          users_id: 1,
          username: "Mike_tyson",
          pass_word: "Tyson1",
          time_studied: "email@example.com",
        }
           
      jest.spyOn(User, 'create')
        .mockResolvedValue(new User(testUser));

      const mockReq = { body: testUser }
      await userController.create(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockJson).toHaveBeenCalledWith(new User(testUser));
    })
  });

  

  describe('destroy', () => {
    test('it returns a 204 status code on successful deletion', async () => {
      jest.spyOn(User.prototype, 'destroy')
        .mockResolvedValue('Deleted');

      const mockReq = { params: { id: 1 } }
      await userController.destroy(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(204);
    })
  });

  describe("register", () => {
    test("returns new user data with status 201", async () => {
      const mockUser = {
          users_id: 1,
          username: "Mike_tyson",
          pass_word: "Tyson1",
          time_studied: "email@example.com",
      };

      jest.spyOn(User, "create").mockResolvedValue(new User(mockUser));

      const mockReq = {
        body: mockUser,
      };

      await userController.register(mockReq, mockRes);

      expect(mockStatus).toHaveBeenCalledWith(201);
    });
  });
})






