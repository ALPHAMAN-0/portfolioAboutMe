# Intro video — how to ship it

The site is already wired for a video intro. **Drop a file named `intro.mp4` into this
folder, commit, push — done.** Nothing else to edit.

Until `videos/intro.mp4` exists, the About section automatically shows the classic
photo layout and the hero "Watch my intro" button stays hidden. The moment the file
is deployed, the video player appears as the centerpiece of About (the duration chip
fills itself in from the file).

> **Previewing locally:** the existence check uses `fetch`, which browsers block on
> `file://` pages — double-clicking `index.html` will always show the photo layout.
> To preview the video locally run `node .claude/server.mjs` and open
> <http://127.0.0.1:8765>.

## What to record (the brief)

- **Length:** 45–60 seconds. Shorter beats longer — recruiters decide in the first 15.
- **Orientation:** landscape 16:9 (laptop webcam, or phone held sideways), 1080p.
- **Framing:** face and shoulders, eyes roughly ⅓ from the top, camera at eye level
  (stack books under the laptop). Look at the **lens**, not the screen.
- **Light:** face a window; never sit with a window behind you.
- **Audio:** quiet room, earbuds-mic or phone mic close to you. Bad audio kills a
  video faster than bad video.
- **Script skeleton** (don't read it word-for-word — glance and speak):
  1. *Hi, I'm Siam Hossain — a full-stack engineer in Dhaka working across MERN/MEAN and AI.*
  2. One concrete proof: *I built a pharmacy POS that runs on a real shop counter, and LLM/RAG tools that ship.*
  3. What you want: *I'm looking for software roles where I own features end-to-end.*
  4. Close: *My work is below — let's talk.*
- Record 3–4 takes, keep the one where you smile.

## Compress before committing

Raw recordings are hundreds of MB; the repo needs ~10–20 MB. **Keep the raw take
outside the repo** (e.g. on your Desktop) — GitHub rejects any file over 100 MB at
push time, and a raw `.mov` accidentally swept up by `git add .` forces you to
rewrite history to push at all. A `.gitignore` guards this folder, but don't tempt it.

```bash
ffmpeg -i ~/Desktop/raw-take.mov -vf "scale=1920:-2,fps=30" \
  -c:v libx264 -crf 23 -preset slow -pix_fmt yuv420p \
  -c:a aac -b:a 128k -movflags +faststart intro.mp4
```

If the result is over ~25 MB, raise `-crf 23` to `-crf 26`.

## Recommended polish

- **Poster frame** (the still shown before play — pick a second where you look good):

  ```bash
  ffmpeg -i intro.mp4 -ss 00:00:02 -frames:v 1 -q:v 2 ../images/intro-poster.jpg
  ```

  Picked up automatically if present. Without it the player falls back to the
  video's first frame — which works, but the first frame of a talking-head video
  is usually you mid-blink. Spend the ten seconds.

- **Captions** — many people watch muted. Create `intro.en.vtt` here and add inside
  the `<video>` in `index.html`:

  ```html
  <track kind="captions" src="videos/intro.en.vtt" srclang="en" label="English" default>
  ```

- **Social embeds** — once the video is live you can add to `<head>`:

  ```html
  <meta property="og:video" content="https://alphaman-0.github.io/AboutMe/videos/intro.mp4" />
  <meta property="og:video:type" content="video/mp4" />
  ```
