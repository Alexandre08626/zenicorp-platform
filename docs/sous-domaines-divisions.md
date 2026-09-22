# Sous-domaines des divisions — ce qu'il manque pour fermer le graphe d'entités

**Constat (22 septembre 2026).** Les quatre sous-domaines sont en ligne et servent leur propre site Next.js :

| Sous-domaine | Titre servi | JSON-LD | Lien vers zeniva.ca | llms.txt |
|---|---|---|---|---|
| epoxy.zeniva.ca | Zeniva Époxy \| Finitions métalliques, flocons & naturel | ❌ aucun | ❌ aucun | ❌ |
| asphalte.zeniva.ca | Zeniva Asphalte \| Pavage résidentiel & commercial | ❌ aucun | ❌ aucun | ❌ |
| toiture.zeniva.ca | Zeniva Toiture \| Bardeaux & tôle métallique | ❌ aucun | ❌ aucun | ❌ |
| isolation.zeniva.ca | Zeniva Isolation \| Soufflage & polyuréthane | ❌ aucun | ❌ aucun | ❌ |

Deux conséquences pour le GEO :

1. **Aucune donnée structurée.** Pour un moteur de réponse, ces quatre sites sont des pages anonymes. Rien ne dit qu'ils appartiennent à ZeniCorp, ni qui les opère.
2. **Le positionnement diffère de zeniva.ca.** Les sous-domaines décrivent un exécutant direct (« installation professionnelle et vente de matériel époxy premium », « pavage professionnel »), alors que zeniva.ca décrit une plateforme qui assigne des entrepreneurs certifiés RBQ (30 % / 70 %). Un modèle qui lit les deux voit deux entreprises différentes sous le même nom — exactement le problème qu'on vient de régler entre zeniva.ca et zenivatravel.com. **À trancher : une division est-elle un exécutant ou une marque de la plateforme ?** Le texte des sous-domaines doit refléter la réponse.

En attendant, les entités des divisions sont **ancrées sur zeniva.ca** (`https://www.zeniva.ca/epoxy#organization`, etc.) avec le sous-domaine déclaré en `url` et `sameAs` — le balisage existe donc là où il est réellement servi, sans référence vide.

## À coller dans chaque sous-domaine

Quand les repos des sous-domaines sont accessibles, ajouter ces deux fichiers par site. **Ne pas changer les `@id`** : ce sont ceux déjà déclarés sur zeniva.ca ; c'est ce qui lie les deux sites dans la tête des modèles.

### 1. JSON-LD dans le `<head>` (exemple : époxy)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "HomeAndConstructionBusiness"],
      "@id": "https://www.zeniva.ca/epoxy#organization",
      "name": "Zeniva Epoxy",
      "url": "https://epoxy.zeniva.ca",
      "sameAs": ["https://www.zeniva.ca/epoxy"],
      "description": "Revêtements époxy et polyaspartique haut de gamme pour garages, commerces et espaces industriels.",
      "telephone": "581-748-7017",
      "email": "info@zeniva.ca",
      "areaServed": { "@type": "AdministrativeArea", "name": "Québec, Canada" },
      "parentOrganization": { "@id": "https://www.zeniva.ca/#organization" }
    },
    {
      "@type": "Organization",
      "@id": "https://www.zeniva.ca/#organization",
      "name": "ZeniCorp",
      "url": "https://www.zeniva.ca",
      "parentOrganization": { "@id": "https://www.zeniva.ca/#group" }
    },
    {
      "@type": "WebSite",
      "@id": "https://epoxy.zeniva.ca/#website",
      "url": "https://epoxy.zeniva.ca",
      "name": "Zeniva Epoxy",
      "inLanguage": "fr-CA",
      "publisher": { "@id": "https://www.zeniva.ca/epoxy#organization" }
    }
  ]
}
</script>
```

Pour les trois autres, remplacer partout `epoxy` par `asphalte`, `toiture` ou `isolation`, et le `name` / `description` par ceux de `src/lib/divisions-data.ts` (`name`, `positioning`) — c'est la source de vérité, les textes doivent correspondre mot pour mot à ceux de zeniva.ca.

### 2. `public/llms.txt` (exemple : époxy)

```markdown
# Zeniva Epoxy

> Zeniva Époxy pose des revêtements époxy et polyaspartique haut de gamme pour garages, commerces et espaces industriels, partout au Québec. C'est l'une des quatre divisions de ZeniCorp, la plateforme de construction et rénovation présentée sous la marque Zeniva à zeniva.ca.

- Division de : ZeniCorp (https://www.zeniva.ca) — groupe : Zeniva Group (https://www.zeniva.ca/groupe)
- Territoire : Québec, Canada · Téléphone : 581-748-7017 · Courriel : info@zeniva.ca
- Soumission gratuite, prix ferme, contact sous 24 h ; 30 % du contrat à la signature, 70 % à l'entrepreneur
- Fondateur : Alexandre Blais (https://www.zeniva.ca/alexandre-blais)

## Pages

- [Zeniva Époxy sur la plateforme](https://www.zeniva.ca/epoxy)
- [Guide de prix 2026 — plancher époxy de garage au Québec](https://www.zeniva.ca/guides/prix-plancher-epoxy-garage-quebec)
- [Soumettre un projet](https://www.zeniva.ca/projet?division=epoxy)
```

### 3. `robots.txt` — autoriser les crawlers IA

Reprendre le même modèle que `src/app/robots.ts` de zeniva.ca : les douze agents (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User, Claude-SearchBot, anthropic-ai, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, Bingbot) autorisés sur `/`, `Disallow: /api/`, plus la ligne `Sitemap:`.

### 4. Lien retour vers la plateforme

Chaque sous-domaine doit lier visiblement vers `https://www.zeniva.ca/<division>` (pied de page suffit). Un lien HTML réel vaut plus qu'une déclaration `sameAs` seule.

### 5. Clé IndexNow

Déposer à la racine de chaque sous-domaine le fichier `dca50a45f8f5f87a026aee0ecda16c31.txt` (contenu : la clé elle-même, une ligne) — même clé que les autres sites du groupe, voir `zenitech/docs/visibilite/indexnow-key.txt`. Les nouvelles pages peuvent alors être soumises à Bing immédiatement.
