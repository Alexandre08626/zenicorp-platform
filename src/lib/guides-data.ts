// Guides de prix — la couche « contenu citable » du GEO. Chaque guide répond à UNE question
// que les gens posent réellement à ChatGPT / Claude / Perplexity (« combien coûte… au Québec »),
// avec des fourchettes de marché sourcées, une FAQ et un rattachement à la division.
// Ajouter un guide = ajouter une entrée ici.

import { MODEL } from '@/lib/divisions-data';

export interface GuideSection {
  h: string;
  paragraphs: string[];
  /** Tableau de données — les moteurs IA les extraient tels quels. */
  table?: { caption: string; columns: string[]; rows: string[][] };
}

export interface GuideData {
  slug: string;
  /** slug de la division rattachée (epoxy, asphalte, toiture, isolation) */
  division: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
  readingMinutes: number;
  tags: string[];
  /** Réponse courte — la phrase qu'un moteur IA doit pouvoir citer. */
  shortAnswer: string;
  keyTakeaways: string[];
  sections: GuideSection[];
  faq: { q: string; a: string }[];
  sources: { name: string; url: string }[];
}

const ZENIVA_MODEL_PARAGRAPH = `Avec Zeniva, la soumission est gratuite et sans dépôt : vous décrivez les travaux, le réseau assigne un entrepreneur certifié RBQ (licence et assurances vérifiées) qui vous contacte sous ${MODEL.contactDelay} pour la visite et un prix ferme. Vous payez ${MODEL.signingShare} du contrat à la signature ; l'entrepreneur conserve ${MODEL.contractorShare} du contrat.`;

