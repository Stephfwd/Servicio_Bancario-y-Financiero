const Joi = require('joi');

const userSchema = Joi.object({
  nombre: Joi.string().min(2).max(50).required().messages({
    'string.empty': 'El nombre es obligatorio',
    'string.min': 'El nombre debe tener al menos 2 caracteres'
  }),
  apellido: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required().messages({
    'string.email': 'El formato del email no es válido',
    'string.empty': 'El email es obligatorio'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'La contraseña debe tener al menos 6 caracteres'
  }),
  telefono: Joi.string().allow('', null),
  dui: Joi.string().allow('', null),
  rol_id: Joi.number().integer(),
  estado: Joi.string().valid('activo', 'inactivo')
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

module.exports = {
  userSchema,
  loginSchema
};
