const request = require('supertest');
const app = require('../server');

describe("API de Cuentas", () => {
  let userToken = '';

  beforeAll(async () => {
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'maria@correo.com',
        password: '123456'
      });
    const cookies = loginRes.headers['set-cookie'];
    userToken = cookies ? cookies.find(c => c.startsWith('token=')) : '';
  });

  it("Debe crear una cuenta exitosamente cuando el usuario está logueado", async () => {
    const res = await request(app)
      .post("/api/cuentas")
      .set('Cookie', userToken)
      .send({
        tipo_cuenta_id: 1
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'Cuenta creada exitosamente');
  });

  it("No debe crear una cuenta sin estar logueado", async () => {
    const res = await request(app)
      .post("/api/cuentas")
      .send({
        tipo_cuenta_id: 1
      });

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("No se proporcionó un token de acceso");
  });
});

/*
describe("API de Productos", () => {
  it("Debe obtener todos los productos", async () => {
    const res = await request(app)
      .get("/api/productos")

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
  });
});
*/ 