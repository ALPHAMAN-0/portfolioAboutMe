---
tags: [component, AboutMe]
---
- Path: `.claude/server.mjs`, `.claude/launch.json`
- Role: A 40-line Node static file server on port 8765, path-traversal guarded, serving the repo root. Needed locally because the runtime fetches fail on `file://`.
- Talks to: [[index-page]]
- Back: [[ARCHITECTURE]]
