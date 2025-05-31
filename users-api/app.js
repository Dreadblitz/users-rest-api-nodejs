const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

// Importar rutas
const userRoutes = require('./routes/users');

// Crear aplicación Express
const app = express();

// Configuración del puerto
const PORT = process.env.PORT || 3000;

// Middleware de seguridad
app.use(helmet());

// Configurar CORS
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para parsear JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware para logging de requests
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url} - IP: ${req.ip}`);
  next();
});

// Ruta de salud del servidor
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Servidor funcionando correctamente',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Ruta principal
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Bienvenido a la API de Usuarios',
    version: '1.0.0',
    documentation: '/api/docs',
    endpoints: {
      users: '/api/users',
      health: '/health'
    }
  });
});

// Rutas de la API
app.use('/api/users', userRoutes);

// Ruta para documentación básica
app.get('/api/docs', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Documentación de la API de Usuarios',
    version: '1.0.0',
    baseUrl: `${req.protocol}://${req.get('host')}`,
    endpoints: [
      {
        method: 'GET',
        path: '/api/users',
        description: 'Obtiene todos los usuarios',
        response: 'Array de usuarios'
      },
      {
        method: 'GET',
        path: '/api/users/:id',
        description: 'Obtiene un usuario por ID',
        parameters: { id: 'number - ID del usuario' },
        response: 'Objeto usuario'
      },
      {
        method: 'POST',
        path: '/api/users',
        description: 'Crea un nuevo usuario',
        body: {
          name: 'string - Nombre del usuario (requerido)',
          email: 'string - Email del usuario (requerido)',
          age: 'number - Edad del usuario (requerido)'
        },
        response: 'Usuario creado'
      },
      {
        method: 'PUT',
        path: '/api/users/:id',
        description: 'Actualiza un usuario existente',
        parameters: { id: 'number - ID del usuario' },
        body: {
          name: 'string - Nombre del usuario (opcional)',
          email: 'string - Email del usuario (opcional)',
          age: 'number - Edad del usuario (opcional)'
        },
        response: 'Usuario actualizado'
      },
      {
        method: 'DELETE',
        path: '/api/users/:id',
        description: 'Elimina un usuario',
        parameters: { id: 'number - ID del usuario' },
        response: 'Confirmación de eliminación'
      },
      {
        method: 'GET',
        path: '/api/users/stats',
        description: 'Obtiene estadísticas de usuarios',
        response: 'Estadísticas generales'
      }
    ],
    examples: {
      createUser: {
        url: '/api/users',
        method: 'POST',
        body: {
          name: 'Ana Martínez',
          email: 'ana.martinez@email.com',
          age: 28
        }
      },
      updateUser: {
        url: '/api/users/1',
        method: 'PUT',
        body: {
          name: 'Ana Martínez López',
          age: 29
        }
      }
    }
  });
});

// Middleware para manejar rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada',
    path: req.originalUrl,
    method: req.method,
    availableEndpoints: [
      'GET /',
      'GET /health',
      'GET /api/docs',
      'GET /api/users',
      'GET /api/users/:id',
      'POST /api/users',
      'PUT /api/users/:id',
      'DELETE /api/users/:id',
      'GET /api/users/stats'
    ]
  });
});

// Middleware global para manejo de errores
app.use((error, req, res, next) => {
  console.error('Error no manejado:', error);
  
  // Error de JSON malformado
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return res.status(400).json({
      success: false,
      message: 'JSON malformado en el cuerpo de la petición'
    });
  }

  // Error genérico
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log('🚀 SERVIDOR INICIADO EXITOSAMENTE');
  console.log('='.repeat(50));
  console.log(`📍 Puerto: ${PORT}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`📚 Documentación: http://localhost:${PORT}/api/docs`);
  console.log(`❤️  Salud: http://localhost:${PORT}/health`);
  console.log(`🔧 Entorno: ${process.env.NODE_ENV || 'development'}`);
  console.log('='.repeat(50));
});

// Manejo de cierre graceful
process.on('SIGTERM', () => {
  console.log('🛑 Recibida señal SIGTERM, cerrando servidor...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 Recibida señal SIGINT, cerrando servidor...');
  process.exit(0);
});

module.exports = app;
