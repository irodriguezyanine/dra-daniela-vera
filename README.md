# Sitio web Dra. Daniela Vera Osorio

Página profesional y minimalista para clínica dental.

## Estructura
- `index.html` contenido principal
- `styles.css` estilos
- `script.js` comportamiento básico del menú

## Personalización rápida
- Reemplaza los textos de “Espacio para tu foto profesional” por una imagen real.
- Actualiza el enlace de Instagram en `index.html` (sección final).
- Cambia el mensaje de WhatsApp si lo deseas.

## Crear repositorio en GitHub (desde cero)
1. Inicializa Git en esta carpeta:
   ```bash
   git init
   git add .
   git commit -m "Inicializar sitio web"
   ```
2. Crea el repo en GitHub y sube el código (con GitHub CLI):
   ```bash
   gh repo create dra-daniela-vera --public --source . --remote origin --push
   ```
   Si no tienes `gh`, puedes crear el repo en GitHub y luego:
   ```bash
   git remote add origin https://github.com/TU_USUARIO/dra-daniela-vera.git
   git branch -M main
   git push -u origin main
   ```

## Desplegar en Vercel
1. Entra a https://vercel.com/new
2. Importa el repositorio.
3. Framework: **Other** (sitio estático)
4. Deploy y listo.
