# Personal Portfolio - Web/Software Developer
[![Build Status](https://drone.mikebgdev.com/api/badges/mikebgdev/Portfolio-Symfony/status.svg?ref=refs/heads/main)](https://drone.mikebgdev.com/mikebgdev/Portfolio-Symfony)

## Description

This Symfony project serves as my personal portfolio showcasing my skills, projects, and experiences as a Web/Software Developer. The portfolio is designed to provide visitors with an overview of my technical expertise, work history, and the projects I've been involved in.

## Features

- **Home Page:** Brief introduction and overview of my skills.
- **Projects:** Showcase of selected projects with detailed descriptions.
- **Skills:** Comprehensive list of my technical skills (Hard Skills) and personal attributes (Soft Skills).
- **Education:** Details about your educational background, including institutions attended, degrees earned, and relevant dates.
- **Experience:** Detailed information about your work experience, including companies worked for, positions held, and employment periods.
- **Contact:** Contact form for inquiries and collaborations.

## Technologies Used

- Symfony 6.4
- PHP 8.2 or later
- Bootstrap 5.3
- JavaScript (ES6+)
- SCSS for styling
- NPM for managing JavaScript and CSS dependencies with Webpack

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mikebgdev/Portfolio-Symfony.git
   ```

2. Install PHP dependencies:

   ```bash
   composer install
   ```

3. Install JavaScript and CSS dependencies:

   ```bash
   npm install
   ```

4. Build assets:

   ```bash
   npm run build
   ```

5. Start the Symfony server:

   ```bash
   symfony server:start
   ```

6. Access the application in your browser at `http://localhost:8000`.

## Usage

- Update the content in `templates` to personalize the portfolio.
- Add your projects in the `templates/sections/portfolio.html.twig`.
- Customize the styling in `assets/styles` to match your preferences.

## Contributing

Feel free to contribute to the project by opening issues or submitting pull requests. Your feedback and suggestions are highly appreciated.

## License

This project is licensed under the [MIT License](LICENSE.md).

## Contact

For inquiries and collaborations, feel free to reach out to me through the contact form on the portfolio or via email at [mike@mikebgdev.com](mailto:mike@mikebgdev.com).

<!-- repository-quality-20261101 -->
 ## Comprobaciones y publicación

 La verificación del repositorio está en `ci/verify.sh`. Necesita las dependencias de desarrollo descritas arriba; no utiliza datos ni credenciales de producción.

 ```sh
 bash ci/verify.sh
 ```

 El workflow **Quality** comprueba secretos y después ejecuta esas comprobaciones en pushes a la rama principal y en pull requests. El escaneo usa Gitleaks 8.30.1 con descarga verificada por SHA256; examina el historial Git disponible y el directorio actual. No imprime valores de secretos. Para la revisión completa local, usar un clon con historial completo y ejecutar `bash ci/check_secrets.sh`; se puede indicar `GITLEAKS_BIN` con esa versión instalada.

 La existencia del archivo de workflow no acredita que el runner esté disponible ni que la revisión haya pasado. Antes de integrar, comprobar los resultados **Secrets** y **Verify** del mismo SHA. Este workflow no despliega servicios. Conservar el procedimiento de entrega y rollback específico del proyecto.


La instalación npm utiliza `.npmrc` con `install-links=true` para empaquetar el componente Symfony UX local desde `vendor/`, sin incorporar sus dependencias internas de desarrollo. Ejecutar `composer install` antes de `npm ci`. El frontend requiere Node 22.23.4. El control npm bloquea vulnerabilidades altas o críticas; los avisos moderados también deben revisarse.

El tooling usa Encore 7 y Babel 8. Los polyfills usan el plugin recomendado para Babel 8. La dependencia uuid de node-notifier se fija en 11.1.1: el adaptador utiliza únicamente la función pública v4(), conservada en esa versión, para nombrar sus pipes de notificación.

<!-- license-adopted-20261101 -->
## Licencia

**MIT**, con el alcance indicado en [docs/LICENSING.md](docs/LICENSING.md). El texto completo está en [LICENSE.md](LICENSE.md). La concesión cubre las aportaciones propias; los recursos y componentes de terceros conservan sus licencias y atribuciones.
