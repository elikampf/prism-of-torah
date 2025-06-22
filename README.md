# Prism of Torah Website

Official website for the Prism of Torah podcast by Reb Asaf Aharon Prisman.

## Project Overview

This is a professional podcast website built with vanilla HTML, CSS, and JavaScript, hosted on Netlify. The website serves as a central hub for podcast episodes, book sales, and community engagement.

### Key Features

- Podcast episode library
- Book sales platform
- Newsletter subscription (Netlify Forms)
- Responsive, mobile-first design
- Accessibility (WCAG 2.1 AA)
- SEO meta tags, Open Graph, Twitter Cards, robots.txt, sitemap.xml
- Performance optimized (WebP, lazy loading, minified CSS/JS, Gzip)

## Tech Stack & Dependencies

- HTML5, semantic markup
- CSS3 (BEM, custom properties, dark mode)
- JavaScript (ES6+, modular)
- Google Fonts: [Inter](https://fonts.google.com/specimen/Inter), [Crimson Text](https://fonts.google.com/specimen/Crimson+Text)
- Netlify Hosting & Forms

## Project Structure

```
/
├── index.html          # Homepage
├── podcast.html        # Podcast episodes
├── books.html          # Book sales
├── philosophy.html     # Philosophy page
├── css/               # Stylesheets
├── js/                # JavaScript files
├── images/            # Image assets
├── assets/            # Other assets
└── netlify.toml       # Netlify configuration
```

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/prism-of-torah.git
cd prism-of-torah
```
2. Start a local server:
```bash
python -m http.server 8000
# or
npx serve
```
3. Open `http://localhost:8000` in your browser.

## Deployment (Netlify)
- Push to `main` branch for auto-deploy.
- Manual: drag & drop folder in Netlify UI or use `netlify deploy` CLI.
- Netlify handles minification, Gzip, HTTPS, and cache headers by default.

## Component Usage
- HTML: Semantic, accessible, ARIA labels, proper heading order
- CSS: BEM naming, custom properties, responsive breakpoints, dark mode
- JS: Modular, progressive enhancement, error handling

## SEO & Accessibility
- Meta tags, Open Graph, Twitter Cards, canonical URLs
- robots.txt and sitemap.xml in root for search engines
- All images have descriptive `alt` text
- Keyboard navigation and focus management
- Color contrast meets WCAG 2.1 AA

## Manual Testing Checklist
- [ ] Test on Chrome, Firefox, Safari, Edge (desktop & mobile)
- [ ] Validate HTML/CSS with W3C tools
- [ ] Use screen reader for navigation
- [ ] Check color contrast (WebAIM)
- [ ] Test keyboard navigation
- [ ] Run Google PageSpeed Insights

## Performance Targets

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Performance Score: > 90
- Accessibility Score: 100
- Best Practices Score: 100
- SEO Score: 100

## Contact

- Email: prismoftorah@gmail.com
- Website: https://prismoftorah.org

## License

All rights reserved © Eli Podcast Productions