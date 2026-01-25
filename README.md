# Proyecto Vino Nuevo Web

Este proyecto consiste en una aplicación web con un frontend desarrollado en React y un backend en Node.js (Express) con SQLite.

## Estructura del Proyecto

- `backend/`: Contiene el código del servidor Node.js (Express), la configuración de la base de datos SQLite y las APIs.
- `src/`: Contiene el código fuente del frontend (React).
- `public/`: Contiene archivos estáticos que son servidos directamente (ej. `uploads/` para imágenes).

## Configuración y Ejecución

Para levantar el proyecto y probar la nueva funcionalidad de galería (imágenes y videos), sigue los siguientes pasos:

### 1. Configuración Inicial del Backend

Asegúrate de estar en el directorio raíz del proyecto (`vino-nuevo-web/`).

1.  **Instalar dependencias del backend:**
    ```bash
    cd backend
    npm install
    cd ..
    ```

2.  **Inicializar la base de datos:**
    El backend utiliza SQLite. Necesitarás ejecutar un script para configurar las tablas iniciales.
    ```bash
    cd backend
    node setup-database.js
    cd ..
    ```
    Este script creará el archivo `database.sqlite` y poblará las tablas.

3.  **Configurar variables de entorno (opcional pero recomendado):**
    Crea un archivo `.env` en el directorio `backend/` con el siguiente contenido (si aún no existe):
    ```
    PORT=3001
    JWT_SECRET=tu_secreto_jwt_seguro
    YOUTUBE_API_KEY=tu_clave_api_youtube_opcional
    ```
    Asegúrate de cambiar `tu_secreto_jwt_seguro` por una cadena de caracteres única y compleja. La `YOUTUBE_API_KEY` es opcional si no usas la funcionalidad de proxy de YouTube.

### 2. Ejecutar el Backend

Desde el directorio `vino-nuevo-web/`, ejecuta el backend:
```bash
cd backend
npm start # O node server.js
cd ..
```
Verás un mensaje en la consola indicando que el servidor está escuchando en el puerto 3001.

### 3. Configuración Inicial del Frontend

1.  **Instalar dependencias del frontend:**
    ```bash
    npm install
    ```

### 4. Ejecutar el Frontend

Desde el directorio `vino-nuevo-web/`, ejecuta el frontend:
```bash
npm run dev
```
Esto iniciará el servidor de desarrollo de Vite (probablemente en `http://localhost:5173`).

## Prueba de la Nueva Funcionalidad de Galería

Una vez que el backend y el frontend estén en funcionamiento:

1.  **Accede al panel de administración:**
    Navega a `http://localhost:5173/admin` (o el puerto que te indique Vite).

2.  **Inicia Sesión:**
    Si es la primera vez, el usuario predeterminado es `admin` con contraseña `admin` (esto se configura en `setup-database.js`).

3.  **Gestionar Álbumes de Galería:**
    - En el menú de navegación del panel de administración, selecciona "Galería de Imágenes".
    - Aquí podrás ver, editar y eliminar álbumes existentes, así como crear nuevos.
    - Haz clic en "Añadir Álbum de Galería" para crear uno nuevo:
        - Introduce un título y una descripción.
        - Sube una imagen de portada.
        - En la sección "Contenido del Álbum", puedes:
            - Subir múltiples imágenes (archivos).
            - Añadir URLs de videos (por ejemplo, enlaces de YouTube o Vimeo). Los videos se mostrarán con una vista previa.
    - Recuerda hacer clic en "Guardar Cambios de Galería" para persistir tus modificaciones en la base de datos.

4.  **Ver la Galería en el Frontend:**
    - Navega a `http://localhost:5173/galerias`.
    - Aquí verás los álbumes que creaste en el panel de administración.
    - Haz clic en un álbum para ver sus imágenes y videos.

¡Disfruta de la nueva funcionalidad!
