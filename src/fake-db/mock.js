import axios from '@/service/http/axios';
const MockAdapter = require('axios-mock-adapter');
const mock = new MockAdapter(axios);

export default mock;
