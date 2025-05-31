const fs = require('fs').promises;
const path = require('path');

/**
 * Utilidades para manejo de archivos JSON
 */
class FileUtils {
  /**
   * Lee un archivo JSON y retorna su contenido parseado
   * @param {string} filePath - Ruta del archivo
   * @returns {Promise<Object>} - Contenido del archivo parseado
   */
  static async readJsonFile(filePath) {
    try {
      const data = await fs.readFile(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new Error(`Archivo no encontrado: ${filePath}`);
      }
      throw new Error(`Error al leer el archivo: ${error.message}`);
    }
  }

  /**
   * Escribe datos en un archivo JSON
   * @param {string} filePath - Ruta del archivo
   * @param {Object} data - Datos a escribir
   * @returns {Promise<void>}
   */
  static async writeJsonFile(filePath, data) {
    try {
      const jsonData = JSON.stringify(data, null, 2);
      await fs.writeFile(filePath, jsonData, 'utf8');
    } catch (error) {
      throw new Error(`Error al escribir el archivo: ${error.message}`);
    }
  }

  /**
   * Verifica si un archivo existe
   * @param {string} filePath - Ruta del archivo
   * @returns {Promise<boolean>} - True si existe, false si no
   */
  static async fileExists(filePath) {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Crea un backup del archivo antes de modificarlo
   * @param {string} filePath - Ruta del archivo original
   * @returns {Promise<string>} - Ruta del archivo de backup
   */
  static async createBackup(filePath) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = `${filePath}.backup.${timestamp}`;
    
    try {
      const data = await fs.readFile(filePath);
      await fs.writeFile(backupPath, data);
      return backupPath;
    } catch (error) {
      throw new Error(`Error al crear backup: ${error.message}`);
    }
  }
}

module.exports = FileUtils;
