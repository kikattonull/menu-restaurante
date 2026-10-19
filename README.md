# Menú digital — primera versión

## Cómo abrirlo
1. Descomprime `menu-restaurante.zip`.
2. Abre Visual Studio Code.
3. Selecciona **Archivo > Abrir carpeta** y elige `menu-restaurante`.
4. Abre `index.html` y ejecútalo en tu navegador. Puedes abrirlo directamente con doble clic; para desarrollo, se recomienda la extensión Live Server.

## Archivos
- `index.html`: estructura de la página.
- `css/estilos.css`: diseño adaptable a celular y computadora.
- `js/menu.js`: datos de ejemplo, búsqueda, categorías y disponibilidad.

## Importante
Esta primera versión usa productos de ejemplo guardados en `js/menu.js`. Si cambias un producto aquí, debes guardar el archivo y volver a publicar el sitio. Todavía no existe un panel privado ni una base de datos conectada.

En el siguiente paso conectaremos Supabase y añadiremos autenticación, tablas, permisos RLS y administración de productos. Nunca pongas la `service_role key` de Supabase en el navegador. La clave pública anon/publishable se puede usar desde el cliente solo con RLS correctamente configurado.
