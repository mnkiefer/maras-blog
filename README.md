# Mara’s Notes

Research, ideas, and notes in progress.

An Astro site for writing about research, artificial intelligence, and other ideas. The first article explores GitHub Next’s Central Agentic Ops research prototype.

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

Posts are defined in `src/data/posts.ts`. The homepage lists them, and Astro generates dedicated pages under `/writing/[slug]/`. The existing illustration is served unchanged from `public/hero.png`. Optional article figures can sit beside prose on either side, appear centered, or span the article width; they include alt text, captions, source attribution, and full-size links. Animated figures use a still image for reduced-motion visitors and offer a pause control. Text-only sections need no image. The CAO workflow animation is captured locally from [GitHub Next’s MIT-licensed illustration](https://github.com/githubnext/gh-cao/blob/main/docs/components/WorkflowEcosystem.astro).

## Deployment

Pushes to `main` deploy to GitHub Pages through `.github/workflows/deploy.yml`. In repository settings, configure Pages to use **GitHub Actions** as its source.
