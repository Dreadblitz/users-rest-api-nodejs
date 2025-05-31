const { body, param, validationResult } = require('express-validator');

/**
 * Middleware para manejar errores de validación
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Errores de validación',
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg,
        value: error.value
      }))
    });
  }
  next();
};

/**
 * Validaciones para crear usuario
 */
const validateCreateUser = [
  body('name')
    .notEmpty()
    .withMessage('El nombre es requerido')
    .isLength({ min: 2, max: 100 })
    .withMessage('El nombre debe tener entre 2 y 100 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage('El nombre solo puede contener letras y espacios'),
  
  body('email')
    .notEmpty()
    .withMessage('El email es requerido')
    .isEmail()
    .withMessage('Debe ser un email válido')
    .normalizeEmail()
    .isLength({ max: 255 })
    .withMessage('El email no puede exceder 255 caracteres'),
  
  body('age')
    .notEmpty()
    .withMessage('La edad es requerida')
    .isInt({ min: 1, max: 120 })
    .withMessage('La edad debe ser un número entero entre 1 y 120'),
  
  handleValidationErrors
];

/**
 * Validaciones para actualizar usuario
 */
const validateUpdateUser = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un número entero positivo'),
  
  body('name')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('El nombre debe tener entre 2 y 100 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage('El nombre solo puede contener letras y espacios'),
  
  body('email')
    .optional()
    .isEmail()
    .withMessage('Debe ser un email válido')
    .normalizeEmail()
    .isLength({ max: 255 })
    .withMessage('El email no puede exceder 255 caracteres'),
  
  body('age')
    .optional()
    .isInt({ min: 1, max: 120 })
    .withMessage('La edad debe ser un número entero entre 1 y 120'),
  
  // Validar que al menos un campo esté presente
  body()
    .custom((value, { req }) => {
      const { name, email, age } = req.body;
      if (!name && !email && age === undefined) {
        throw new Error('Debe proporcionar al menos un campo para actualizar');
      }
      return true;
    }),
  
  handleValidationErrors
];

/**
 * Validaciones para parámetros de ID
 */
const validateUserId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un número entero positivo'),
  
  handleValidationErrors
];

/**
 * Validaciones para query parameters de paginación
 */
const validatePagination = [
  body('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('La página debe ser un número entero positivo'),
  
  body('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('El límite debe ser un número entero entre 1 y 100'),
  
  handleValidationErrors
];

/**
 * Middleware para sanitizar datos de entrada
 */
const sanitizeInput = (req, res, next) => {
  if (req.body) {
    // Eliminar espacios en blanco al inicio y final de strings
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = req.body[key].trim();
      }
    });
  }
  next();
};

/**
 * Middleware para validar Content-Type en requests POST/PUT
 */
const validateContentType = (req, res, next) => {
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    if (!req.is('application/json')) {
      return res.status(400).json({
        success: false,
        message: 'Content-Type debe ser application/json'
      });
    }
  }
  next();
};

module.exports = {
  validateCreateUser,
  validateUpdateUser,
  validateUserId,
  validatePagination,
  sanitizeInput,
  validateContentType,
  handleValidationErrors
};
