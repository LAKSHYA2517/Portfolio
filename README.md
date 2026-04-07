# Portfolio

## Deploy To GitHub Pages

This project uses Vite + React and deploys the production build from the `dist` folder to the `gh-pages` branch.

1. Ensure your GitHub repository name is exactly `Portfolio`.
2. In GitHub: Settings -> Pages -> Build and deployment:
	- Source: `Deploy from a branch`
	- Branch: `gh-pages` and folder `/ (root)`
3. Deploy from local:

```bash
npm install
npm run deploy
```

4. Open the site at:

`https://lakshya2517.github.io/Portfolio/`

## Why blank pages happen

- Wrong URL: opening `https://lakshya2517.github.io/` instead of the repo page URL.
- SPA routing on GitHub Pages: direct route refresh can fail with browser history routing.

This project uses `HashRouter` so routes work reliably on GitHub Pages.
