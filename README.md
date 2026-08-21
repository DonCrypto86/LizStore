# Liz Store

Mobile-first Produktkatalog für Paraguay mit WhatsApp-Bestellungen und einem geschützten Adminbereich über Supabase.

## Lokal starten

```bash
npm install
npm run dev
```

Die Seite ist danach unter `http://localhost:3000` erreichbar. Ohne Supabase-Verbindung zeigt die öffentliche Seite Demo-Produkte.

## Supabase einrichten

1. Ein Supabase-Projekt erstellen.
2. `supabase/schema.sql` im Supabase SQL Editor ausführen.
3. Unter Authentication Liz manuell als Benutzerin anlegen und öffentliche Registrierungen deaktivieren.
4. `.env.example` als `.env.local` kopieren und beide öffentlichen Projektwerte eintragen.

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

Der geheime `service_role`-Schlüssel wird nicht benötigt und darf nicht im Projekt gespeichert werden.

## GitHub und Vercel

1. Alle Projektdateien in ein neues GitHub-Repository hochladen.
2. Das Repository in Vercel importieren.
3. In Vercel die beiden oben genannten Umgebungsvariablen eintragen.
4. Deploy starten.

Vercel erkennt Next.js automatisch. Zusätzliche Build-Einstellungen sind nicht notwendig.
