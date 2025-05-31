# 🚀 Guía de Postman para API REST de Usuarios

Esta guía te ayudará a probar la API completa usando Postman con la colección predefinida.

## 📥 Importar la Colección

1. **Abrir Postman**
2. **Importar colección:**
   - Clic en "Import" (esquina superior izquierda)
   - Seleccionar el archivo `postman-collection.json`
   - O arrastrar el archivo directamente a Postman

## 🔧 Configuración Inicial

La colección incluye una variable de entorno:
- **`base_url`**: `http://localhost:3000`

Si tu servidor corre en otro puerto, edita esta variable:
1. Clic en la colección "API REST de Usuarios"
2. Tab "Variables"
3. Cambiar el valor de `base_url`

## 📋 Endpoints Incluidos

### ✅ Endpoints Básicos
1. **🏠 Página Principal** - `GET /`
2. **❤️ Salud del Servidor** - `GET /health`
3. **📚 Documentación** - `GET /api/docs`

### 👥 CRUD de Usuarios
4. **👥 Obtener Todos los Usuarios** - `GET /api/users`
5. **👤 Obtener Usuario por ID** - `GET /api/users/1`
6. **➕ Crear Nuevo Usuario** - `POST /api/users`
7. **✏️ Actualizar Usuario** - `PUT /api/users/1`
8. **🗑️ Eliminar Usuario** - `DELETE /api/users/3`
9. **📊 Estadísticas de Usuarios** - `GET /api/users/stats`

### ❌ Casos de Error
10. **❌ Crear Usuario - Error de Validación** - Datos inválidos
11. **❌ Usuario No Encontrado** - ID inexistente
12. **❌ Ruta No Encontrada** - Endpoint inexistente

## 🧪 Orden Recomendado para Pruebas

### 1. Verificación Inicial
```
1. ❤️ Salud del Servidor
2. 🏠 Página Principal
3. 📚 Documentación
```

### 2. Lectura (GET)
```
4. 👥 Obtener Todos los Usuarios
5. 👤 Obtener Usuario por ID
6. 📊 Estadísticas de Usuarios
```

### 3. Escritura (POST/PUT/DELETE)
```
7. ➕ Crear Nuevo Usuario
8. 👥 Obtener Todos los Usuarios (verificar creación)
9. ✏️ Actualizar Usuario
10. 👤 Obtener Usuario por ID (verificar actualización)
11. 🗑️ Eliminar Usuario
12. 👥 Obtener Todos los Usuarios (verificar eliminación)
```

### 4. Casos de Error
```
13. ❌ Crear Usuario - Error de Validación
14. ❌ Usuario No Encontrado
15. ❌ Ruta No Encontrada
```

## 📝 Ejemplos de Datos para Pruebas

### Crear Usuario (válido)
```json
{
  "name": "Pedro González",
  "email": "pedro.gonzalez@email.com",
  "age": 32
}
```

### Actualizar Usuario (parcial)
```json
{
  "name": "Pedro González Martínez",
  "age": 33
}
```

### Crear Usuario (inválido - para probar validaciones)
```json
{
  "name": "A",
  "email": "email-malo",
  "age": 200
}
```

## 🔍 Qué Verificar en Cada Request

### ✅ Respuestas Exitosas
- **Status Code**: 200 (GET/PUT/DELETE) o 201 (POST)
- **Estructura**: `{"success": true, "message": "...", "data": {...}}`
- **Headers**: `Content-Type: application/json`

### ❌ Respuestas de Error
- **Status Code**: 400 (validación), 404 (no encontrado), 409 (conflicto)
- **Estructura**: `{"success": false, "message": "...", "errors": [...]}`

## 💡 Tips de Uso

1. **Headers automáticos**: Los requests POST/PUT ya incluyen `Content-Type: application/json`

2. **Variables**: Usa `{{base_url}}` si necesitas crear requests adicionales

3. **Body**: Los requests con body ya tienen ejemplos listos para usar

4. **IDs dinámicos**: Copia IDs de respuestas anteriores para pruebas específicas

5. **Orden de pruebas**: Sigue el orden recomendado para una experiencia coherente

## 🚨 Troubleshooting

### Servidor no responde
- Verificar que el servidor esté corriendo (`npm start`)
- Confirmar puerto en `base_url`
- Revisar la terminal por errores

### Errores de validación
- Verificar formato JSON
- Revisar tipos de datos (string, number)
- Confirmar campos requeridos

### Usuarios no encontrados
- Verificar IDs existentes con `GET /api/users`
- Usar IDs de usuarios creados recientemente

## 📊 Resultados Esperados

Al completar todas las pruebas, deberías haber verificado:
- ✅ Servidor funcionando
- ✅ CRUD completo funcional
- ✅ Validaciones trabajando
- ✅ Manejo de errores correcto
- ✅ Persistencia en archivo JSON

¡Listo para probar tu API! 🎉
