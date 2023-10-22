import { config } from 'dotenv';

config();

const PORT = process.env.PORT || 8000;
const ENVIRONMENT = process.env.ENVIRONMENT || 'development';
const APP_VERSION = process.env.npm_package_version || '0.0.1';
const API_CEP_PROVIDER_MAIN =
  process.env.API_CEP_PROVIDER_MAIN || 'https://viacep.com.br/ws/';
const API_CEP_PROVIDER_SECONDARY =
  process.env.API_CEP_PROVIDER_SECONDARY ||
  'https://brasilapi.com.br/api/cep/v1/';

const BASE_PATH = process.env.BASE_PATH || 'http://localhost:8000/api/v1';
const DEFAULT_LIMIT_QUERY = Number(process.env.DEFAULT_LIMIT_QUERY || 2);
const DEFAULT_LIMIT_MAX_QUERY = Number(
  process.env.DEFAULT_LIMIT_MAX_QUERY || 50
);
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost';

export default {
  PORT,
  ENVIRONMENT,
  APP_VERSION,
  API_CEP_PROVIDER_MAIN,
  API_CEP_PROVIDER_SECONDARY,
  BASE_PATH,
  DEFAULT_LIMIT_QUERY,
  DEFAULT_LIMIT_MAX_QUERY,
  REDIS_URL
};
