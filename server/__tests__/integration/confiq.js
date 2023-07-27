require("dotenv").config();

const request = require('supertest');
const apiServer = require('../../../server/app');

global.request = request 
global.app = apiServer
