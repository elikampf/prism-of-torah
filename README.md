# Prism of Torah Website

Official website for the Prism of Torah podcast by Reb Asaf Aharon Prisman.

## Project Overview

This is a professional podcast website built with vanilla HTML, CSS, and JavaScript, hosted on Netlify. The website serves as a central hub for podcast episodes, book sales, and community engagement.

### Key Features

- Podcast episode library
- Book sales platform
- Newsletter subscription
- Responsive design
- Accessibility compliance
- Performance optimized

## Tech Stack

- HTML5
- CSS3
- JavaScript (ES6+)
- Netlify Hosting
- Netlify Forms

## Development Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/prism-of-torah.git
cd prism-of-torah
```

2. Install dependencies (if using any build tools):
```bash
npm install
```

3. Start local development:
```bash
# If using a local server
python -m http.server 8000
# or
npx serve
```

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

## Development Guidelines

1. Follow the BEM methodology for CSS
2. Maintain mobile-first responsive design
3. Ensure WCAG 2.1 AA accessibility compliance
4. Optimize images and assets
5. Follow semantic HTML structure
6. Implement progressive enhancement

## Deployment

The site is automatically deployed to Netlify when changes are pushed to the main branch.

### Manual Deployment

1. Build the project (if using build tools)
2. Deploy to Netlify:
```bash
netlify deploy
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request
4. Ensure all tests pass
5. Get code review approval

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