# Backend Node.js con Principios SOLID

Un backend RESTful API desarrollado en Node.js con TypeScript que implementa un CRUD completo de usuarios siguiendo los principios SOLID de programación orientada a objetos.

## 🏗️ Arquitectura y Principios SOLID

Este proyecto demuestra la aplicación práctica de los principios SOLID:

### **S - Single Responsibility Principle (SRP)**
Cada clase tiene una única responsabilidad:
- **`UserController`**: Solo maneja las requests HTTP y responses
- **`UserService`**: Contiene únicamente la lógica de negocio de usuarios
- **`MongoUserRepository`**: Se encarga exclusivamente del acceso a datos en MongoDB
- **`CreateUserDto/UpdateUserDto`**: Validan y transforman datos de entrada

### **O - Open/Closed Principle (OCP)**
El sistema está abierto para extensión pero cerrado para modificación:
- Nuevas implementaciones de repositorios pueden añadirse sin modificar el servicio existente
- Los DTOs pueden extenderse con nuevas validaciones sin cambiar la lógica de negocio

### **L - Liskov Substitution Principle (LSP)**
Las implementaciones concretas pueden reemplazar sus interfaces sin alterar la funcionalidad:
- `MongoUserRepository` implementa `IUserRepository` y puede ser sustituida por cualquier otra implementación (PostgreSQL, MySQL, etc.)
- `UserService` implementa `IUserService` y puede ser intercambiada transparentemente

### **I - Interface Segregation Principle (ISP)**
Las interfaces son específicas y cohesivas:
- `IUserRepository`: Define solo métodos relacionados con persistencia de usuarios
- `IUserService`: Contiene únicamente operaciones de negocio de usuarios
- `IUser`: Define la estructura de datos del usuario

### **D - Dependency Inversion Principle (DIP)**
Los módulos de alto nivel no dependen de implementaciones concretas:
- `UserService` depende de la abstracción `IUserRepository`, no de `MongoUserRepository`
- La inyección de dependencias se maneja con **TSyringe**
- El contenedor de dependencias configura las implementaciones concretas

## 🛠️ Tecnologías Utilizadas

- **Node.js** con **TypeScript**
- **Express.js** - Framework web
- **MongoDB** con **Mongoose** - Base de datos y ODM
- **TSyringe** - Inyección de dependencias
- **class-validator** - Validación de DTOs
- **class-transformer** - Transformación de objetos
- **bcrypt** - Encriptación de contraseñas
- **dotenv** - Gestión de variables de entorno

## 📁 Estructura del Proyecto

```
src/
├── controllers/          # Controladores HTTP (manejo de requests/responses)
│   └── user.controller.ts
├── services/            # Lógica de negocio
│   └── user.service.ts
├── repositories/        # Capa de acceso a datos
│   ├── user.repository.ts      # Interfaz del repositorio
│   └── mongo-user.repository.ts # Implementación MongoDB
├── interfaces/          # Definiciones de tipos y contratos
│   ├── user.interface.ts
│   └── user-service.interface.ts
├── dtos/               # Data Transfer Objects con validaciones
│   ├── create-user.dto.ts
│   └── update-user.dto.ts
├── models/             # Modelos de base de datos
│   └── User.ts
├── routes/             # Definición de rutas
│   └── user.routes.ts
├── infrastructure/     # Configuración de dependencias
│   └── container.ts
├── utils/              # Utilidades
│   └── error-handler.ts
├── app.ts              # Configuración de Express
└── server.ts           # Punto de entrada de la aplicación
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (v18 o superior)
- MongoDB en ejecución
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Tobias-Vega/backend-node-solid.git
   cd backend-node-solid
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   
   Crear un archivo `.env` en la raíz del proyecto:
   ```env
   PORT=
   MONGO_URL=
   ```

4. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

   El servidor se iniciará en `http://localhost:3000`

## 📡 API Endpoints

### Usuarios

| Método | Endpoint     | Descripción                | Body                                    |
|--------|------------- |---------------------------|-----------------------------------------|
| POST   | `/users`     | Crear nuevo usuario       | `{ "name": "string", "email": "string", "password": "string" }` |
| GET    | `/users`     | Obtener todos los usuarios| -                                       |
| GET    | `/users/:id` | Obtener usuario por ID    | -                                       |
| PUT    | `/users/:id` | Actualizar usuario        | `{ "name": "string", "email": "string", "password": "string" }` |
| DELETE | `/users/:id` | Eliminar usuario          | -                                       |

### Ejemplos de uso

**Crear usuario:**
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Juan Pérez", "email": "juan@example.com", "password": "123456"}'
```

**Obtener todos los usuarios:**
```bash
curl http://localhost:3000/users
```

**Obtener usuario específico:**
```bash
curl http://localhost:3000/users/507f1f77bcf86cd799439011
```

**Actualizar usuario:**
```bash
curl -X PUT http://localhost:3000/users/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{"name": "Juan Carlos Pérez"}'
```

**Eliminar usuario:**
```bash
curl -X DELETE http://localhost:3000/users/507f1f77bcf86cd799439011
```

## 🧪 Validaciones

Los DTOs incluyen validaciones automáticas:

- **name**: Requerido, no puede estar vacío
- **email**: Debe ser un email válido
- **password**: Mínimo 6 caracteres

## 🔒 Seguridad

- Las contraseñas se encriptan usando **bcrypt** antes de almacenarse
- Validación de emails únicos en la base de datos
- Manejo global de errores