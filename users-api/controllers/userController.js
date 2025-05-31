const UserModel = require('../models/userModel');

/**
 * Controlador para gestión de usuarios
 */
class UserController {
  constructor() {
    this.userModel = new UserModel();
  }

  /**
   * Obtiene todos los usuarios
   * GET /api/users
   */
  async getAllUsers(req, res) {
    try {
      const users = await this.userModel.getAllUsers();
      
      res.status(200).json({
        success: true,
        message: 'Usuarios obtenidos exitosamente',
        data: users,
        count: users.length
      });
    } catch (error) {
      console.error('Error en getAllUsers:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  /**
   * Obtiene un usuario por ID
   * GET /api/users/:id
   */
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await this.userModel.getUserById(id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: `Usuario con ID ${id} no encontrado`
        });
      }

      res.status(200).json({
        success: true,
        message: 'Usuario obtenido exitosamente',
        data: user
      });
    } catch (error) {
      console.error('Error en getUserById:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  /**
   * Crea un nuevo usuario
   * POST /api/users
   */
  async createUser(req, res) {
    try {
      const { name, email, age } = req.body;

      // Verificar si el email ya existe
      const emailExists = await this.userModel.emailExists(email);
      if (emailExists) {
        return res.status(409).json({
          success: false,
          message: 'El email ya está registrado'
        });
      }

      const newUser = await this.userModel.createUser({ name, email, age });

      res.status(201).json({
        success: true,
        message: 'Usuario creado exitosamente',
        data: newUser
      });
    } catch (error) {
      console.error('Error en createUser:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  /**
   * Actualiza un usuario existente
   * PUT /api/users/:id
   */
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Si se está actualizando el email, verificar que no exista
      if (updateData.email) {
        const emailExists = await this.userModel.emailExists(updateData.email, parseInt(id));
        if (emailExists) {
          return res.status(409).json({
            success: false,
            message: 'El email ya está registrado por otro usuario'
          });
        }
      }

      const updatedUser = await this.userModel.updateUser(id, updateData);

      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: `Usuario con ID ${id} no encontrado`
        });
      }

      res.status(200).json({
        success: true,
        message: 'Usuario actualizado exitosamente',
        data: updatedUser
      });
    } catch (error) {
      console.error('Error en updateUser:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  /**
   * Elimina un usuario
   * DELETE /api/users/:id
   */
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const deleted = await this.userModel.deleteUser(id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: `Usuario con ID ${id} no encontrado`
        });
      }

      res.status(200).json({
        success: true,
        message: 'Usuario eliminado exitosamente'
      });
    } catch (error) {
      console.error('Error en deleteUser:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  /**
   * Obtiene estadísticas de usuarios
   * GET /api/users/stats
   */
  async getUserStats(req, res) {
    try {
      const users = await this.userModel.getAllUsers();
      
      const stats = {
        totalUsers: users.length,
        averageAge: users.length > 0 ? 
          Math.round(users.reduce((sum, user) => sum + user.age, 0) / users.length) : 0,
        ageRanges: {
          '18-25': users.filter(user => user.age >= 18 && user.age <= 25).length,
          '26-35': users.filter(user => user.age >= 26 && user.age <= 35).length,
          '36-50': users.filter(user => user.age >= 36 && user.age <= 50).length,
          '50+': users.filter(user => user.age > 50).length
        },
        recentUsers: users
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5)
      };

      res.status(200).json({
        success: true,
        message: 'Estadísticas obtenidas exitosamente',
        data: stats
      });
    } catch (error) {
      console.error('Error en getUserStats:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
}

module.exports = UserController;
