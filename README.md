# Portfolio

A static portfolio site laid out like API documentation. Every page has a JSON
twin at a real path, so the curl command shown beside each response actually
works.

## Running it

```
npm install
npm run dev      # http://localhost:4040
```

`npm run build` writes a static site to `out/`. There is no server and no
database; `npm run serve` previews the built output.

## Where the content lives

All of it is in `src/content/`, as four JSON files:

| File | Feeds |
| --- | --- |
| `profile.json` | landing page, contact |
| `experience.json` | experience page |
| `projects.json` | both case studies |
| `skills.json` | skills page |

Editing one of those changes both the page and the JSON endpoint. `scripts/gen-api.mjs`
runs before every build and copies them to `public/v1/`, so the two can never
drift apart. It also copies the CV files from `Downloads` if they are present.

## Deploying

Pushing to `main` triggers `.github/workflows/deploy.yml`, which typechecks,
builds and publishes to GitHub Pages.

The repository name decides the URL and one setting:

- Named `<account>.github.io`, the site serves from the domain root and
  `BASE_PATH` stays unset.
- Named anything else, the site lives at `/<repo>` and needs a repository
  variable `BASE_PATH` set to `/<repo>`, under Settings, Secrets and variables,
  Actions, Variables.

Enable Pages once under Settings, Pages, with Source set to GitHub Actions.

## Layout

```
src/content/     the only place facts are written
src/app/         one folder per page
src/components/  Shell (nav, theme), CodePane, Diagrams, ProjectPage
scripts/         build-time JSON generation
```

Diagrams are hand-written inline SVG in `src/components/Diagrams.tsx`, drawn
with CSS variables so they follow the light and dark themes.
