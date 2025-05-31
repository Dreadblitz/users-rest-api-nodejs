const path = require('path');
const FileUtils = require('../utils/fileUtils');

/**
 * Modelo para gestión de usuarios
 */
class UserModel {
  constructor() {
    this.dataPath = path.join(__dirname, '../data/users.json');
  }

  /**
   * Obtiene todos los usuarios
   * @returns {Promise<Array>} - Array de usuarios
   */
  async getAllUsers() {
    try {
      const data = await FileUtils.readJsonFile(this.dataPath);
      return data.users || [];
    } catch (error) {
      throw new Error(`Error al obtener usuarios: ${error.message}`);
    }
  }

  /**
   * Obtiene un usuario por ID
   * @param {number} id - ID del usuario
   * @returns {Promise<Object|null>} - Usuario encontrado o null
   */
  async getUserById(id) {
    try {
      const users = await this.getAllUsers();
      return users.find(user => user.id === parseInt(id)) || null;
    } catch (error) {
      throw new Error(`Error al obtener usuario: ${error.message}`);
    }
  }

  /**
   * Crea un nuevo usuario
   * @param {Object} userData - Datos del usuario
   * @returns {Promise<Object>} - Usuario creado
   */
  async createUser(userData) {
    try {
      const data = await FileUtils.readJsonFile(this.dataPath);
      
      const newUser = {
        id: data.nextId,
        name: userData.name,
        email: userData.email,
        age: userData.age,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      data.users.push(newUser);
      data.nextId += 1;

      await FileUtils.writeJsonFile(this.dataPath, data);
      return newUser;
    } catch (error) {
      throw new Error(`Error al crear usuario: ${error.message}`);
    }
  }

  /**
   * Actualiza un usuario existente
   * @param {number} id - ID del usuario
   * @param {Object} userData - Nuevos datos del usuario
   * @returns {Promise<Object|null>} - Usuario actualizado o null si no existe
   */
  async updateUser(id, userData) {
    try {
      const data = await FileUtils.readJsonFile(this.dataPath);
      const userIndex = data.users.findIndex(user => user.id === parseInt(id));

      if (userIndex === -1) {
        return null;
      }

      const updatedUser = {
        ...data.users[userIndex],
        ...userData,
        id: parseInt(id), // Mantener el ID original
        updatedAt: new Date().toISOString()
      };

      data.users[userIndex] = updatedUser;
      await FileUtils.writeJsonFile(this.dataPath, data);
      
      return updatedUser;
    } catch (error) {
      throw new Error(`Error al actualizar usuario: ${error.message}`);
    }
  }

  /**
   * Elimina un usuario
   * @param {number} id - ID del usuario
   * @returns {Promise<boolean>} - True si se eliminó, false si no existía
   */
  async deleteUser(id) {
    try {
      const data = await FileUtils.readJsonFile(this.dataPath);
      const userIndex = data.users.findIndex(user => user.id === parseInt(id));

      if (userIndex === -1) {
        return false;
      }

      data.users.splice(userIndex, 1);
      await FileUtils.writeJsonFile(this.dataPath, data);
      
      return true;
    } catch (error) {
      throw new Error(`Error al eliminar usuario: ${error.message}`);
    }
  }

  /**
   * Verifica si un email ya existe
   * @param {string} email - Email a verificar
   * @param {number} excludeId - ID a excluir de la búsqueda (para actualizaciones)
   * @returns {Promise<boolean>} - True si existe, false si no
   */
  async emailExists(email, excludeId = null) {
    try {
      const users = await this.getAllUsers();
      return users.some(user => 
        user.email.toLowerCase() === email.toLowerCase() && 
        user.id !== excludeId
      );
    } catch (error) {
      throw new Error(`Error al verificar email: ${error.message}`);
    }
  }
}

module.exports = UserModel;
