/**
 * Copies the content files to public/v1 so the JSON shown on each page is the
 * same JSON served at the URL printed beside it. One source, two consumers.
 */
import { mkdirSync, readFileSync, writeFileSync, copyFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const src = join(root, 'src', 'content')
const out = join(root, 'public', 'v1')
mkdirSync(out, { recursive: true })

const read = (name) => JSON.parse(readFileSync(join(src, name), 'utf8'))
const write = (name, data) => writeFileSync(join(out, name), `${JSON.stringify(data, null, 2)}\n`)

const profile = read('profile.json')
const experience = read('experience.json')
const projects = read('projects.json')
const skills = read('skills.json')

write('profile.json', profile)
write('experience.json', experience)
write('skills.json', skills)
write('projects.json', {
  projects: projects.projects.map(({ sections, ...rest }) => ({
    ...rest,
    detail: `/v1/projects/${rest.slug}.json`,
  })),
})

mkdirSync(join(out, 'projects'), { recursive: true })
for (const p of projects.projects) {
  writeFileSync(join(out, 'projects', `${p.slug}.json`), `${JSON.stringify(p, null, 2)}\n`)
}

// A tiny index so /v1/ itself is browsable, the way a real API root would be.
write('index.json', {
  name: `${profile.name} — portfolio API`,
  version: '1',
  endpoints: [
    '/v1/profile.json',
    '/v1/experience.json',
    '/v1/skills.json',
    '/v1/projects.json',
    ...projects.projects.map((p) => `/v1/projects/${p.slug}.json`),
  ],
})

// GitHub Pages serves through Jekyll unless told not to.
writeFileSync(join(root, 'public', '.nojekyll'), '')

// Ship whichever CV files exist next to the site.
const cvDir = join(root, 'public', 'cv')
mkdirSync(cvDir, { recursive: true })
const downloads = 'C:/Users/khain/Downloads'
for (const f of ['Khaing_Myal_Htike_CV_2026.pdf', 'Khaing_Myal_Htike_CV_2026_no_photo.pdf']) {
  const from = join(downloads, f)
  if (existsSync(from)) copyFileSync(from, join(cvDir, f))
}

console.log('generated public/v1')
