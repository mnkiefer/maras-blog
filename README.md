# Mara’s Pages

A modern Astro blog for research, artificial intelligence, and curious thinking.

## Development

```sh
npm install
npm run dev
```

The local site is available at `http://localhost:4321/maras-blog/`.

## Commands

| Command | Action |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run check` | Run Astro and TypeScript checks |
| `npm run build` | Validate and create the production build |
| `npm run preview` | Preview the production build |

Posts are defined in `src/data/posts.ts`. Pages are generated from Astro components in `src/pages`.

## Deployment

Pushes to `main` deploy to GitHub Pages through `.github/workflows/deploy.yml`. In repository settings, configure Pages to use **GitHub Actions** as its source.
