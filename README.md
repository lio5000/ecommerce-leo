# E-Commerce Leo (Next.js & TypeScript)

Plataforma de e-commerce moderna desarrollada con Next.js (App Router), TypeScript y Tailwind CSS, diseñada para la venta y gestión de videojuegos, con generación automática de facturas en PDF, notificaciones por correo electrónico mediante EmailJS y alertas interactivas con SweetAlert2.

---

# Estructura del Proyecto

```
ecommerce-leo/
├── public/
│ └── images/
├── src/
│ ├── app/
│ │ ├── factura/
│ │ │ └── page.tsx
│ │ ├── login/
│ │ │ └── page.tsx
│ │ ├── register/
│ │ │ └── page.tsx
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── components/
│ │ ├── authentication/
│ │ │ ├── LoginForm.tsx
│ │ │ └── RegisterForm.tsx
│ │ ├── games/
│ │ │ └── GameCard.tsx
│ │ └── layout/
│ │ └── Navbar.tsx
│ ├── data/
│ │ └── games.ts
│ └── types/
│ ├── cart.ts
│ ├── game.ts
│ └── index.ts
└── README.md
```

---

# Instrucciones de Instalación

1. Clonar el repositorio o descargar el código fuente en tu entorno local.

2. Abrir la terminal y navegar a la carpeta del proyecto:

   cd ecommerce-leo

3. Instalar las dependencias del proyecto:

   npm install

4. Instalar las librerías necesarias (SweetAlert2, EmailJS, jsPDF):

   npm install sweetalert2 @emailjs/browser jspdf jspdf-autotable

5. Iniciar el servidor de desarrollo:

   npm run dev

6. Ver la aplicación:
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador web.

---

# Despliegue con Netlify

1. Verificar compilación previa:
   Genera el build de producción en local para asegurarte de que no haya errores:

   npm run build

2. Subir los cambios a GitHub:
   Asegúrate de tener la versión final subida a tu repositorio.

3. Crear nuevo sitio en Netlify:
   - Inicia sesión en Netlify.
   - Ve a "Add new site" y selecciona "Import an existing project".
   - Conecta con GitHub y selecciona el repositorio `ecommerce-leo`.

4. Configuración del despliegue:
   - Build command: `npm run build`
   - Publish directory: `.next`

5. Desplegar:
   Haz clic en el botón Deploy y tu proyecto quedará publicado en la web.

6. Link del sitio: https://ecommerce-leo.netlify.app/login

7. Video explicativo: https://drive.google.com/file/d/1XE8B8zZTcn7isSBNJC80Pv4tyWxK3UhB/view?usp=sharing
