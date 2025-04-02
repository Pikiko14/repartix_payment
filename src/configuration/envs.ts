import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DB_URL: string;
  APP_URL: string;
  APP_ENV: string;
  NATS_URL: string;
  ATLAS_URL: string;
  MERCADO_PAGO_URL: string;
  MERCADO_PAGO_PUBLIC_KEY: string;
  MERCADO_PAGO_PRIVATE_KEY: string;
}

const envsSchema = joi.object({
  ATLAS_URL: joi.optional(),
  PORT: joi.number().required(),
  DB_URL: joi.string().required(),
  APP_ENV: joi.string().required(),
  APP_URL: joi.string().required(),
  NATS_URL: joi.string().required(),
  MERCADO_PAGO_URL: joi.string().required(),
  MERCADO_PAGO_PUBLIC_KEY: joi.string().required(),
  MERCADO_PAGO_PRIVATE_KEY: joi.string().required(), 
})
.unknown(true);

const { error, value } = envsSchema.validate({ 
  ...process.env,
});


if ( error ) {
  throw new Error(`Config validation error: ${ error.message }`);
}

const envVars:EnvVars = value;


export const envs = {
  port: envVars.PORT,
  app_env: envVars.APP_ENV,
  db_url: envVars.DB_URL,
  app_url: envVars.APP_URL,
  atlas_url: envVars.ATLAS_URL,
  nats_server: envVars.NATS_URL,
  m_pago_webhook: envVars.MERCADO_PAGO_URL,
  m_pago_public: envVars.MERCADO_PAGO_PUBLIC_KEY,
  m_pago_private: envVars.MERCADO_PAGO_PRIVATE_KEY,
}