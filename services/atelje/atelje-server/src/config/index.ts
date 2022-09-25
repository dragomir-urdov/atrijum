export const config = () =>
  ({
    environment: process.env.NODE_ENV,
    port: parseInt(process.env.PORT) || 3000,

    database: {
      uri: `${process.env.MONGO_URI}${process.env.MONGO_DATABASE}`,
    },
  } as const);

export enum Config {
  PORT = 'port',
  NODE_ENV = 'environment',

  MONGO_URI = 'database.uri',
}
