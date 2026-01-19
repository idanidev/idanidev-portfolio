# 💼 Portfolio Ultra-Moderno - Daniel Benito Díaz

Portfolio profesional de Full Stack Developer con animaciones AnimeJS avanzadas, efectos interactivos 3D y diseño super responsive.

## ✨ Características Premium

### 🎬 Animaciones AnimeJS Avanzadas
- **Hero Section**:
  - Wave animation en el título con efecto de onda
  - Typewriter effect en la descripción
  - Botones con animación de flotación y rotación continua
  - Gradiente de fondo animado
  - Counter animado para estadísticas

- **Skills Cards**:
  - Entrada con bounce elástico
  - Iconos con rotación 360° y scale
  - Tags con flip 3D secuencial
  - Pulse de brillo continuo
  - Parallax interno al mover el mouse

- **Projects**:
  - Cards con perspectiva 3D
  - Mockup con flip y scale
  - Líneas de código con efecto typing
  - Hover con animación de líneas
  - Tech tags con rotación

- **Timeline**:
  - Dots con ripple effect
  - Contenido con slide y rotación
  - Pulse continuo en dots
  - Cascade animation en items de lista

- **Efectos Globales**:
  - Floating shapes animadas (emojis flotantes)
  - Mouse trail con partículas
  - Scroll progress bar
  - Background shapes morphing
  - Parallax scroll en múltiples capas

### 🎯 Efectos Interactivos

1. **Hover Effects 3D**:
   - Skill cards con parallax interno
   - Project cards con tilt 3D
   - Contact card con rotación 3D
   - Navigation links con underline animado

2. **Click Effects**:
   - Ripple effect en todos los botones
   - Expanding circle en skill cards
   - Stats con animación de bounce al hacer click

3. **Morphing Effects**:
   - Botones con cambio de border-radius
   - Shimmer continuo en hover
   - Color transitions suaves

4. **Scroll Animations**:
   - Text reveal por palabras
   - Parallax en hero content
   - Intersection Observer para todas las secciones

### 📱 Super Responsive

#### Breakpoints Optimizados:
- **Large Desktop**: 1920px+ (fuentes más grandes)
- **Desktop**: 1440px - 1919px (layout completo)
- **Laptop**: 1024px - 1439px (optimizado)
- **Tablet Landscape**: 900px - 1023px (2 columnas)
- **Tablet Portrait**: 768px - 899px (columna única)
- **Mobile Large**: 640px - 767px (optimizado touch)
- **Mobile Medium**: 480px - 639px (compacto)
- **Mobile Small**: 320px - 479px (minimal)

#### Características Responsive:
- **Menu Hamburguesa** animado para móvil
- **Touch Gestures**: Swipe detection en project cards
- **Tap Feedback**: Animaciones específicas para touch
- **Landscape Mode**: Optimizado para orientación horizontal
- **Reduced Motion**: Soporte para prefers-reduced-motion
- **High DPI**: Optimizado para pantallas Retina
- **Print Styles**: Versión imprimible

## 🚀 Instalación

### Usar Python3 (Recomendado)
```bash
cd /Users/dani/Proyectos/iDanidevPortafolio
python3 -m http.server 8000
```
Visita: http://localhost:8000

### Alternativas
```bash
# Con PHP
php -S localhost:8000

# Con Node.js
npx http-server

# Abrir directamente
open index.html
```

## 🎯 Secciones

1. **Hero** - Presentación con animaciones espectaculares
2. **Skills** - Cards interactivas con efectos 3D
3. **Projects** - Proyectos con mockups animados
4. **Experience** - Timeline con animaciones en scroll
5. **Contact** - Información con efectos ripple

## 🛠️ Stack Tecnológico

- **HTML5** - Estructura semántica
- **CSS3** - Variables, Grid, Flexbox, Animations
- **JavaScript ES6+** - Clases, Modules
- **AnimeJS 3.2.2** - Animaciones premium

## 💡 Características Destacadas

### Performance ⚡
- CSS modular cargado por prioridad
- JavaScript con clases organizadas
- Lazy animations con IntersectionObserver
- RequestAnimationFrame para smooth animations

### Accesibilidad ♿
- ARIA labels completos
- Keyboard navigation
- Focus states visibles
- Reduced motion support

### Mobile 📱
- Touch gestures
- Swipe detection
- Tap feedback
- Menu hamburguesa animado

## 🎨 Personalización

### Cambiar Colores
```css
/* css/variables.css */
:root {
    --accent-cyan: #TU_COLOR;
    --accent-purple: #TU_COLOR;
}
```

### Modificar Animaciones
```javascript
/* js/advanced-animations.js */
anime({
    duration: 1200,  // ms
    easing: 'easeOutExpo'
});
```

## 🔧 Debug Mode

```
http://localhost:8000?debug
```
Ver contador de FPS en pantalla.

## 📦 Estructura

```
iDanidevPortafolio/
├── index.html
├── css/
│   ├── variables.css
│   ├── base.css
│   ├── components.css
│   ├── sections.css
│   ├── animations.css
│   └── responsive.css
├── js/
│   ├── animations.js
│   ├── advanced-animations.js
│   ├── interactive-effects.js
│   ├── mobile-menu.js
│   └── app.js
└── assets/
    └── images/
```

## 👤 Autor

**Daniel Benito Díaz**
- GitHub: [@idanidev](https://github.com/idanidev)
- LinkedIn: [/in/iDanielBenito](https://linkedin.com/in/iDanielBenito)
- Email: idanibenito2@gmail.com

## 🙏 Créditos

- [AnimeJS](https://animejs.com/) - Librería de animaciones
- [Google Fonts](https://fonts.google.com/) - Tipografías

---

⭐ **Dale una estrella si te gusta!**

💻 **Desarrollado con 💜 y mucho AnimeJS**
