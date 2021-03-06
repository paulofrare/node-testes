const request = require("supertest");
const app = require("../../src/app.js");

const MAIN_ROUTE = "/accounts";
let user;

beforeAll(async () => {
  const res = await app.services.user.save({
    name: "User Account",
    mail: `${Date.now()}@mail.com`,
    passwd: "aysug",
  });
  user = { ...res[0] };
});

test("Deve inserir uma conta com sucesso", () => {
  return request(app)
    .post(MAIN_ROUTE)
    .send({ name: "Acc #1", user_id: user.id })
    .then((result) => {
      expect(result.status).toBe(201);
      expect(result.body.name).toBe("Acc #1");
    });
});

test("Deve listar todas as contas", () => {
  return app
    .db("accounts")
    .insert({ name: "Acc list", user_id: user.id })
    .then(() => {
      request(app)
        .get(MAIN_ROUTE)
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body.length).toBeGreaterThan(0);
        });
    });
});

test("Deve listar um uma conta por id", () => {
  return app
    .db("accounts")
    .insert({ name: "Acc by ID", user_id: user.id }, ["id"])
    .then((acc) => {
      request(app)
        .get(`${MAIN_ROUTE}/${acc[0].id}`)
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body.name).toBe("Acc by ID");
          expect(res.body.user_id).toBe(user.id);
        });
    });
});

test("Deve alterar uma conta", () => {
  return app
    .db("accounts")
    .insert({ name: "Acc to update", user_id: user.id }, ["id"])
    .then((acc) => {
      request(app)
        .put(`${MAIN_ROUTE}/${acc[0].id}`)
        .send({ name: "Acc Updated" })
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body.name).toBe("Acc Updated");
        });
    });
});
test("Deve deletar uma conta", () => {
  return app
    .db("accounts")
    .insert({ name: "Acc to remove", user_id: user.id }, ["id"])
    .then((acc) => {
      request(app)
        .delete(`${MAIN_ROUTE}/${acc[0].id}`)
        .then((res) => {
          expect(res.status).toBe(204);
        });
    });
});

test("Não deve inserir uma conta sem nome", () => {
  return request(app)
    .post(MAIN_ROUTE)
    .send({ user_id: user.id })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Nome é um atributo obrigatório");
    });
});
