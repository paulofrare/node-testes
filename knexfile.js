module.exports = {
  test: {
    client: "pg",
    version: "9.6",
    connection: {
      host: "localhost",
      user: "canivet",
      password: "nice0rock",
      database: "node-testes",
    },
    migrations: {
      directory: "src/migrations",
    },
  },
};
