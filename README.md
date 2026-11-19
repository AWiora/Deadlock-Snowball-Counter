# Deadlock Counter-Build Helper

A fast, mid-game counter-item advisor for Valve's **Deadlock**. Designed for a second monitor, alt-tab, or phone so you can pick the snowballing enemy hero, tap any off-meta build overrides, and immediately see the best counter items for your current game stage and hero kit.

## Features

- **Sub-5-Second Lookup**: Sticky **Your Hero** selector (pick once per match), instant-search visual **Enemy Hero** picker, and a **Recent Match Enemies** quick-switch bar.
- **Smart Mechanical Scoring**: Models each hero's intrinsic threats (e.g., Haze Fixation & Bullet Dance, Vindicta/Grey Talon flight, Seven Storm Cloud, Bebop Sticky Bomb, Abrams melee/regen), your hero's kit affinity (Gun vs Spirit procs, fire rate, range), game stage (Lane / Mid / Late), and hero-specific hard-counter overrides.
- **1-Click Enemy Build Overrides**: Auto-presets each enemy's typical profile, with 1-click toggles for **Damage Focus** (`Bullet` / `Equal` / `Spirit`) and **4 Traits** (`Tanky / High HP`, `Heavy Healing`, `Heavy CC / Debuffs`, `Melee / Close-Range`).
- **Active Slots Full Mode**: Filters cleanly to the best passive counters when all 4 of your active slots are taken.
- **Live Patch Assets + Fallback**: Pulls official hero portraits, item icons, and current soul costs from `api.deadlock-api.com`, backed by a bundled local snapshot (`src/data/snapshot.json`).
- **Shareable Discord Links**: URL query params stay synced (`?me=...&vs=...&stage=...`) with a 1-click **Share** button.

## Local Development

```bash
npm install
npm run dev
```

### Run Unit Tests

```bash
npm test
```

### Refresh Bundled Patch Snapshot

After a major Deadlock patch (new heroes, item price changes, reworks), run:

```bash
npm run sync-data
```

## Deploy to GitHub Pages (Free, 24/7 Hosting)

Your PC does **not** need to be running for friends to use the app once deployed:

1. Create a public GitHub repository (e.g., `deadlock-build-helper`).
2. Push this project to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/deadlock-build-helper.git
   git push -u origin main
   ```
3. In your GitHub repo, open **Settings → Pages**.
4. Under **Build and deployment → Source**, select **GitHub Actions**.
5. GitHub automatically runs `.github/workflows/deploy.yml` and publishes your live link at:
   `https://<your-username>.github.io/deadlock-build-helper/`
