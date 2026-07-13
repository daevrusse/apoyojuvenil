# Landing — Certificación en Pastoral Juvenil 2026

Landing page estática lista para GitHub Pages, con formulario conectado a Google Sheets mediante Google Apps Script.

## Archivos

- `index.html`: estructura de la landing.
- `styles.css`: diseño responsivo.
- `script.js`: validación, envío y redirección al grupo.
- `Code.gs`: código para Google Apps Script.
- `assets/`: imágenes de campaña.

## 1. Preparar Google Sheets

En tu hoja de cálculo crea una pestaña llamada exactamente:

`Registros`

En la primera fila coloca estas columnas:

`Fecha | Nombre completo | País o ciudad | WhatsApp | Origen`

## 2. Configurar Google Apps Script

1. Abre la hoja de cálculo.
2. Ve a **Extensiones > Apps Script**.
3. Borra el código inicial y pega el contenido de `Code.gs`.
4. Guarda el proyecto.
5. Ve a **Implementar > Nueva implementación**.
6. Tipo: **Aplicación web**.
7. Ejecutar como: **Yo**.
8. Quién tiene acceso: **Cualquier usuario**.
9. Implementa y copia la URL que termina en `/exec`.
10. En `script.js`, reemplaza:

```js
const GOOGLE_SCRIPT_URL = "PEGA_AQUI_TU_URL_DE_APPS_SCRIPT";
```

por tu URL real.

## 3. Publicar en GitHub Pages

1. Sube todos los archivos al repositorio.
2. En GitHub entra a **Settings > Pages**.
3. En **Build and deployment**, elige **Deploy from a branch**.
4. Selecciona la rama `main` y la carpeta `/root`.
5. Guarda.

GitHub mostrará la URL pública después de unos minutos.

## Flujo del usuario

1. Completa nombre, país/ciudad y WhatsApp.
2. Los datos se guardan en Google Sheets.
3. El usuario es redirigido a:

`https://rebrand.ly/certpastoral`

## WhatsApp flotante

El botón dirige a:

`+51 993 934 781`

con un mensaje precargado de consulta.
