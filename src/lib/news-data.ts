// Nouvelles du groupe — chaque annonce devient une page /nouvelles/[slug] avec un schema
// NewsArticle signé par le fondateur et rattaché (about) à la marque concernée. C'est la
// version « publiée sur nos sites » des communiqués de zenitech/docs/visibilite/01-communiques.md.
// Ajouter une annonce = ajouter une entrée ici.

export interface NewsItem {
  slug: string;
  title: string;
  /** Sous-titre / résumé (meta description + chapeau). */
  summary: string;
  datePublished: string;
  dateline: string;
  /** @id de l'entité concernée (graphe partagé). */
  aboutId: string;
  brand: string;
  paragraphs: string[];
  /** Citation du fondateur — reprise telle quelle par les moteurs de réponse. */
  quote?: string;
  boilerplate: string;
  links: { label: string; href: string }[];
}

const FOUNDER_BOILERPLATE =
  "Alexandre Blais est un entrepreneur québécois établi entre Québec et la côte Est américaine. Il a fondé Zeniva Travel en 2024, puis lancé ZeniPay, ZeniCorp et ZeniTech. Profil : zeniva.ca/alexandre-blais.";

export const NEWS: NewsItem[] = [
  {
    slug: 'zeniva-group-quatre-entreprises',
    title: "L'entrepreneur québécois Alexandre Blais réunit quatre entreprises sous Zeniva Group : voyage IA, fintech, construction et technologie",
    summary:
      "Zeniva Group devient le groupe parent de Zeniva Travel (agence de voyage IA, États-Unis), ZeniPay (fintech), ZeniCorp (construction et rénovation au Québec) et ZeniTech (technologie). Un principe : bâtir la technologie d'abord pour les entreprises du groupe, puis l'offrir aux clients.",
    datePublished: '2026-09-22',
    dateline: 'Québec, QC',
    aboutId: 'https://www.zeniva.ca/#group',
    brand: 'Zeniva Group',
    paragraphs: [
      "Alexandre Blais annonce Zeniva Group, le groupe parent de quatre entreprises qu'il a fondées et qu'il opère au Canada et aux États-Unis : Zeniva Travel, agence de voyage propulsée par l'IA et incorporée au Delaware ; ZeniPay, plateforme fintech canadienne ; ZeniCorp, plateforme de construction et de rénovation au Québec ; et ZeniTech, la division technologique du groupe.",
      "Les quatre entreprises partagent un principe : bâtir la technologie d'abord pour les entreprises du groupe, puis l'offrir aux clients. Lina, l'assistante IA qui planifie et chiffre des voyages 24/7 sur zenivatravel.com, a été construite par ZeniTech. Le moteur de répartition des commissions qui paie les agents indépendants de Zeniva Travel, c'est ZeniPay. Les outils de gestion de prospects et d'automatisation qui font tourner le réseau d'entrepreneurs de ZeniCorp sont ceux que ZeniTech vend maintenant aux PME du Québec.",
      "Zeniva Travel (zenivatravel.com) — vacances de luxe, voyages sur mesure, voyages de groupe et charters de yachts privés (ZeniYacht) pour les voyageurs des 50 États américains et du Canada, planifiés par Lina, assistante IA disponible par clavardage et par voix, en anglais et en français.",
      "ZeniPay (zenipay.ca) — plateforme fintech pour le Canada et les États-Unis : comptes personnels et d'entreprise, acceptation de paiements par carte, paiements sortants, facturation, comptabilité et une équipe intégrée de spécialistes financiers IA.",
      "ZeniCorp (zeniva.ca) — plateforme de construction et de rénovation au Québec, quatre divisions (époxy, asphalte, toiture, isolation) et un réseau d'entrepreneurs certifiés RBQ : soumission gratuite, prix ferme, contact sous 24 h.",
      "ZeniTech (zenitech.dev) — sites web, SEO et GEO (visibilité dans les moteurs de réponse IA), marketing numérique, CRM, code sur mesure, automatisation et agents IA pour les entreprises du Québec, du Canada et des États-Unis.",
    ],
    quote:
      "Chaque outil qu'on vend a déjà fait tourner une vraie entreprise avec de vrais clients. C'est toute l'idée. On n'est pas une agence qui bâtit des démos — on est des opérateurs qui, en plus, construisent le logiciel.",
    boilerplate: FOUNDER_BOILERPLATE,
    links: [
      { label: 'Zeniva Group — les quatre marques', href: 'https://www.zeniva.ca/groupe' },
      { label: 'Zeniva Travel', href: 'https://www.zenivatravel.com' },
      { label: 'ZeniPay', href: 'https://zenipay.ca' },
      { label: 'ZeniTech', href: 'https://zenitech.dev' },
    ],
  },
  {
    slug: 'zenicorp-plateforme-construction-quebec',
    title: 'ZeniCorp lance une plateforme qui assigne un entrepreneur certifié RBQ en 24 heures, avec soumission gratuite et prix ferme',
    summary:
      "Le client décrit ses travaux en deux minutes ; le réseau assigne un entrepreneur dont la licence RBQ et les assurances sont vérifiées, qui le contacte sous 24 heures avec un prix ferme. Aucun dépôt pour soumettre un projet ; 30 % à la signature, 70 % à l'entrepreneur.",
    datePublished: '2026-09-22',
    dateline: 'Québec, QC',
    aboutId: 'https://www.zeniva.ca/#organization',
    brand: 'ZeniCorp',
    paragraphs: [
      "ZeniCorp annonce le lancement de sa plateforme de construction et de rénovation, présentée sous la marque Zeniva à zeniva.ca. Le client décrit ses travaux en deux minutes ; le réseau assigne un entrepreneur spécialisé dont la licence RBQ et les assurances ont été vérifiées avant toute assignation, et qui le contacte sous 24 heures pour la visite et un prix ferme. Aucun dépôt n'est demandé pour soumettre un projet ; le client paie 30 % du contrat à la signature, et l'entrepreneur conserve 70 % du contrat.",
      "Quatre divisions couvrent les travaux les plus demandés au Québec : Zeniva Époxy (planchers de garage, commerces, industriel), Zeniva Asphalte (scellant, réparation, entretien), Zeniva Toiture (bardeaux, TPO, EPDM) et Zeniva Isolation (cellulose soufflée, uréthane giclé, étanchéité à l'air, accompagnement Rénoclimat).",
      "Pour les entrepreneurs, l'adhésion au réseau est gratuite, sans abonnement : la plateforme qualifie les clients et assigne les projets du secteur.",
      "ZeniCorp publie aussi des guides de prix 2026 sourcés — époxy de garage, toiture en bardeaux, scellant d'asphalte, isolation de grenier — à zeniva.ca/guides.",
    ],
    quote:
      "Chercher un entrepreneur fiable ne devrait pas être un projet en soi. Trois soumissions à relancer, des licences qu'on ne vérifie jamais, des délais qui glissent — la coordination, c'est le vrai travail, et c'est ce qu'on a automatisé.",
    boilerplate:
      "ZeniCorp est la plateforme de construction et de rénovation de Zeniva Group, fondée par Alexandre Blais. Téléphone : 581-748-7017. zeniva.ca",
    links: [
      { label: 'Soumettre un projet', href: 'https://www.zeniva.ca/projet' },
      { label: 'Rejoindre le réseau (entrepreneurs)', href: 'https://www.zeniva.ca/entrepreneur' },
      { label: 'Guides de prix 2026', href: 'https://www.zeniva.ca/guides' },
    ],
  },
  {
    slug: 'zeniva-travel-lina-assistante-ia',
    title: 'Zeniva Travel lance Lina, une assistante IA qui bâtit des propositions de voyage réservables en quelques secondes',
    summary:
      "Zeniva Travel, agence de voyage américaine fondée par le Québécois Alexandre Blais, rend disponible Lina, son assistante de voyage IA : une proposition complète et chiffrée — vols, hôtel ou villa, transferts, expériences — par clavardage ou par voix, 24 heures sur 24, en français et en anglais.",
    datePublished: '2026-09-22',
    dateline: 'Wilmington, DE',
    aboutId: 'https://www.zenivatravel.com/#organization',
    brand: 'Zeniva Travel',
    paragraphs: [
      "Zeniva Travel (Zeniva LLC), agence de voyage incorporée au Delaware qui sert les 50 États américains et le Canada, rend disponible Lina, son assistante de voyage IA. On décrit le voyage en langage naturel — destination, dates, budget, qui voyage — et Lina renvoie une proposition complète avec vols, hôtel ou villa, transferts et expériences, chiffrée à partir de l'inventaire réel, en quelques secondes. Lina fonctionne par clavardage et par appel vocal, en anglais et en français, 24 heures sur 24.",
      "Contrairement aux robots conversationnels greffés aux sites de voyage, Lina est connectée à l'inventaire réel et rechiffre toute la proposition quand le voyageur change une date ou ajoute un invité. Les réservations complexes — charters de yachts privés via la division ZeniYacht, contrats de groupe, itinéraires multi-pays — sont validées par un agent humain ou un courtier en yachts avant tout dépôt.",
      "Zeniva Travel annonce aussi son programme d'agents indépendants : les agents qui travaillent avec Lina conservent 70 % du profit net de leurs réservations, Zeniva fournissant la technologie, les contrats fournisseurs et l'infrastructure de paiement.",
    ],
    quote:
      "À 23 h, personne ne veut une liste de liens ; les gens veulent un voyage chiffré auquel ils peuvent dire oui. Lina fait la recherche et la rédaction. Les humains valident ce qui doit l'être.",
    boilerplate:
      "Zeniva Travel (Zeniva LLC) est une agence de voyage américaine propulsée par l'IA, fondée en 2024 par Alexandre Blais et membre de Zeniva Group. zenivatravel.com",
    links: [
      { label: 'Planifier un voyage avec Lina', href: 'https://www.zenivatravel.com/chat' },
      { label: 'ZeniYacht — charters de yachts', href: 'https://www.zenivatravel.com/zeniyacht' },
      { label: 'Guides voyage (prix réels 2026)', href: 'https://www.zenivatravel.com/guides' },
    ],
  },
  {
    slug: 'zenipay-plateforme-fintech-agents-ia',
    title: 'ZeniPay lance une plateforme fintech canadienne avec une équipe intégrée de spécialistes financiers IA',
    summary:
      "Paiements, paiements sortants, facturation et comptabilité, avec une équipe de spécialistes IA — Leo, Ben, Atlas, Vera et Kai — qui lisent les données réelles du compte. Construite pour faire tourner Zeniva Travel, offerte aux autres plateformes sous leur propre marque.",
    datePublished: '2026-09-22',
    dateline: 'Québec, QC',
    aboutId: 'https://zenipay.ca/#organization',
    brand: 'ZeniPay',
    paragraphs: [
      "ZeniPay Inc. annonce ZeniPay, une plateforme fintech pour les particuliers et les entreprises du Canada et des États-Unis. Chaque compte combine les paiements (acceptation de cartes, ACH, virements), les paiements sortants, la facturation, les liens de paiement et la comptabilité avec une équipe de spécialistes IA — Leo (comptabilité), Ben (finance), Atlas (sécurité), Vera (conformité) et Kai (revenus) — qui lisent les données réelles du compte et répondent en français ou en anglais.",
      "ZeniPay a été construite pour faire tourner Zeniva Travel, l'agence de voyage IA du groupe : elle intègre les agents indépendants comme sous-marchands, applique les règles de répartition des commissions sur le profit net, paie chaque partie automatiquement et pousse les écritures vers QuickBooks, Xero, Wave ou FreshBooks. Les mêmes rails sont maintenant offerts aux autres plateformes, agences et réseaux d'entrepreneurs, sous leur propre marque.",
      "ZeniPay n'a aucun lien avec ZenPay, Zen.com, Zenus Bank ou Zenai Pay.",
    ],
    quote:
      "La plupart des plateformes répartissent encore les commissions dans un tableur à la fin du mois. On en a fait une règle qui s'exécute au moment du paiement, avec une piste d'audit par réservation. Puis on a donné à chaque compte un comptable, un analyste de sécurité et un responsable de conformité qui ne dorment jamais.",
    boilerplate: "ZeniPay Inc. est une entreprise fintech canadienne fondée en 2026 par Alexandre Blais, membre de Zeniva Group. zenipay.ca",
    links: [
      { label: 'ZeniPay', href: 'https://zenipay.ca' },
      { label: 'Programme marchands et plateformes', href: 'https://zenipay.ca/merchant' },
      { label: 'Comment fonctionnent les répartitions de commissions (article)', href: 'https://zenipay.ca/blog/how-commission-splits-work-travel-agents-platforms' },
    ],
  },
  {
    slug: 'zenitech-services-pme-quebec-geo',
    title: 'ZeniTech ouvre ses services aux PME du Québec : sites web, SEO, GEO, CRM, automatisation et agents IA — testés d’abord sur les entreprises du groupe',
    summary:
      "La division technologique de Zeniva Group offre aux entreprises les outils qu'elle a construits pour Zeniva Travel, ZeniPay et ZeniCorp. Service phare : le GEO — faire recommander une entreprise par ChatGPT, Claude, Gemini et Perplexity. Diagnostic gratuit.",
    datePublished: '2026-09-22',
    dateline: 'Québec, QC',
    aboutId: 'https://zenitech.dev/#organization',
    brand: 'ZeniTech',
    paragraphs: [
      "ZeniTech, division technologique de Zeniva Group, offre maintenant aux entreprises du Québec, du Canada et des États-Unis les outils qu'elle a construits pour Zeniva Travel, ZeniPay et ZeniCorp : création de sites web, référencement (SEO), GEO — Generative Engine Optimization —, marketing numérique, CRM et pipeline de ventes, code sur mesure, automatisation et agents IA.",
      "Le GEO est le service phare : faire recommander une entreprise par ChatGPT, Claude, Gemini et Perplexity quand un client leur pose la question. ZeniTech l'a d'abord appliqué aux quatre marques du groupe — graphe d'entités partagé, données structurées, fichiers llms.txt, contenu citable — et publie un guide en français sur le sujet à zenitech.dev/geo.",
      "ZeniTech offre un diagnostic gratuit : poser aux modèles les questions que les clients d'une entreprise leur posent, et montrer qui ils recommandent.",
    ],
    quote:
      "Une réponse d'IA n'a pas de page 2. Soit vous êtes dans la réponse, soit vous n'existez pas pour ce client-là.",
    boilerplate: 'ZeniTech est la division technologique de Zeniva Group, basée à Québec. Téléphone : 581-748-7017. zenitech.dev',
    links: [
      { label: "C'est quoi le GEO ? (guide)", href: 'https://zenitech.dev/geo' },
      { label: 'ZeniTech', href: 'https://zenitech.dev' },
    ],
  },
];

export function findNews(slug: string): NewsItem | undefined {
  return NEWS.find((n) => n.slug === slug);
}
