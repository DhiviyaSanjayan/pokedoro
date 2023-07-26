const {createDbEnv, populateDbEnv, destroyDbEnv, } = require("../../setup-test-db");
  
  describe("users endpoints", () => {
    let api;
  
    beforeEach(async () => {
      await destroyDbEnv();
      await createDbEnv();
      await populateDbEnv();
    });
  
    afterEach(async () => {
      await destroyDbEnv();
    });
  
    beforeAll(async () => {
      api = app.listen(5002, () =>
        console.log("Test server running on port 5000")
      );
    });
  
    afterAll(async () => {
      console.log("stopping test server");
      await api.close();
    });
  
    it("should retrieve a user based on id", async () => {
      const res = await request(api).get("/users/1");
      expect(res.statusCode).toEqual(200);
      expect(res.body.username).toEqual("Mike_tyson");
    });
  });