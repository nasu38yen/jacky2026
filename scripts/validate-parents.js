#!/usr/bin/env node
import fs from 'fs/promises'
import path from 'path'

const contentDir = path.join(process.cwd(), 'content', 'charibra')

function parseFrontmatter(text) {
  const start = text.indexOf('---')
  if (start !== 0) return {}
  const end = text.indexOf('---', start + 3)
  if (end === -1) return {}
  const block = text.slice(start + 3, end).trim()
  const obj = {}
  for (const line of block.split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (m) {
      const k = m[1]
      let v = m[2]
      if (v === '') v = null
      obj[k] = v
    }
  }
  return obj
}

async function main() {
  const files = await fs.readdir(contentDir)
  const entries = []
  for (const f of files) {
    if (!f.endsWith('.md')) continue
    const fp = path.join(contentDir, f)
    const txt = await fs.readFile(fp, 'utf8')
    const fm = parseFrontmatter(txt)
    const slug = fm.slug || path.basename(f, '.md')
    entries.push({ file: f, path: fp, fm, slug })
  }

  const bySlug = new Map(entries.map(e => [e.slug, e]))

  let hasError = false

  // check parent existence (schema only supports `parent`)
  for (const e of entries) {
    const { fm } = e
    if (!fm.parent) continue
    // parent may be a slug or a path like /charibra/miyaonsen
    const raw = fm.parent
    const targetSlug = String(raw).split('/').filter(Boolean).pop()
    if (targetSlug && !bySlug.has(targetSlug)) {
      console.error(`[ERROR] ${e.file} -> parent '${raw}' resolved to slug '${targetSlug}' which does not exist.`)
      hasError = true
    }
  }

  // cycle detection
  function detectCycles() {
    const visited = new Set()
    const stack = new Set()

    function dfs(slug) {
      if (stack.has(slug)) return [true, [...stack, slug]]
      if (visited.has(slug)) return [false]
      visited.add(slug)
      stack.add(slug)
      const e = bySlug.get(slug)
      if (!e) { stack.delete(slug); return [false] }
      const fm = e.fm
      const childParent = fm.parent || null
      let next = null
      if (childParent) next = String(childParent).split('/').filter(Boolean).pop()
      if (next) {
        const res = dfs(next)
        if (res[0]) return res
      }
      stack.delete(slug)
      return [false]
    }

    for (const slug of bySlug.keys()) {
      const res = dfs(slug)
      if (res[0]) return res
    }
    return [false]
  }

  const cycle = detectCycles()
  if (cycle[0]) {
    console.error('[ERROR] Parent cycle detected:', cycle[1].join(' -> '))
    hasError = true
  }

  if (hasError) {
    console.error('\nContent parent validation failed.')
    process.exit(1)
  }
  console.log('Content parent validation: OK ✅')
}

main().catch(err => { console.error(err); process.exit(2) })
