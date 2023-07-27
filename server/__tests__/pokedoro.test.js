const Pokemon = require("../models/Pokemon");
const Token = require('../models/Token');
const authenticator = require('../middleware/authenticator')
const User = require('../models/User')
const db = require('../database/connect');

const request = require("supertest");
const app = require("../app");
const { Pool } = require('pg')

const pool = require('../database/connect');

describe('Authenticator Middleware', () => {
    it('should allow access for valid token', async () => {
      // Mock valid token
      const validToken = 'valid-token';
  
      // Mock Token.getOneByToken to return a valid token
      Token.getOneByToken = jest.fn().mockReturnValueOnce(validToken);
  
      // Create a mock request object with the necessary headers
      const req = {
        headers: {
          authorization: validToken,
        },
      };
  
      // Create a mock response object with necessary methods
      const res = {
        status: jest.fn(),
        json: jest.fn(),
      };
  
      // Create a mock next function
      const next = jest.fn();
  
      // Call the authenticator middleware
      await authenticator(req, res, next);
  
      expect(Token.getOneByToken).toHaveBeenCalledWith(validToken);
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
    
    it('should handle missing or invalid token', async () => {
    // Mock missing or invalid token
    const missingToken = null;
    const invalidToken = 'invalid-token';

    // Mock Token.getOneByToken to return null for missing or invalid token
    Token.getOneByToken = jest.fn().mockReturnValueOnce(null);

    // Create a mock request object with the necessary headers
    const reqMissing = {
      headers: {
        authorization: missingToken,
      },
    };

    const reqInvalid = {
      headers: {
        authorization: invalidToken,
      },
    };

    // Create a mock response object with necessary methods
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Create a mock next function
    const next = jest.fn();

    // Call the authenticator middleware with missing token
    await authenticator(reqMissing, res, next);
    expect(Token.getOneByToken).toHaveBeenCalledWith(missingToken);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: `User's token doesn't match server` });

    // Reset mocks
    Token.getOneByToken.mockReset();
    res.status.mockClear();
    res.json.mockClear();

    // Call the authenticator middleware with invalid token
    await authenticator(reqInvalid, res, next);
    expect(Token.getOneByToken).toHaveBeenCalledWith(invalidToken);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: `User's token doesn't match server` });
  });
})
