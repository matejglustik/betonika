# BETONIKA – web stavebnej firmy
Statický web (HTML/CSS/JS) + Decap CMS. Obsah je v `content/site.json`, edituje sa na `/admin`.

## Nasadenie
1. Nahraj priečinok do GitHub repozitára (vetva `main`).
2. V `admin/config.yml` zmeň `repo:` na `tvoj-ucet/tvoj-repo`.
3. Netlify: New site → Import from Git → vyber repozitár (bez build príkazu, publish dir `.`).
4. GitHub OAuth app (Settings → Developer settings → OAuth Apps): Homepage = URL webu, Callback = `https://api.netlify.com/auth/done`.
5. Netlify → Site configuration → Access & security → OAuth → Install provider → GitHub, vlož Client ID a Secret.
6. Otvor `https://tvoj-web.netlify.app/admin`, prihlás sa cez GitHub a edituj. Každé uloženie = commit = automatický redeploy.
