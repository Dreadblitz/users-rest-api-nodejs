const express = require('express');
const UserController = require('../controllers/userController');
const {
  validateCreateUser,
  validateUpdateUser,
  validateUserId,
  sanitizeInput,
  validateContentType
} = require('../middleware/validation');

const router = express.Router();
const userController = new UserController();

// Middleware para todas las rutas
router.use(sanitizeInput);
router.use(validateContentType);

/**
 * @route   GET /api/users/stats
 * @desc    Obtiene estadísticas de usuarios
 * @access  Public
 */
router.get('/stats', (req, res) => {
  userController.getUserStats(req, res);
});

/**
 * @route   GET /api/users
 * @desc    Obtiene todos los usuarios
 * @access  Public
 */
router.get('/', (req, res) => {
  userController.getAllUsers(req, res);
});

/**
 * @route   GET /api/users/:id
 * @desc    Obtiene un usuario por ID
 * @access  Public
 */
router.get('/:id', validateUserId, (req, res) => {
  userController.getUserById(req, res);
});

/**
 * @route   POST /api/users
 * @desc    Crea un nuevo usuario
 * @access  Public
 */
router.post('/', validateCreateUser, (req, res) => {
  userController.createUser(req, res);
});

/**
 * @route   PUT /api/users/:id
 * @desc    Actualiza un usuario existente
 * @access  Public
 */
router.put('/:id', validateUpdateUser, (req, res) => {
  userController.updateUser(req, res);
});

/**
 * @route   DELETE /api/users/:id
 * @desc    Elimina un usuario
 * @access  Public
 */
router.delete('/:id', validateUserId, (req, res) => {
  userController.deleteUser(req, res);
});

module.exports = router;
