# API REST de Usuarios

Una API REST completa para gestión de usuarios desarrollada con Node.js y Express, utilizando archivos JSON como base de datos.

## 🚀 Características

- ✅ **CRUD completo** para usuarios (Crear, Leer, Actualizar, Eliminar)
- ✅ **Validación de datos** robusta con express-validator
- ✅ **Almacenamiento en JSON** con manejo de archivos asíncrono
- ✅ **Estructura profesional** de carpetas y código
- ✅ **Documentación integrada** en la API
- ✅ **Manejo de errores** centralizado
- ✅ **Seguridad** con Helmet y CORS
- ✅ **Logging** de requests
- ✅ **Estadísticas** de usuarios

## 📁 Estructura del Proyecto

```
users-api/
├── app.js                 # Archivo principal de la aplicación
├── package.json           # Dependencias y scripts
├── README.md             # Documentación
├── controllers/          # Lógica de negocio
│   └── userController.js
├── data/                 # Base de datos JSON
│   └── users.json
├── middleware/           # Middleware personalizado
│   └── validation.js
├── models/              # Modelos de datos
│   └── userModel.js
├── routes/              # Definición de rutas
│   └── users.js
└── utils/               # Utilidades
    └── fileUtils.js
```

## 🛠️ Instalación

1. **Clonar o descargar el proyecto**
   ```bash
   cd users-api
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar el servidor**
   ```bash
   # Modo desarrollo (con nodemon)
   npm run dev
   
   # Modo producción
   npm start
   ```

4. **Verificar instalación**
   - Abrir navegador en: http://localhost:3000
   - Verificar salud del servidor: http://localhost:3000/health

## 📚 Documentación de la API

### URL Base
```
http://localhost:3000
```

### Endpoints Disponibles

#### 1. Obtener todos los usuarios
```http
GET /api/users
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "message": "Usuarios obtenidos exitosamente",
  "data": [
    {
      "id": 1,
      "name": "Juan Pérez",
      "email": "juan.perez@email.com",
      "age": 30,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "count": 1
}
```

#### 2. Obtener usuario por ID
```http
GET /api/users/:id
```

**Parámetros:**
- `id` (number): ID del usuario

**Respuesta exitosa:**
```json
{
  "success": true,
  "message": "Usuario obtenido exitosamente",
  "data": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan.perez@email.com",
    "age": 30,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### 3. Crear nuevo usuario
```http
POST /api/users
Content-Type: application/json
```

**Cuerpo de la petición:**
```json
{
  "name": "Ana Martínez",
  "email": "ana.martinez@email.com",
  "age": 28
}
```

**Validaciones:**
- `name`: Requerido, 2-100 caracteres, solo letras y espacios
- `email`: Requerido, formato de email válido, único
- `age`: Requerido, número entero entre 1 y 120

**Respuesta exitosa:**
```json
{
  "success": true,
  "message": "Usuario creado exitosamente",
  "data": {
    "id": 4,
    "name": "Ana Martínez",
    "email": "ana.martinez@email.com",
    "age": 28,
    "createdAt": "2024-01-20T15:45:00.000Z",
    "updatedAt": "2024-01-20T15:45:00.000Z"
  }
}
```

#### 4. Actualizar usuario
```http
PUT /api/users/:id
Content-Type: application/json
```

**Parámetros:**
- `id` (number): ID del usuario

**Cuerpo de la petición (todos los campos son opcionales):**
```json
{
  "name": "Ana Martínez López",
  "email": "ana.lopez@email.com",
  "age": 29
}
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "message": "Usuario actualizado exitosamente",
  "data": {
    "id": 4,
    "name": "Ana Martínez López",
    "email": "ana.lopez@email.com",
    "age": 29,
    "createdAt": "2024-01-20T15:45:00.000Z",
    "updatedAt": "2024-01-20T16:30:00.000Z"
  }
}
```

#### 5. Eliminar usuario
```http
DELETE /api/users/:id
```

**Parámetros:**
- `id` (number): ID del usuario

**Respuesta exitosa:**
```json
{
  "success": true,
  "message": "Usuario eliminado exitosamente"
}
```

#### 6. Obtener estadísticas
```http
GET /api/users/stats
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "message": "Estadísticas obtenidas exitosamente",
  "data": {
    "totalUsers": 3,
    "averageAge": 30,
    "ageRanges": {
      "18-25": 1,
      "26-35": 2,
      "36-50": 0,
      "50+": 0
    },
    "recentUsers": [...]
  }
}
```

### Rutas Adicionales

#### Documentación interactiva
```http
GET /api/docs
```

#### Salud del servidor
```http
GET /health
```

#### Página principal
```http
GET /
```

## 🔧 Códigos de Estado HTTP

| Código | Descripción |
|--------|-------------|
| 200 | Operación exitosa |
| 201 | Recurso creado exitosamente |
| 400 | Error de validación o petición malformada |
| 404 | Recurso no encontrado |
| 409 | Conflicto (email duplicado) |
| 500 | Error interno del servidor |

## 🛡️ Validaciones

### Crear Usuario
- **name**: Obligatorio, 2-100 caracteres, solo letras y espacios
- **email**: Obligatorio, formato válido, único en el sistema
- **age**: Obligatorio, número entero entre 1 y 120

### Actualizar Usuario
- **name**: Opcional, 2-100 caracteres, solo letras y espacios
- **email**: Opcional, formato válido, único en el sistema
- **age**: Opcional, número entero entre 1 y 120
- Al menos un campo debe estar presente

## 📝 Ejemplos de Uso

### Con cURL

**Obtener todos los usuarios:**
```bash
curl -X GET http://localhost:3000/api/users
```

**Crear un usuario:**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pedro González",
    "email": "pedro.gonzalez@email.com",
    "age": 32
  }'
```

**Actualizar un usuario:**
```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pedro González Martínez",
    "age": 33
  }'
