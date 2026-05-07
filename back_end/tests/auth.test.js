const request = require('supertest');
const app = require('../server');

describe('Auth API', () => {
  describe('POST /api/auth/login', () => {
    it('debería iniciar sesión correctamente con credenciales válidas', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'maria@correo.com',
          password: '123456'
        });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Login exitoso');
      expect(res.body.user).toHaveProperty('email', 'maria@correo.com');
    });

    it('debería fallar con una contraseña incorrecta', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'maria@correo.com',
          password: 'password_erronea'
        });
      
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('message', 'Contraseña incorrecta');
    });

    it('debería fallar si el usuario no existe', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'noexiste@correo.com',
          password: '123456'
        });
      
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message', 'Usuario no encontrado');
    });
  });
});
