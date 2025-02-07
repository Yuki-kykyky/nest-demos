export const testConfig = {
  database: {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "password",
    database: "mydb",
    synchronize: true,
  },
  app: {
    messagePrefix: "",
  },
  auth: {
    jwt: {
      secret: "secret-123",
      expiresIn: "1m",
    },
  },
};
