1. **RESUMEN (1-2 frases)**
   - Landing page institucional de TraumaSurgery EIRL para la validación de confianza y venta consultiva B2B de implantes médicos en Perú, Bolivia, Colombia y Paraguay.
   - Dirigida a cirujanos traumatólogos, jefes de servicio y encargados de compras que buscan validar especificaciones técnicas y certificaciones en quirófano.

2. **ESTADO**
   - **Fase:** Desarrollo
   - **Avance:** ~90% (Hitos completados: visor 3D interactivo, modales dinámicos parametrizados, tablas detalladas de osteosíntesis, optimización de peso de 197 MB a 13 MB, accesibilidad WCAG AA).

3. **STACK**
   - **Frontend:** Astro ^6.1.7, React ^19.2.5, Tailwind CSS ^4.2.2, Three.js ^0.184.0, React Three Fiber ^9.6.0, Framer Motion ^12.38.0, GSAP ^3.15.0
   - **Backend:** Por definir (arquitectura Jamstack / estática)
   - **Base de Datos:** Por definir (almacenamiento local parametrizado en TS/JSON)
   - **Infraestructura/Servicios:** Hosting estático (dominio por definir `https://www.traumasurgery.pe` en configuración)

4. **ARQUITECTURA**
   ```mermaid
   graph LR
       User["Usuario B2B"] --> AstroPages["Páginas Astro (Index / Productos)"]
       AstroPages --> Visor3D["Visor 3D (React + ThreeJS)"]
       AstroPages --> Catalogo["Catálogos React (Features)"]
       Visor3D --> Assets["GLB (Draco) / Videos WebM"]
       Catalogo --> LocalData["Datos Técnicos (TS/JSON)"]
   ```

5. **ESTRUCTURA DEL REPO**
   - `[pages](file:///D:/SGV/Kairos%20Systems/PROYECTOS/JHONTAN/landing-doctor/src/pages/)`: Define las rutas y puntos de entrada de la aplicación (`index.astro`, `osteosintesis.astro` y `reemplazo-articular.astro`).
   - `[features](file:///D:/SGV/Kairos%20Systems/PROYECTOS/JHONTAN/landing-doctor/src/features/)`: Contiene los componentes interactivos de catálogo, modales específicos y conjuntos de datos de cada línea médica.
   - `[components](file:///D:/SGV/Kairos%20Systems/PROYECTOS/JHONTAN/landing-doctor/src/components/)`: Alberga componentes globales reutilizables e islas React principales (como el visor 3D interactivo).
   - `[public](file:///D:/SGV/Kairos%20Systems/PROYECTOS/JHONTAN/landing-doctor/public/)`: Almacena recursos estáticos como modelos 3D (`modelo3.glb`), videos optimizados y banderas vectoriales de países.
   - `[DESIGN.md](file:///D:/SGV/Kairos%20Systems/PROYECTOS/JHONTAN/landing-doctor/DESIGN.md)`: Fichero maestro de directrices y tokens de diseño para el estilo "Surgical HUD".

6. **LO ÚLTIMO QUE SE HIZO**
   - **Componentes y Datos de Osteosíntesis:** Integración de componentes para tablas de placas/tornillos ([`TablaPlacas.tsx`](file:///D:/SGV/Kairos%20Systems/PROYECTOS/JHONTAN/landing-doctor/src/features/osteosintesis/components/TablaPlacas.tsx), [`TablaCodigos.tsx`](file:///D:/SGV/Kairos%20Systems/PROYECTOS/JHONTAN/landing-doctor/src/features/osteosintesis/components/TablaCodigos.tsx)) y datos del catálogo para clavícula, húmero y tibia proximal.
   - **Refactorización de Reemplazo Articular:** Unificación de modales específicos en un único modal dinámico parametrizado ([`ModalZona.tsx`](file:///D:/SGV/Kairos%20Systems/PROYECTOS/JHONTAN/landing-doctor/src/features/reemplazo-articular/components/ModalZona.tsx)).
   - **Optimización de Assets:** Recompresión Draco de modelos 3D y conversión de imágenes y videos a WebP/AVIF/WebM logrando reducir la build de producción de 197 MB a 13 MB mediante el script [`optimize-assets.mjs`](file:///D:/SGV/Kairos%20Systems/PROYECTOS/JHONTAN/landing-doctor/scripts/optimize-assets.mjs).

7. **PRÓXIMOS PASOS**
   - **Desarrollo de Recursos y Formulario:** Diseñar la página de la sección "Recursos" y habilitar el envío de datos en el formulario de contacto ([`Contacto.tsx`](file:///D:/SGV/Kairos%20Systems/PROYECTOS/JHONTAN/landing-doctor/src/components/Contacto.tsx)).
   - **Configuración del Dominio Real:** Cambiar la URL de producción definitiva en [`astro.config.mjs`](file:///D:/SGV/Kairos%20Systems/PROYECTOS/JHONTAN/landing-doctor/astro.config.mjs) y [`robots.txt`](file:///D:/SGV/Kairos%20Systems/PROYECTOS/JHONTAN/landing-doctor/public/robots.txt) para la correcta indexación y generación del sitemap.
   - **Limpieza de Código y Estilos:** Eliminar estilos no utilizados en [`global.css`](file:///D:/SGV/Kairos%20Systems/PROYECTOS/JHONTAN/landing-doctor/src/styles/global.css) y resolver la licencia de fuentes variables en `assets-fuente/`.
