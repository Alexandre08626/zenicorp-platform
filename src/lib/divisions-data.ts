export interface DivisionData {
  slug: string;
  name: string;
  short: string;
  positioning: string;
  /** Vibrant accent, lisible sur fond graphite (aligné sur tailwind theme.colors.divisions) */
  color: string;
  /** Photo réelle présente dans /public/div */
  photo: string;
  /** Logo réel présent dans /public */
  logo: string;
  /** Site de marque de la division (sous-domaine vérifié actif) */
  site: string;
  services: string[];
  faq: { q: string; a: string }[];
}

/** Téléphone réel ZeniCorpora — utilisé partout (affichage + lien tel:) */
export const ZENICORP_PHONE = '581-748-7017';
export const ZENICORP_PHONE_HREF = 'tel:+15817487017';
export const ZENICORP_EMAIL = 'info@zenicorp.ca';

/** Modèle commercial — source unique de vérité pour éviter les contradictions entre pages.
 *  Soumission gratuite. Aucun dépôt : le client paie 30 % du contrat à la signature
 *  (part retenue par la plateforme), l'entrepreneur conserve 70 % du contrat. */
export const MODEL = {
  contractorShare: '70 %',
  platformShare: '30 %',
  signingShare: '30 %',
  contactDelay: '24 h',
} as const;