export const GUIDES: GuideData[] = [
  {
    slug: 'prix-plancher-epoxy-garage-quebec',
    division: 'epoxy',
    title: "Prix d'un plancher époxy de garage au Québec en 2026",
    description:
      "Fourchettes de prix 2026 au pied carré pour un plancher de garage en époxy ou polyaspartique au Québec, coût total d'un garage de 400 à 600 pi², facteurs qui font varier la facture et questions à poser avant de signer.",
    datePublished: '2026-09-21',
    dateModified: '2026-09-21',
    readingMinutes: 6,
    tags: ['prix plancher époxy', 'époxy garage Québec', 'polyaspartique prix', 'plancher garage prix pied carré'],
    shortAnswer:
      "En 2026, un plancher de garage en époxy installé par un professionnel coûte généralement de 4 $ à 15 $ le pied carré au Québec : environ 3 $ à 8 $ pour un époxy clair, 5 $ à 10 $ pour un époxy 100 % solides avec flocons, 8 $ à 12 $ pour un fini métallique, et davantage pour un polyaspartique à séchage rapide. Pour un garage standard de 500 pi², comptez entre 2 000 $ et 7 500 $ selon le système choisi et l'état du béton.",
    keyTakeaways: [
      "Le prix se joue surtout sur la préparation du béton (meulage diamant, réparation de fissures) — pas sur la peinture.",
      "Un époxy « en kit » de quincaillerie à 1–2 $/pi² n'est pas comparable à un système 100 % solides posé sur béton meulé : durée de vie de 1–3 ans contre 10–20 ans.",
      "Le polyaspartique coûte plus cher mais se pose et sèche en une journée, résiste aux UV et au sel de déglaçage.",
      "Un garage double de 400–600 pi² représente la majorité des projets résidentiels au Québec.",
      "Une soumission sérieuse précise le nombre de couches, l'épaisseur (mils), la méthode de préparation et la garantie.",
    ],
    sections: [
      {
        h: 'Fourchettes de prix 2026 au pied carré',
        paragraphs: [
          "Les prix ci-dessous sont des fourchettes de marché compilées à partir de guides de prix québécois publiés pour 2026 (sources en fin de page). Ils incluent la main-d'œuvre et les matériaux pour une pose professionnelle sur un béton en état normal.",
        ],
        table: {
          caption: 'Prix installé d’un plancher époxy au Québec, 2026',
          columns: ['Système', 'Prix installé ($/pi²)', 'Garage 500 pi²', 'Durée de vie typique'],
          rows: [
            ['Époxy clair (1 couche, béton sain)', '3 $ – 8 $', '1 500 $ – 4 000 $', '5 – 10 ans'],
            ['Époxy 100 % solides + flocons + scellant', '5 $ – 10 $', '2 500 $ – 5 000 $', '10 – 20 ans'],
            ['Époxy métallique / décoratif', '8 $ – 12 $', '4 000 $ – 6 000 $', '10 – 20 ans'],
            ['Polyaspartique (séchage rapide, UV, sel)', '8 $ – 15 $', '4 000 $ – 7 500 $', '15 – 20 ans'],
            ['Kit de quincaillerie posé soi-même', '1 $ – 2 $ (matériaux)', '500 $ – 1 000 $', '1 – 3 ans'],
          ],
        },
      },
      {
        h: 'Ce qui fait varier la facture',
        paragraphs: [
          "L'état du béton d'abord. Un plancher fissuré, écaillé ou déjà peint exige un meulage au diamant, des réparations et parfois un apprêt bloqueur d'humidité — c'est là que 500 $ à 1 500 $ s'ajoutent sur un garage standard.",
          "L'humidité ensuite. Une dalle sur sol sans pare-vapeur peut faire décoller n'importe quel revêtement ; un test d'humidité et un apprêt adapté évitent de refaire le travail dans deux ans.",
          "Le système enfin : nombre de couches, épaisseur en mils, flocons pleins ou partiels, fini mat ou lustré, remontée sur les murs (plinthe), et polyaspartique ou époxy pour la couche de finition. Deux soumissions « à 6 $ » peuvent décrire des planchers très différents.",
        ],
      },
      {
        h: 'Époxy ou polyaspartique ?',
        paragraphs: [
          "L'époxy 100 % solides reste le meilleur rapport épaisseur-prix pour une base solide. Le polyaspartique brille comme couche de finition : il sèche en quelques heures (le garage est utilisable le lendemain), ne jaunit pas aux UV et résiste mieux au sel de déglaçage et aux pneus chauds — deux réalités de l'hiver québécois.",
          "Le compromis le plus courant au Québec en 2026 : base époxy 100 % solides, flocons, finition polyaspartique. C'est généralement dans la zone 7 $ à 12 $ le pied carré posé.",
        ],
      },
      {
        h: 'Comment fonctionne une soumission avec Zeniva Époxy',
        paragraphs: [ZENIVA_MODEL_PARAGRAPH, "Chaque soumission Zeniva Époxy précise la préparation du béton, le système (couches, épaisseur, finition), le délai et la garantie, pour que vous compariez des choses comparables."],
      },
    ],
    faq: [
      {
        q: "Combien coûte un plancher époxy pour un garage double au Québec ?",
        a: "Pour un garage double de 400 à 600 pi², un plancher époxy professionnel coûte généralement entre 2 000 $ et 7 500 $ en 2026, soit 4 $ à 15 $ le pied carré selon le système (époxy clair, 100 % solides avec flocons, métallique ou polyaspartique) et l'état du béton.",
      },
      {
        q: "Pourquoi les prix d'époxy varient-ils autant ?",
        a: "Parce que la préparation du béton (meulage, réparation, apprêt anti-humidité), le nombre de couches, l'épaisseur et le type de finition changent d'une soumission à l'autre. Demandez toujours ces détails par écrit.",
      },
      {
        q: 'Le polyaspartique vaut-il le supplément ?',
        a: "Pour un garage au Québec, souvent oui : séchage en une journée, aucun jaunissement aux UV et meilleure résistance au sel de déglaçage et aux pneus chauds. Il coûte environ 2 $ à 4 $ de plus le pied carré qu'un époxy standard.",
      },
      {
        q: "Combien de temps dure un plancher époxy ?",
        a: "Un système professionnel 100 % solides sur béton bien préparé dure 10 à 20 ans. Un kit de quincaillerie appliqué sur béton non meulé dure souvent 1 à 3 ans.",
      },
      {
        q: 'La soumission Zeniva est-elle gratuite ?',
        a: `Oui. La soumission est gratuite et sans dépôt. L'entrepreneur certifié RBQ assigné vous contacte sous ${MODEL.contactDelay} ; vous payez ${MODEL.signingShare} à la signature du contrat seulement.`,
      },
    ],
    sources: [
      { name: 'CombienCaCoute.ca — Prix d’un plancher époxy au Québec en 2026', url: 'https://combiencacoute.ca/prix-plancher-epoxy/' },
      { name: 'SoumissionsEpoxy.ca — Combien coûte un plancher en époxy en 2026', url: 'https://soumissionsepoxy.ca/combien-coute-plancher-epoxy/' },
      { name: 'Soumissions Garage Cabanon — Plancher de garage en époxy, guide de prix 2026', url: 'https://soumissionsgaragecabanon.ca/plancher-garage-epoxy-prix/' },
      { name: 'Prostationnement — Plancher garage époxy ou polyaspartique', url: 'https://www.prostationnement.com/plancher-garage-epoxy-ou-polyaspartique/' },
    ],
  },
  {
    slug: 'prix-toiture-bardeaux-quebec',
    division: 'toiture',
    title: "Prix d'une toiture en bardeaux d'asphalte au Québec en 2026",
    description:
      "Combien coûte le remplacement d'une toiture en bardeaux d'asphalte au Québec en 2026 : prix installé au pied carré, coût total pour 1 500 à 3 000 pi², facteurs (pente, versants, arrachage) et ce qu'une soumission de couvreur doit contenir.",
    datePublished: '2026-09-21',
    dateModified: '2026-09-21',
    readingMinutes: 6,
    tags: ['prix toiture bardeaux', 'remplacement toiture Québec', 'coût toiture pied carré', 'couvreur RBQ'],
    shortAnswer:
      "En 2026, remplacer une toiture en bardeaux d'asphalte au Québec coûte généralement de 6 $ à 12 $ le pied carré installé, arrachage inclus. Une toiture de 2 000 pi² revient donc entre 12 000 $ et 24 000 $, et une de 3 000 pi² entre 18 000 $ et 36 000 $. Les bardeaux durent typiquement 15 à 25 ans.",
    keyTakeaways: [
      "Le prix au pied carré comprend normalement l'arrachage, la membrane de protection, les bardeaux, les solins et l'évacuation des débris.",
      "Pente forte, nombreux versants et lucarnes augmentent le coût : plus de découpes, plus de solins, plus de sécurité.",
      "Un bardeau architectural (laminé) coûte plus cher qu'un 3-pattes mais dure plus longtemps et résiste mieux au vent.",
      "La ventilation (soffites, maximums) fait partie d'une bonne soumission — une toiture mal ventilée vieillit deux fois plus vite.",
      "Au Québec, l'entrepreneur doit détenir une licence RBQ ; vérifiez-la avant de signer.",
    ],
    sections: [
      {
        h: 'Fourchettes de prix 2026',
        paragraphs: [
          "Les fourchettes ci-dessous proviennent de guides de prix québécois publiés pour 2026 (sources en fin de page). Elles s'appliquent à un remplacement complet, pose professionnelle, sur une maison résidentielle typique.",
        ],
        table: {
          caption: 'Coût de remplacement d’une toiture en bardeaux au Québec, 2026',
          columns: ['Superficie de toit', 'Prix installé (6 $ – 12 $/pi²)', 'Notes'],
          rows: [
            ['1 500 pi² (bungalow)', '9 000 $ – 18 000 $', 'Pente simple, peu de versants'],
            ['2 000 pi² (maison moyenne)', '12 000 $ – 24 000 $', 'Le cas le plus fréquent au Québec'],
            ['3 000 pi² (grande maison, cottage)', '18 000 $ – 36 000 $', 'Souvent plusieurs versants et lucarnes'],
            ['Réparation de fuite ou de solin', '300 $ – 1 500 $', 'Selon l’accès et l’étendue'],
          ],
        },
      },
      {
        h: 'Ce qui fait monter — ou baisser — le prix',
        paragraphs: [
          "La pente : au-delà de 6/12, les couvreurs installent des ancrages et travaillent plus lentement. Les versants et lucarnes : chaque intersection demande des solins et génère des pertes de matériaux. L'arrachage : une deuxième couche de vieux bardeaux à retirer coûte plus cher à enlever et à jeter.",
          "Le bardeau choisi : un bardeau architectural laminé garanti 30 à 50 ans coûte davantage qu'un bardeau 3-pattes garanti 20 à 25 ans, mais il résiste mieux aux vents et vieillit mieux. Le contreplaqué à remplacer, découvert seulement à l'arrachage, est le principal imprévu : demandez le prix à la feuille dans la soumission.",
        ],
      },
      {
        h: 'Bardeaux, TPO ou EPDM ?',
        paragraphs: [
          "Le bardeau d'asphalte convient aux toits en pente. Pour un toit plat ou à faible pente (garage attenant, rallonge, commerce), on utilise plutôt une membrane TPO blanche (réfléchissante, soudée à chaud) ou EPDM en caoutchouc. Ces membranes se chiffrent différemment et durent 20 à 30 ans.",
        ],
      },
      {
        h: 'Comment fonctionne une soumission avec Zeniva Toiture',
        paragraphs: [ZENIVA_MODEL_PARAGRAPH, "Chaque soumission Zeniva Toiture précise le bardeau (marque, série, garantie), la membrane, les solins, la ventilation, le prix du contreplaqué à la feuille et la gestion des débris."],
      },
    ],
    faq: [
      {
        q: 'Combien coûte une toiture de 2 000 pi² au Québec ?',
        a: "En 2026, entre 12 000 $ et 24 000 $ pour un remplacement complet en bardeaux d'asphalte, soit 6 $ à 12 $ le pied carré installé, arrachage inclus.",
      },
      {
        q: 'Combien de temps dure une toiture en bardeaux ?',
        a: "Généralement 15 à 25 ans au Québec ; un bardeau architectural bien ventilé peut atteindre 25 à 30 ans.",
      },
      {
        q: "Faut-il arracher l'ancienne toiture ?",
        a: "Oui dans la grande majorité des cas. Poser par-dessus une couche existante annule souvent la garantie du fabricant et cache les problèmes de contreplaqué.",
      },
      {
        q: 'Quel est le meilleur moment pour refaire une toiture ?',
        a: "De mai à octobre. Les bardeaux se scellent avec la chaleur ; une pose par grand froid exige des précautions et coûte parfois plus cher.",
      },
      {
        q: 'La soumission Zeniva est-elle gratuite ?',
        a: `Oui. La soumission est gratuite et sans dépôt. Un couvreur certifié RBQ vous contacte sous ${MODEL.contactDelay} ; vous payez ${MODEL.signingShare} à la signature du contrat seulement.`,
      },
    ],
    sources: [
      { name: 'Soumission Rénovation — Prix toiture Québec 2026', url: 'https://soumissionrenovation.ca/fr/blogue/prix-toiture-quebec-2026-combien-coute-refaire-sa-toiture' },
      { name: 'CombienCaCoute.ca — Combien coûte une toiture de bardeau au Québec en 2026', url: 'https://combiencacoute.ca/coute-toiture-de-bardeau/' },
      { name: 'Réno-Assistance — Prix du remplacement d’une toiture en 2026', url: 'https://www.renoassistance.ca/fr/residentiel/ressources-inspirations/article/prix-toiture' },
      { name: 'Québec Rénovation — Prix pour remplacer une toiture de bardeau en 2026', url: 'https://quebecrenovation.com/prix-toiture-bardeau/' },
    ],
  },
  {
    slug: 'prix-scellant-asphalte-entree-quebec',
    division: 'asphalte',
    title: "Prix du scellant d'asphalte et des réparations d'entrée au Québec en 2026",
    description:
      "Combien coûte sceller, réparer ou resurfacer une entrée en asphalte au Québec en 2026 : prix au pied carré du scellant appliqué par un professionnel, réparation de fissures et de nids-de-poule, et quand il vaut mieux repaver.",
    datePublished: '2026-09-21',
    dateModified: '2026-09-21',
    readingMinutes: 5,
    tags: ['prix scellant asphalte', 'réparation asphalte Québec', 'entretien entrée asphalte', 'pavage prix pied carré'],
    shortAnswer:
      "En 2026, faire appliquer un scellant d'asphalte par un professionnel coûte environ 1,50 $ à 3 $ le pied carré au Québec (2 $ à 4 $ pour un scellant latex ou polymère de meilleure qualité). Une entrée résidentielle de 600 pi² revient donc à 900 $ – 2 400 $ tous les 2 à 3 ans. À titre de comparaison, repaver une entrée coûte 5 $ à 13 $ le pied carré.",
    keyTakeaways: [
      "Un scellant appliqué tous les 2 à 3 ans prolonge la vie d'une entrée en asphalte de plusieurs années pour une fraction du prix du repavage.",
      "Les fissures se réparent par injection à chaud avant le scellant ; les nids-de-poule demandent une réparation permanente au mélange chaud.",
      "Le scellant à base de polymères coûte plus cher mais résiste mieux au sel, aux UV et aux cycles gel-dégel.",
      "Quand plus de 25–30 % de la surface est fissurée ou affaissée, le resurfaçage ou le repavage devient plus rentable que l'entretien.",
    ],
    sections: [
      {
        h: 'Fourchettes de prix 2026',
        paragraphs: [
          "Les fourchettes ci-dessous proviennent de guides de prix québécois publiés pour 2026 (sources en fin de page) et s'appliquent à une pose professionnelle.",
        ],
        table: {
          caption: 'Entretien et réparation d’asphalte au Québec, 2026',
          columns: ['Travaux', 'Prix ($/pi²)', 'Entrée de 600 pi²'],
          rows: [
            ['Scellant à base d’asphalte, appliqué', '1,50 $ – 3 $', '900 $ – 1 800 $'],
            ['Scellant latex ou polymère, appliqué', '2 $ – 4 $', '1 200 $ – 2 400 $'],
            ['Réparation de fissures (injection à chaud)', 'Selon la longueur', 'Souvent 150 $ – 600 $'],
            ['Resurfaçage (nouvelle couche sur asphalte existant)', 'Inférieur au repavage, selon l’état', 'Sur devis'],
            ['Repavage complet d’une entrée', '5 $ – 13 $', '3 000 $ – 7 800 $'],
          ],
        },
      },
      {
        h: 'Sceller, réparer ou repaver ?',
        paragraphs: [
          "Sceller quand l'asphalte est gris, sec, avec quelques fissures fines : c'est de la prévention. Réparer quand des fissures dépassent 6 mm ou qu'il y a des nids-de-poule : on injecte à chaud puis on scelle. Repaver quand la fondation bouge (affaissements, fissures en toile d'araignée sur une grande surface) : sceller par-dessus ne tient pas.",
          "Le climat québécois — sel de déglaçage, cycles gel-dégel — est la raison principale pour laquelle un scellant aux 2–3 ans est rentable ici alors qu'il est optionnel ailleurs.",
        ],
      },
      {
        h: 'Comment fonctionne une soumission avec Zeniva Asphalte',
        paragraphs: [ZENIVA_MODEL_PARAGRAPH, "Zeniva Asphalte couvre l'entretien résidentiel et commercial : scellant protection UV, injection de fissures, nids-de-poule, marquage de lignes et resurfaçage."],
      },
    ],
    faq: [
      {
        q: "Combien coûte le scellant d'asphalte pour une entrée au Québec ?",
        a: "Environ 1,50 $ à 3 $ le pied carré appliqué par un professionnel en 2026 (2 $ à 4 $ pour un scellant latex ou polymère), soit 900 $ à 2 400 $ pour une entrée de 600 pi².",
      },
      {
        q: 'À quelle fréquence sceller une entrée en asphalte ?',
        a: "Tous les 2 à 3 ans au Québec, à cause du sel de déglaçage et des cycles gel-dégel.",
      },
      {
        q: "Peut-on sceller une entrée neuve tout de suite ?",
        a: "Non. Il faut laisser l'asphalte neuf durcir 6 à 12 mois avant la première application de scellant.",
      },
      {
        q: 'La soumission Zeniva est-elle gratuite ?',
        a: `Oui. La soumission est gratuite et sans dépôt. Un entrepreneur certifié vous contacte sous ${MODEL.contactDelay} ; vous payez ${MODEL.signingShare} à la signature du contrat seulement.`,
      },
    ],
    sources: [
      { name: 'CombienCaCoute.ca — Prix pavage en 2026 au Québec', url: 'https://combiencacoute.ca/cout-pavage-entree-dauto-maison/' },
      { name: 'SoumissionsAsphalte.ca — Prix pour une réparation d’asphalte en 2026', url: 'https://soumissionsasphalte.ca/prix-pour-une-reparation-dasphalte/' },
      { name: 'Les Pavages Fillion — Prix d’une entrée en asphalte à Québec en 2026', url: 'https://www.pavagefillion.com/prix-pavage-asphalte-quebec' },
      { name: 'Soumission Rénovation — Prix d’un pavage en asphalte au pied carré', url: 'https://soumissionrenovation.ca/fr/blogue/combien-coute-un-pavage-en-asphalte-au-pied-carre' },
    ],
  },
  {
    slug: 'prix-isolation-grenier-quebec',
    division: 'isolation',
    title: "Prix de l'isolation d'un grenier au Québec en 2026 : cellulose ou uréthane ?",
    description:
      "Combien coûte isoler un entretoit au Québec en 2026 : cellulose soufflée et uréthane giclé au pied carré, coût total pour un grenier de 1 000 à 1 500 pi², valeur R visée, et subventions Rénoclimat et LogisVert.",
    datePublished: '2026-09-21',
    dateModified: '2026-09-21',
    readingMinutes: 6,
    tags: ['prix isolation grenier', 'cellulose soufflée prix', 'uréthane giclé prix Québec', 'Rénoclimat subvention isolation'],
    shortAnswer:
      "En 2026, isoler un grenier à la cellulose soufflée coûte généralement de 2 $ à 4 $ le pied carré posé au Québec (selon l'épaisseur et la valeur R visée), et l'uréthane giclé de 2,25 $ à 8 $ le pied carré selon le type de mousse et l'épaisseur. Un entretoit de 1 200 pi² revient donc à environ 2 400 $ – 4 800 $ en cellulose. Les programmes Rénoclimat (jusqu'à 9 880 $ pour l'ensemble des travaux d'isolation admissibles) et LogisVert d'Hydro-Québec (jusqu'à 1 500 $ pour l'isolation du toit) peuvent réduire la facture.",
    keyTakeaways: [
      "Le grenier et l'étanchéité à l'air sont presque toujours le meilleur rendement par dollar investi, avant les murs.",
      "La cellulose soufflée est le choix économique pour un grenier accessible ; l'uréthane giclé s'impose quand il faut une forte valeur R dans un espace mince ou un pare-air intégré (sous-sol, vide sanitaire, toit cathédrale).",
      "La valeur R visée pour un entretoit au Québec est généralement R-41 et plus.",
      "Une évaluation énergétique Rénoclimat avant et après les travaux est requise pour obtenir la subvention.",
      "La ventilation de l'entretoit doit être préservée (déflecteurs aux soffites) sinon l'isolant retient l'humidité.",
    ],
    sections: [
      {
        h: 'Fourchettes de prix 2026',
        paragraphs: [
          "Les fourchettes ci-dessous proviennent de guides de prix québécois publiés pour 2026 (sources en fin de page), pose professionnelle incluse.",
        ],
        table: {
          caption: 'Isolation d’un entretoit au Québec, 2026',
          columns: ['Isolant', 'Prix posé ($/pi²)', 'Grenier de 1 200 pi²', 'Usage typique'],
          rows: [
            ['Cellulose soufflée', '2 $ – 4 $', '2 400 $ – 4 800 $', 'Grenier accessible, ajout par-dessus l’existant'],
            ['Uréthane giclé, cellules ouvertes', '2,25 $ – 4,50 $', '2 700 $ – 5 400 $', 'Plafonds, murs, insonorisation'],
            ['Uréthane giclé, cellules fermées', '4,50 $ – 8 $', '5 400 $ – 9 600 $', 'Sous-sol, vide sanitaire, toit cathédrale, pare-air'],
            ['Étanchéité à l’air + test d’infiltrométrie', 'Forfait', 'Souvent 300 $ – 1 200 $', 'Avant tout ajout d’isolant'],
          ],
        },
      },
      {
        h: 'Cellulose ou uréthane : comment choisir',
        paragraphs: [
          "Pour un grenier accessible avec plancher ou solives apparentes, la cellulose soufflée offre le meilleur rapport R par dollar et se pose en quelques heures. Pour un sous-sol, un vide sanitaire ou un toit cathédrale, l'uréthane giclé à cellules fermées combine isolant, pare-air et pare-vapeur en une seule application — c'est plus cher, mais c'est ce qui règle les problèmes de condensation.",
        ],
      },
      {
        h: 'Subventions en 2026',
        paragraphs: [
          "Rénoclimat (Québec) subventionne les travaux d'isolation après une évaluation énergétique ; l'isolation d'un entretoit donne droit à un montant variable selon l'amélioration de la valeur R, et l'ensemble des travaux d'isolation admissibles peut atteindre 9 880 $. LogisVert (Hydro-Québec) offre jusqu'à 1 500 $ pour l'isolation et le calfeutrage du toit. Les montants et conditions changent régulièrement : l'entrepreneur assigné vous indique les programmes applicables et la documentation requise au moment des travaux.",
        ],
      },
      {
        h: 'Comment fonctionne une soumission avec Zeniva Isolation',
        paragraphs: [ZENIVA_MODEL_PARAGRAPH, "Chaque soumission Zeniva Isolation précise l'isolant, l'épaisseur et la valeur R visée, les travaux d'étanchéité à l'air, la préservation de la ventilation et l'accompagnement pour les subventions."],
      },
    ],
    faq: [
      {
        q: "Combien coûte l'isolation d'un grenier à la cellulose soufflée au Québec ?",
        a: "Généralement 2 $ à 4 $ le pied carré posé en 2026, soit environ 2 400 $ à 4 800 $ pour un entretoit de 1 200 pi², selon l'épaisseur et la valeur R visée.",
      },
      {
        q: "Quel est le prix de l'uréthane giclé au Québec ?",
        a: "Entre 2,25 $ et 8 $ le pied carré posé en 2026 selon le type de mousse (cellules ouvertes ou fermées) et l'épaisseur ; on parle souvent de 2 $ à 4,50 $ par pouce d'épaisseur au pied carré.",
      },
      {
        q: 'Quelles subventions existent pour isoler un grenier au Québec ?',
        a: "Rénoclimat (jusqu'à 9 880 $ pour l'ensemble des travaux d'isolation admissibles, après évaluation énergétique) et LogisVert d'Hydro-Québec (jusqu'à 1 500 $ pour l'isolation et le calfeutrage du toit). Les montants varient selon le programme en vigueur.",
      },
      {
        q: 'Par où commencer pour réduire ma facture de chauffage ?',
        a: "Par le grenier et l'étanchéité à l'air : c'est presque toujours le meilleur rendement par dollar investi, avant les murs et les fenêtres.",
      },
      {
        q: 'La soumission Zeniva est-elle gratuite ?',
        a: `Oui. La soumission est gratuite et sans dépôt. Un entrepreneur certifié RBQ vous contacte sous ${MODEL.contactDelay} ; vous payez ${MODEL.signingShare} à la signature du contrat seulement.`,
      },
    ],
    sources: [
      { name: 'CombienCaCoute.ca — Prix isolation 2026 au Québec', url: 'https://combiencacoute.ca/prix-services-isolation/' },
      { name: 'Soumission Rénovation — Prix isolation entretoit Québec : cellulose ou uréthane', url: 'https://soumissionrenovation.ca/fr/blogue/prix-de-lisolation-dentretoit-au-quebec-cellulose-vs-urethane-gicle' },
      { name: 'UrethaneGicle.ca — Prix de l’uréthane giclé au Québec 2026', url: 'https://urethanegicle.ca/prix/cout-urethane-gicle-quebec/' },
      { name: 'Renovations Quebec — Isolation grenier au Québec 2026 : coûts, R-41 et subventions', url: 'https://renovationsqc.com/isolation-grenier-r41-quebec-2026/' },
    ],
  },
];

export function findGuide(slug: string): GuideData | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function guidesForDivision(division: string): GuideData[] {
  return GUIDES.filter((g) => g.division === division);
}
