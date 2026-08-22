# Wiederverwendbares Shop-Grundgerüst

Dieses Projekt ist die Referenz für weitere kleine, mobile Produktkataloge. Das visuelle Design wird je Kunde neu erstellt. Datenmodell, Administration und die grundlegenden Verkaufsfunktionen bleiben möglichst einheitlich.

## Stabiler Kern

- Mobile-first Produktkatalog ohne Warenkorb und Checkout
- Kategorien und dynamische Filter passend zum Sortiment
- optionale Preissortierung
- einheitliche Produktkarten
- Produktdetail als vergrößerte Ansicht
- Teilen eines Produkts mit Bild, Name, Preis und direktem Link
- WhatsApp-Anfrage mit vorbereiteter Produktnachricht
- geschützter Adminbereich mit Supabase Auth
- Produkte hinzufügen, bearbeiten, veröffentlichen, ausblenden und löschen
- einzelner Bild-Upload und Mehrfach-Upload
- Supabase Database und Storage
- Vercel Analytics
- Vorbereitung für optionale Meta-Katalog-Synchronisierung

## Pro Kunde austauschbar

- Name, Logo, Farben und Schriften
- Texte, Sprache und Tonalität
- Telefonnummer und WhatsApp-Nachrichten
- Kategorien, Filter und Sortierreihenfolge
- Produktfelder und Währung
- Hero, Animationen, Bilder und Seitenaufbau
- Supabase-Projekt, Vercel-Projekt und Domain
- Meta Business Portfolio und Katalog

## Produkt-Grundmodell

Jedes Produkt besitzt mindestens:

- Produktname
- Referenznummer
- Kategorie
- Preis
- Bild
- Veröffentlichungsstatus

Optionale Felder:

- Marke
- Größe
- Farbe
- Kurzbeschreibung
- Neu- und Angebotskennzeichnung

## Sicherheitsregel

Neue Kundenprojekte dürfen niemals Zugangsdaten oder Daten anderer Shops übernehmen. Insbesondere müssen `.env.local`, Supabase-Schlüssel, Meta-Tokens, Vercel-Verknüpfungen, Kundendaten, Logos und Produktbilder neu angelegt oder ersetzt werden.

## Ablauf für einen neuen Shop

1. Saubere Kopie des Grundgerüsts in ein neues Repository übernehmen.
2. Kundenspezifische Gestaltung und Konfiguration einsetzen.
3. Neues Supabase-Projekt erstellen und Datenbank sowie Storage einrichten.
4. Ersten Admin-Benutzer anlegen.
5. Kategorien und Produktfelder an das Sortiment anpassen.
6. Neues Vercel-Projekt verbinden und eigene Umgebungsvariablen hinterlegen.
7. Anmeldung, Produktverwaltung, Filter, Teilen und WhatsApp auf einem echten Smartphone testen.
8. Optional den kundeneigenen Meta-Katalog anbinden.

## Abnahmekriterien

- Der öffentliche Shop zeigt ausschließlich veröffentlichte Produkte.
- Adminseiten sind ohne gültige Anmeldung nicht nutzbar.
- Bilder können einzeln und gesammelt hochgeladen werden.
- Produktkarten bleiben trotz unterschiedlicher Titellängen einheitlich.
- Filter und Sortierung funktionieren mobil ohne Überlauf.
- Produktlinks öffnen direkt das ausgewählte Produkt.
- Teilen übergibt nach Möglichkeit Bild, Name, Preis und Link.
- Keine Zugangsdaten befinden sich im Repository.