export const divisionsData: DivisionData[] = [
  {
    slug: 'epoxy',
    name: 'ZeniCorp Epoxy',
    short: 'Époxy',
    positioning:
      'Revêtements époxy et polyaspartique haut de gamme pour garages, commerces et espaces industriels.',
    color: '#0E95D9',
    photo: '/div/epoxy.jpg',
    logo: '/logo-epoxy.png',
    site: 'https://epoxy.zeniva.ca',
    services: [
      'Époxy résidentiel (garages, sous-sols)',
      'Époxy commercial (boutiques, restaurants)',
      'Époxy industriel (usines, entrepôts)',
      'Polyaspartique séchage rapide',
      'Uréthane résistance chimique',
      'Réparation et préparation de béton',
      'Marquage au sol stationnement',
    ],
    faq: [
      {
        q: 'Combien de temps avant de pouvoir rouler sur le plancher ?',
        a: "Avec un polyaspartique, la circulation à pied est possible après quelques heures et un véhicule après 24 h. Un système époxy classique demande généralement 48 à 72 h. Le délai exact est confirmé par l'entrepreneur assigné selon le produit et la température.",
      },
      {
        q: 'La préparation du béton est-elle incluse ?',
        a: "Oui. Le meulage ou grenaillage du béton et le traitement des fissures font partie des travaux : c'est cette préparation qui détermine l'adhérence et la durée de vie du revêtement.",
      },
      {
        q: 'Un plancher fissuré ou taché peut-il être recouvert ?',
        a: "Dans la majorité des cas, oui. Les fissures sont réparées et la surface est remise à niveau avant l'application. Si le béton est trop dégradé, l'entrepreneur vous le dira avant les travaux plutôt qu'après.",
      },
    ],
  },
  {
    slug: 'asphalte',
    name: 'ZeniCorp Asphalte',
    short: 'Asphalte',
    positioning:
      'Entretien, réparation et protection des surfaces asphaltées, résidentielles et commerciales.',
    color: '#8A94A6',
    photo: '/div/asphalte.jpg',
    logo: '/logo-asphalte.png',
    site: 'https://asphalte.zeniva.ca',
    services: [
      "Scellant d'asphalte protection UV",
      'Réparation fissures injection à chaud',
      'Réparation nids-de-poule permanente',
      'Entretien stationnements commerciaux',
      'Entretien entrées résidentielles',
      'Marquage lignes et symboles',
      'Resurfaçage asphalte existant',
    ],
    faq: [
      {
        q: 'À quelle fréquence faut-il sceller une entrée ?',
        a: "Au Québec, un scellant tous les 2 à 3 ans est la norme : les cycles de gel-dégel et les sels de déglaçage sont les principaux facteurs d'usure. Une entrée très exposée au soleil peut demander un intervalle plus court.",
      },
      {
        q: 'Quelle est la saison pour ces travaux ?',
        a: "Le scellant et l'injection de fissures demandent une surface sèche et des températures au-dessus d'environ 10 °C, donc généralement de mai à octobre. Une demande déposée hors saison est planifiée pour la fenêtre suivante.",
      },
      {
        q: 'Réparer les fissures ou refaire l’asphalte ?',
        a: "Tant que la fondation est saine, la réparation ciblée et le scellant prolongent la vie de la surface à une fraction du coût. Le resurfaçage devient pertinent quand l'affaissement ou le faïençage devient généralisé.",
      },
    ],
  },
  {
    slug: 'toiture',
    name: 'ZeniCorp Toiture',
    short: 'Toiture',
    positioning:
      'Couvreurs certifiés pour toiture résidentielle et commerciale : bardeaux, TPO et EPDM.',
    color: '#E0603A',
    photo: '/div/toiture.jpg',
    logo: '/logo-toiture.png',
    site: 'https://toiture.zeniva.ca',
    services: [
      'Installation bardeaux asphaltiques',
      'Toiture membrane TPO blanche',
      'Toiture membrane EPDM caoutchouc',
      'Réparation de fuites',
      'Remplacement complet toiture',
      'Inspection préventive avec rapport',
      'Ventilation toiture (soffites, maximums)',
    ],
    faq: [
      {
        q: 'Combien de temps dure une toiture de bardeaux ?',
        a: "Un bardeau architectural bien ventilé dure généralement de 25 à 30 ans au Québec. La ventilation de l'entretoit et la qualité des solins comptent souvent autant que le bardeau lui-même.",
      },
      {
        q: 'Réparer une section ou refaire la toiture ?',
        a: "Une fuite localisée sur une toiture jeune se répare. Si les bardeaux sont cassants, granulés ou en fin de vie sur plusieurs versants, le remplacement complet coûte moins cher que des réparations répétées.",
      },
      {
        q: 'Puis-je faire inspecter ma toiture avant d’acheter ?',
        a: "Oui. L'inspection préventive avec rapport écrit est un service offert : elle documente l'état des bardeaux, des solins et de la ventilation, ce qui est utile lors d'une transaction immobilière.",
      },
    ],
  },
  {
    slug: 'isolation',
    name: 'ZeniCorp Isolation',
    short: 'Isolation',
    positioning:
      "Isolation haute performance et étanchéité à l'air pour réduire durablement vos coûts de chauffage.",
    color: '#2FA086',
    photo: '/div/isolation.jpg',
    logo: '/logo-isolation.png',
    site: 'https://isolation.zeniva.ca',
    services: [
      'Isolation grenier cellulose soufflée',
      'Isolation murs polyuréthane giclé',
      'Isolation sous-sol panneaux rigides',
      'Isolation vide sanitaire',
      "Étanchéité à l'air et infiltrométrie",
      'Évaluation énergétique Rénoclimat',
      'Accompagnement subventions et programmes',
    ],
    faq: [
      {
        q: 'Par où commencer pour réduire ma facture de chauffage ?',
        a: "Le grenier et l'étanchéité à l'air offrent presque toujours le meilleur rendement par dollar investi, avant les murs. Une évaluation permet de cibler les pertes réelles plutôt que de deviner.",
      },
      {
        q: 'Cellulose soufflée ou polyuréthane giclé ?',
        a: "La cellulose soufflée est économique et très efficace dans un grenier accessible. Le polyuréthane giclé est privilégié quand on a besoin d'une valeur isolante élevée dans une cavité mince ou d'un pare-air intégré, comme au sous-sol ou dans un vide sanitaire.",
      },
      {
        q: 'Y a-t-il des subventions disponibles ?',
        a: "Des programmes d'efficacité énergétique existent au Québec et évoluent régulièrement. L'entrepreneur assigné vous indique les programmes applicables à vos travaux et la documentation requise — les montants dépendent du programme en vigueur au moment des travaux.",
      },
    ],
  },
];

export function getDivisionBySlug(slug: string): DivisionData | undefined {
  return divisionsData.find((d) => d.slug === slug);
}

export function getAllDivisions(): DivisionData[] {
  return divisionsData;
}

export const divisionSlugs = divisionsData.map((d) => d.slug);
