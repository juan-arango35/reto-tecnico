# SISTEMA DE CARGA DE DATOS
## _Este proyecto es una aplicación de autenticación de usuario que permite el acceso a una página principal solo si se ingresan las credenciales correctas. Además, la aplicación permite a los usuarios con rol de **administrador** cargar archivos CSV con datos de usuarios como nombre, correo electrónico y edad._

## Características

- **Login seguro**: acceso a la página principal mediante ingreso de usuario y contraseña.
- **Rol de administrador**: los administradores tienen permisos especiales para cargar archivos CSV.
- **Carga de archivos CSV**: permite cargar archivos CSV con datos de usuarios (nombre, correo electrónico y edad).
- **Validación de datos**: verifica que los datos del CSV estén correctamente estructurados antes de ser cargados.
## Instalación

Sigue estos pasos para clonar el repositorio e instalar las dependencias del proyecto.

1. **Clona el repositorio:**

   ```bash
   git git@github.com:juan-arango35/reto-tecnico.git
   cd reto-tecnico
   npm install
   npm run dev

## Proceso
- **Login seguro**: Inicia sesión con el usuario que tenga rol de admin, sino cuenta con el email y  contraseña valido nos da el error de credenciales invalidas.

