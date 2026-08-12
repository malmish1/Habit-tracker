# Rytm

En responsiv, offline-redo habit tracker och att-göra-lista. Appen är helt statisk och sparar data lokalt i webbläsaren.

## Funktioner

- Vanor med schema, kategori, färg, ikon, mål och historik
- Status: genomförd, medvetet överhoppad och missad
- Idag-, dashboard-, vecka-, månad- och vanevy
- Engångsuppgifter
- Säker automatisk migration från `rytm-habits-v1` till `rytm-data-v2`
- PWA/service worker för installation och offline-användning
- GitHub Pages-workflow

## Kör lokalt

Service workers kräver en lokal webbserver:

```powershell
python -m http.server 8000
```

Öppna sedan `http://localhost:8000`.

## Data

`storage.js` är appens enda lager mot localStorage. Ett framtida backendlager kan ersätta `RytmStore` utan att vyerna behöver skrivas om. Data synkas inte mellan enheter ännu.

## Publicering

Projektet är förberett för GitHub Pages via `.github/workflows/pages.yml`. Lägg projektet i ett GitHub-repository, använd branchen `main`, och välj **GitHub Actions** under repositoryts **Settings → Pages → Build and deployment**.
