import { vi } from 'vitest';
import mockData from './helpers/mockData';

const API_ENDPOINT = 'https://economia.awesomeapi.com.br/json/all';

global.fetch = vi.fn().mockResolvedValue({
  json: async () => (mockData),
});

describe('Testa as funcionalidades da Wallet Page', () => {

});
