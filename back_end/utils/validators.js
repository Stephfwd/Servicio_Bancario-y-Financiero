const Joi = require('joi');

// Expresiones regulares para validación
const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/; // Solo letras y espacios
const phoneRegex = /^[0-9-]+$/; // Solo números y guiones
const duiRegex = /^[0-9]{8}-[0-9]$/; // Formato salvadoreño: 00000000-0

// Esquema base para creación (requiere password)
const userSchema = Joi.object({
  nombre: Joi.string().pattern(nameRegex).min(2).max(50).required().messages({
    'string.pattern.base': 'El nombre solo debe contener letras y espacios'
  }),
  apellido: Joi.string().pattern(nameRegex).min(2).max(50).required().messages({
    'string.pattern.base': 'El apellido solo debe contener letras y espacios'
  }),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  telefono: Joi.string().pattern(phoneRegex).allow('', null).messages({
    'string.pattern.base': 'El teléfono solo debe contener números y guiones'
  }),
  dui: Joi.string().pattern(duiRegex).allow('', null).messages({
    'string.pattern.base': 'El DUI debe tener el formato 00000000-0'
  }),
  rol_id: Joi.number().integer().required(),
  estado: Joi.string().valid('activo', 'inactivo').default('activo')
});

// Esquema para actualización (password es opcional)
const updateUserSchema = Joi.object({
  nombre: Joi.string().pattern(nameRegex).min(2).max(50).messages({
    'string.pattern.base': 'El nombre solo debe contener letras y espacios'
  }),
  apellido: Joi.string().pattern(nameRegex).min(2).max(50).messages({
    'string.pattern.base': 'El apellido solo debe contener letras y espacios'
  }),
  email: Joi.string().email(),
  password: Joi.string().min(6).allow('', null),
  telefono: Joi.string().pattern(phoneRegex).allow('', null).messages({
    'string.pattern.base': 'El teléfono solo debe contener números y guiones'
  }),
  dui: Joi.string().pattern(duiRegex).allow('', null).messages({
    'string.pattern.base': 'El DUI debe tener el formato 00000000-0'
  }),
  rol_id: Joi.number().integer(),
  estado: Joi.string().valid('activo', 'inactivo')
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

// Esquema para transferencias
const transferSchema = Joi.object({
  cuenta_origen_id: Joi.number().integer().required(),
  cuenta_destino_id: Joi.number().integer().required(),
  monto: Joi.number().positive().precision(2).required().messages({
    'number.positive': 'El monto debe ser mayor a 0'
  }),
  descripcion: Joi.string().pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,-]+$/).max(255).required().messages({
    'string.pattern.base': 'La descripción solo puede contener letras, números, espacios, puntos, comas y guiones'
  })
});

module.exports = {
  userSchema,
  updateUserSchema,
  loginSchema,
  transferSchema
};
