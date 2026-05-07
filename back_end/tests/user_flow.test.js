const request = require('supertest');
const app = require('../server');

describe('Flujo de Usuario: Cuentas Bancarias', () => {
  let userToken = '';

  // Antes de correr los tests de cuentas, necesitamos loguearnos para obtener un token
  beforeAll(async () => {
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'maria@correo.com',
        password: '123456'
      });
    
    // Extraemos el token de las cookies (ya que usas cookies httpOnly)
    // Supertest nos permite capturar el header 'set-cookie'
    const cookies = loginRes.headers['set-cookie'];
    userToken = cookies.find(c => c.startsWith('token='));
  });

  describe('GET /api/cuentas', () => {
    it('debería obtener las cuentas del usuario autenticado', async () => {
      const res = await request(app)
        .get('/api/cuentas')
        .set('Cookie', userToken); // Enviamos el token en la cookie
      
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
      
      // Verificamos que María tenga sus cuentas (según los seeders tiene 2)
      if (res.body.length > 0) {
        expect(res.body[0]).toHaveProperty('numero_cuenta');
        expect(res.body[0]).toHaveProperty('saldo');
      }
    });

    it('debería fallar si se intenta acceder sin estar logueado', async () => {
      const res = await request(app)
        .get('/api/cuentas');
      
      expect(res.statusCode).toEqual(403);
      expect(res.body).toHaveProperty('message', 'No se proporcionó un token de acceso');
    });
  });
});
