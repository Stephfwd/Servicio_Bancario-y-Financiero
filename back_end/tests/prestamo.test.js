const request = require('supertest');
const app = require('../server');

describe("API de Préstamos", () => {
  let userToken = '';

  // Necesitamos loguearnos para el test que SI debe crear un préstamo
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

  it("Debe crear un préstamo exitosamente cuando el usuario está logueado", async () => {
    const res = await request(app)
      .post("/api/prestamos/solicitar")
      .set('Cookie', userToken) // Enviamos el token
      .send({
        monto_solicitado: 1000,
        plazo_meses: 12
      });

    // Nota: Si el endpoint aún no está programado, este test fallará con 404
    expect(res.statusCode).toBe(201); 
    expect(res.body).toHaveProperty('message');
  });

  it("No debe crear un préstamo sin estar logueado", async () => {
    const res = await request(app)
      .post("/api/prestamos/solicitar")
      .send({
        monto_solicitado: 1000,
        plazo_meses: 12
      });

    // Aquí esperamos un 403 (Prohibido) porque no hay token
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("No se proporcionó un token de acceso");
  });
});
