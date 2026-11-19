# Projektregeln: Deadlock Build Helper

## Deployment & Git Push
- Der Nutzer prüft Änderungen immer direkt auf der live gehosteten Website (GitHub Pages über `origin/main`).
- **Nicht-triviale Änderungen** (Feature-Änderungen, UI-/Text-Updates, Logik-Fixes) nach erfolgreicher Verifikation (`npm test -- --run` und `npm run build`) **immer direkt committen und auf `origin/main` pushen**, ohne vorher extra zu fragen.
- **Ausnahme:** Bei sehr kleinen/trivialen Änderungen (z. B. einzelner Tippfehler oder Mini-Tweak) oder wenn Tests/Build fehlschlagen, nicht automatisch pushen.
