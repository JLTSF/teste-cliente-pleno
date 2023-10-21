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

export default {
  PORT,
  ENVIRONMENT,
  APP_VERSION,
  API_CEP_PROVIDER_MAIN,
  API_CEP_PROVIDER_SECONDARY
};
