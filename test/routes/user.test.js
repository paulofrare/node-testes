const request = require("supertest");
const app = require("../../src/app.js");

test("Deve listar todos os usuários", () => {
  return request(app)
    .get("/users")
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});
const mail = `${Date.now()}@mail.com`;

test("Deve inserir usuário com sucesso", () => {
  return request(app)
    .post("/users")
    .send({
      name: "Andressa Duarte",
      mail,
      passwd: "12364651",
    })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("name", "Andressa Duarte");
    });
});

//retornando o resultado da Promisse

test("Não deve inserir usuário sem nome", () => {
  return request(app)
    .post("/users")
    .send({ mail: "frare@cani.vetorial.net", passwd: "dusafd" })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Nome é um atributo obrigatório");
    });
});

// Usando async await

test("Não deve inserir usuário sme e-mail", async () => {
  const result = await request(app)
    .post("/users")
    .send({ name: "Paulo Frare", passwd: "dusafd" });
  expect(result.status).toBe(400);
  expect(result.body.error).toBe("E-mail é um atributo obrigatório");
});

// Finaliza com o .done()
test("Não deve inserir usuário sem senha", (done) => {
  request(app)
    .post("/users")
    .send({ name: "Paulo Frare", mail: "pfrare.tads@gemail.com" })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Senha é um atributo obrigatório");
      done();
    });
});

test.skip("Não deve inserir usuário com e-mail existente", () => {
  return request(app)
    .post("/users")
    .send({
      name: "Andressa Duarte",
      mail,
      passwd: "12364651",
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Já existe um usuário com esse e-mail");
    });
});
