export const config = () =>
  ({
    environment: process.env.NODE_ENV,
    port: parseInt(process.env.PORT) || 3000,

    database: {
      uri: `${process.env.MONGO_URI}${process.env.MONGO_DATABASE}`,
    },

    auth: {
      issuer: process.env.AUTH0_ISSUER_URL,
      audience: process.env.AUTH0_AUDIENCE,
      clientDomain: process.env.AUTH0_CLIENT_DOMAIN,
      clientId: process.env.AUTH0_CLIENT_ID,
    },
  } as const);

export enum Config {
  PORT = 'port',
  NODE_ENV = 'environment',

  MONGO_URI = 'database.uri',

  AUTH0_AUDIENCE = 'auth.audience',
  AUTH0_ISSUER_URL = 'auth.issuer',
  AUTH0_CLIENT_DOMAIN = 'auth.clientDomain',
  AUTH0_CLIENT_ID = 'auth.clientId',
}