```

**Eliminar un usuario:**
```bash
curl -X DELETE http://localhost:3000/api/users/1
```

### Con JavaScript (Fetch API)

```javascript
// Obtener todos los usuarios
const getUsers = async () => {
  const response = await fetch('http://localhost:3000/api/users');
  const data = await response.json();
  console.log(data);
};

// Crear un usuario
const createUser = async () => {
  const response = await fetch('http://localhost:3000/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'Laura Rodríguez',
      email: 'laura.rodriguez@email.com',
      age: 27
    })
  });
  const data = await response.json();
  console.log(data);
};
```

## 🗂️ Base de Datos

Los datos se almacenan en `data/users.json` con la siguiente estructura:

```json
{
  "users": [
    {
      "id": 1,
      "name": "Juan Pérez",
      "email": "juan.perez@email.com",
      "age": 30,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "nextId": 2
}
```

## 🔒 Seguridad

- **Helmet**: Protección contra vulnerabilidades comunes
- **CORS**: Control de acceso entre dominios
- **Validación**: Sanitización y validación de datos de entrada
- **Rate limiting**: Límites en el tamaño de peticiones (10MB)

## 🚀 Scripts Disponibles

```bash
# Iniciar en modo desarrollo (con nodemon)
npm run dev

# Iniciar en modo producción
npm start

# Ejecutar tests (placeholder)
npm test
```

## 🌍 Variables de Entorno

Puedes configurar las siguientes variables de entorno:

```bash
PORT=3000                    # Puerto del servidor
NODE_ENV=development         # Entorno de ejecución
ALLOWED_ORIGINS=*           # Orígenes permitidos para CORS
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🆘 Soporte

Si encuentras algún problema o tienes preguntas:

1. Revisa la documentación integrada: http://localhost:3000/api/docs
2. Verifica el estado del servidor: http://localhost:3000/health
3. Revisa los logs de la consola para errores específicos

## 🔄 Changelog

### v1.0.0
- ✅ Implementación inicial de CRUD de usuarios
- ✅ Validación de datos con express-validator
- ✅ Almacenamiento en archivos JSON
- ✅ Documentación completa
- ✅ Manejo de errores robusto
- ✅ Estadísticas de usuarios
