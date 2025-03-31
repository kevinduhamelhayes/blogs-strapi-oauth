# Blog Builder Project

## Actualización del proyecto

Este proyecto ha sido configurado con:
- Next.js 14 con App Router y TypeScript
- Tailwind CSS y Shadcn UI para el diseño
- Supabase para la autenticación de usuarios
- Strapi como headless CMS para la gestión de contenido
- Google Analytics 4 para el seguimiento de eventos

El proyecto está en desarrollo y actualmente incluye:
- Sistema de autenticación completo
- Estructura de carpetas lista para la integración con Strapi
- Temas claro/oscuro
- Componentes básicos (Header, Footer, Login)
- Middleware para protección de rutas

## Propósito Principal

- **Contenido Gestionado por CMS**: Los posts del blog y las páginas estáticas ahora se gestionan a través de Strapi CMS, permitiendo una administración más sencilla del contenido.
- **Autenticación Robusta**: Implementa autenticación segura mediante Supabase Auth, con soporte para inicio de sesión con email/contraseña.
- **Diseño Personalizado**: Utiliza Tailwind CSS y Shadcn/ui para un diseño visual limpio y adaptado, con un tema "bronce" predominante y modo oscuro.
- **Análisis de Uso**: Mantiene la integración con Google Analytics 4 (GA4) para rastrear interacciones clave.

## Tecnologías Utilizadas

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Componentes UI**: Shadcn UI
- **CMS**: Strapi (Headless CMS)
- **Autenticación**: Supabase Auth
- **Markdown Rendering**: react-markdown con plugins
- **Modo Oscuro**: next-themes
- **Análisis**: Google Analytics 4
- **Despliegue**: Vercel (frontend) + Supabase (backend)

## Estructura del Proyecto

```
/
├── public/             # Archivos estáticos (imágenes, fuentes)
│   └── images/
│       ├── blog/       # Imágenes específicas de los posts (organizadas por slug)
│       ├── nuestro-amor/
│       ├── sobre-mi/
│       ├── sobre-ti/
│       └── ...         # Otras imágenes globales
├── src/
│   ├── app/            # Rutas del App Router (páginas y APIs)
│   │   ├── (auth)/     # Grupo de rutas para autenticación (login)
│   │   ├── (main)/     # Grupo de rutas principales (protegidas)
│   │   │   ├── admin/      # Rutas de administración
│   │   │   ├── blog/       # Rutas del blog ([slug], page)
│   │   │   ├── nuestro-amor/
│   │   │   ├── sobre-mi/
│   │   │   ├── sobre-ti/
│   │   │   ├── tag/        # Rutas para tags ([tag], page)
│   │   │   ├── layout.tsx  # Layout principal (protegido)
│   │   │   └── page.tsx    # Página de inicio
│   │   ├── api/          # Rutas de API
│   │   ├── layout.tsx    # Layout raíz
│   │   ├── globals.css   # Estilos globales
│   │   ├── not-found.tsx # Página 404
│   │   └── providers.tsx # Proveedores de contexto
│   ├── components/     # Componentes React reutilizables
│   │   ├── ui/         # Componentes Shadcn/ui
│   │   ├── auth/       # Componentes relacionados con autenticación
│   │   ├── blog/       # Componentes específicos del blog
│   │   ├── BlogCarousel.tsx
│   │   ├── BlogPostContent.tsx
│   │   ├── BlogPostPreview.tsx
│   │   ├── DarkModeToggle.tsx
│   │   ├── Footer.tsx
│   │   ├── GoogleAnalytics.tsx
│   │   ├── Header.tsx
│   │   └── UserTracker.tsx
│   ├── lib/              # Lógica core, utilidades, datos
│   │   ├── strapi/       # Funciones para interactuar con la API de Strapi
│   │   ├── supabase/     # Configuración y utilidades de Supabase
│   │   ├── utils/        # Funciones de utilidad generales
│   │   ├── ga-utils.ts   # Utilidad para enviar eventos GA4
│   │   └── ...
│   ├── types/            # Definiciones de tipos globales (TypeScript)
│   └── middleware.ts     # Middleware de Next.js (para proteger rutas)
```

## Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Strapi
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_TOKEN=your-strapi-api-token

# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Instalación y Ejecución Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/blog-builder.git
   cd blog-builder
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Crear y configurar `.env.local`**

4. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```

5. **Abrir [http://localhost:3000](http://localhost:3000) en tu navegador.**

## Configuración del CMS (Strapi)

Para el CMS utilizamos Strapi, que debe ser configurado por separado. Instrucciones detalladas de instalación y configuración en [la documentación oficial de Strapi](https://docs.strapi.io/developer-docs/latest/getting-started/introduction.html).

## Configuración de Supabase

Para la autenticación utilizamos Supabase. Instrucciones para configurar un proyecto y la autenticación en [la documentación oficial de Supabase](https://supabase.com/docs/guides/auth).

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
