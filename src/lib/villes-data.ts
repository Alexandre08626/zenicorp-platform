// Villes desservies — la couche « locale » du GEO. Quand quelqu'un demande à une IA
// « meilleur couvreur à Lévis » ou « prix époxy garage Trois-Rivières », la réponse se joue
// sur des pages qui parlent réellement de cette ville, pas sur une page générique.
//
// Chaque ville porte un contexte RÉEL (parc immobilier, climat, contraintes locales) qui
// change le contenu d'une page à l'autre. Des pages quasi identiques où seul le nom de la
// ville change sont des « doorway pages » : Google les pénalise et les moteurs de réponse
// les ignorent. Si on ajoute une ville, on lui écrit un vrai contexte.

export interface Ville {
  slug: string;
  nom: string;
  /** Région administrative, telle qu'employée au Québec. */
  region: string;
  /** Contexte immobilier et climatique réel — sert de base au texte des pages. */
  contexte: string;
  /** Angle propre à chaque division dans cette ville. */
  angles: Record<string, string>;
  /** Secteurs et municipalités limitrophes couverts depuis cette ville. */
  secteurs: string[];
}

export const VILLES: Ville[] = [
  {
    slug: 'quebec',
    nom: 'Québec',
    region: 'Capitale-Nationale',
    contexte:
      "La ville de Québec combine un parc immobilier ancien dans le Vieux-Québec, Limoilou et Saint-Sauveur, et des développements récents à Lebourgneuf, Beauport et Cap-Rouge. Cette double réalité change tout : une maison de 1940 à Limoilou et un jumelé de 2015 à Lebourgneuf n'ont ni la même toiture, ni le même entretoit, ni le même type de dalle de garage.",
    angles: {
      epoxy: "Les garages des quartiers centraux ont souvent des dalles fissurées ou déjà peintes qui exigent un meulage au diamant avant toute pose ; les constructions récentes de Lebourgneuf et Cap-Rouge demandent surtout un test d'humidité avant d'appliquer.",
      asphalte: "Les entrées en pente des quartiers de la haute-ville et les cycles gel-dégel marqués de la région rendent le scellant aux deux à trois ans particulièrement rentable ici.",
      toiture: "Les toits à forte pente et à lucarnes multiples du Vieux-Québec et de Montcalm demandent plus de solins et de main-d'œuvre que les toits simples des banlieues nord ; la neige abondante impose une ventilation d'entretoit irréprochable.",
      isolation: "Beaucoup de maisons d'avant 1970 des quartiers centraux ont un entretoit sous-isolé, souvent sous R-20. Le passage à R-41 et l'étanchéité à l'air y offrent le meilleur rendement par dollar de toute la région.",
    },
    secteurs: ['Sainte-Foy', 'Limoilou', 'Charlesbourg', 'Beauport', 'Cap-Rouge', 'Lebourgneuf', "L'Ancienne-Lorette", 'Saint-Augustin-de-Desmaures'],
  },
  {
    slug: 'levis',
    nom: 'Lévis',
    region: 'Chaudière-Appalaches',
    contexte:
      "Lévis s'est développée en trois temps : les noyaux anciens de Vieux-Lévis et Lauzon, l'expansion résidentielle de Saint-Romuald et Charny, et les développements récents de Saint-Nicolas et Pintendre. Les bungalows des années 1970-1990 y dominent, avec garage attenant et entrée asphaltée — le profil classique pour l'époxy et l'entretien d'asphalte.",
    angles: {
      epoxy: "Les garages simples et doubles des bungalows de Saint-Romuald, Charny et Pintendre représentent la majorité des projets : dalles en bon état, préparation standard, système 100 % solides avec finition polyaspartique.",
      asphalte: "Les longues entrées des développements de Saint-Nicolas subissent le sel de déglaçage et les chasse-neige ; fissures et nids-de-poule s'y traitent avant scellant.",
      toiture: "Les toitures de bardeaux posées lors du boom résidentiel des années 1990-2000 arrivent en fin de vie : c'est le gros du volume de remplacement à Lévis en ce moment.",
      isolation: "Les bungalows des années 1970-1980 ont typiquement un entretoit isolé à la laine minérale tassée ; un ajout de cellulose soufflée par-dessus, avec déflecteurs aux soffites, est l'intervention la plus fréquente.",
    },
    secteurs: ['Saint-Romuald', 'Charny', 'Saint-Nicolas', 'Pintendre', 'Lauzon', 'Saint-Jean-Chrysostome', 'Breakeyville'],
  },
  {
    slug: 'montreal',
    nom: 'Montréal',
    region: 'Montréal',
    contexte:
      "Montréal est dominée par les plex — duplex et triplex à toit plat de Rosemont, Villeray, Verdun et Hochelaga — et par les maisons unifamiliales avec garage des quartiers périphériques comme Ahuntsic, Saint-Laurent et Rivière-des-Prairies. Le toit plat y est la norme, ce qui change complètement l'approche en toiture.",
    angles: {
      epoxy: "Les garages en sous-sol et les garages de condos, plus humides que les garages attenants de banlieue, exigent presque toujours un test d'humidité et un apprêt bloqueur avant l'époxy.",
      asphalte: "Les entrées courtes et les stationnements arrière en ruelle demandent surtout de la réparation ponctuelle et du scellant ; le repavage complet est moins fréquent qu'en banlieue.",
      toiture: "Les toits plats des plex se traitent en membrane élastomère, TPO ou EPDM — pas en bardeaux. Les drains, les parapets et les solins contre les murs mitoyens sont les points de fuite habituels.",
      isolation: "Les plex d'avant-guerre ont souvent très peu d'isolation en toiture ; l'uréthane giclé à cellules fermées est fréquemment le seul choix viable quand l'épaisseur disponible est mince.",
    },
    secteurs: ['Rosemont', 'Villeray', 'Ahuntsic', 'Saint-Laurent', 'Verdun', 'LaSalle', 'Rivière-des-Prairies', 'Mercier–Hochelaga-Maisonneuve'],
  },
  {
    slug: 'laval',
    nom: 'Laval',
    region: 'Laval',
    contexte:
      "Laval est une banlieue résidentielle à grande échelle : bungalows des années 1960-1980 à Chomedey et Pont-Viau, développements plus récents à Sainte-Dorothée, Vimont et Auteuil. Garages attenants, entrées doubles et toits en pente y sont la norme, ce qui en fait un marché homogène pour les quatre divisions.",
    angles: {
      epoxy: "Les garages doubles de 400 à 600 pi² dominent ; le fini métallique et les flocons colorés y sont plus demandés qu'ailleurs au Québec.",
      asphalte: "Les entrées doubles en asphalte des années 1970-1980 arrivent souvent au point de bascule entre resurfaçage et repavage complet — une évaluation honnête évite de payer un repavage inutile.",
      toiture: "Les toits en pente à deux ou quatre versants se refont en bardeaux architecturaux ; la ventilation par maximums et soffites est le point le plus souvent négligé lors des remplacements antérieurs.",
      isolation: "Les maisons de Chomedey et Pont-Viau construites avant la crise énergétique de 1973 sont les plus rentables à isoler : entretoit, étanchéité à l'air, et souvent le vide sanitaire.",
    },
    secteurs: ['Chomedey', 'Sainte-Dorothée', 'Vimont', 'Auteuil', 'Pont-Viau', 'Duvernay', 'Laval-des-Rapides'],
  },
  {
    slug: 'trois-rivieres',
    nom: 'Trois-Rivières',
    region: 'Mauricie',
    contexte:
      "Trois-Rivières mêle un centre historique au parc immobilier ancien et des secteurs résidentiels étendus comme Cap-de-la-Madeleine, Sainte-Marthe-du-Cap et Trois-Rivières-Ouest. Le climat de la Mauricie — neige abondante, écarts de température marqués — pèse lourd sur les toitures et l'isolation.",
    angles: {
      epoxy: "Les garages détachés, fréquents dans les secteurs anciens, ont souvent des dalles non chauffées et plus humides : la préparation et l'apprêt y comptent plus que le fini choisi.",
      asphalte: "Les écarts de température de la Mauricie ouvrent les fissures rapidement ; l'injection à chaud suivie d'un scellant est l'entretien le plus rentable dans la région.",
      toiture: "Les charges de neige imposent une attention particulière à la ventilation et aux barrières de glace en rive ; c'est là que se produisent la majorité des infiltrations locales.",
      isolation: "L'isolation d'entretoit et l'étanchéité à l'air donnent des économies de chauffage parmi les plus élevées au Québec dans ce climat ; les programmes Rénoclimat et LogisVert s'y appliquent pleinement.",
    },
    secteurs: ['Cap-de-la-Madeleine', 'Sainte-Marthe-du-Cap', 'Trois-Rivières-Ouest', 'Saint-Louis-de-France', 'Pointe-du-Lac'],
  },
  {
    slug: 'sherbrooke',
    nom: 'Sherbrooke',
    region: 'Estrie',
    contexte:
      "Sherbrooke est une ville de collines : les entrées en pente y sont la règle plutôt que l'exception, à Rock Forest, Fleurimont et Lennoxville comme dans les quartiers centraux. Le relief change la façon de traiter l'asphalte, le drainage et l'accès aux toitures.",
    angles: {
      epoxy: "Les garages avec pente d'accès marquée reçoivent plus d'eau, de sel et d'abrasif : le polyaspartique, plus résistant au sel de déglaçage, y est particulièrement indiqué.",
      asphalte: "Les entrées en pente drainent mal si le profil est mal repris ; la réparation d'asphalte à Sherbrooke commence toujours par le drainage, sinon les fissures reviennent en un hiver.",
      toiture: "Les toitures en pente forte des secteurs vallonnés exigent des ancrages et ralentissent la pose, ce qui explique des soumissions plus élevées qu'en terrain plat à superficie égale.",
      isolation: "Le parc immobilier étudiant et locatif de Sherbrooke est souvent sous-isolé ; l'entretoit et le calfeutrage sont les interventions au meilleur rendement pour un propriétaire bailleur.",
    },
    secteurs: ['Rock Forest', 'Fleurimont', 'Lennoxville', 'Brompton', 'Saint-Élie', 'Deauville'],
  },
  {
    slug: 'gatineau',
    nom: 'Gatineau',
    region: 'Outaouais',
    contexte:
      "Gatineau regroupe des secteurs au profil très différent : Aylmer et ses développements résidentiels récents, Hull et son parc plus ancien, Gatineau et Buckingham entre les deux. La proximité d'Ottawa tire les standards de finition vers le haut, notamment pour les garages et les entrées.",
    angles: {
      epoxy: "La demande pour les finis décoratifs — métallique, flocons pleins — est plus forte à Aylmer et dans les développements récents qu'ailleurs au Québec.",
      asphalte: "Les longues entrées des secteurs pavillonnaires d'Aylmer et de Gatineau justifient un entretien planifié plutôt que des réparations ponctuelles.",
      toiture: "Le parc plus ancien de Hull présente davantage de toits complexes et de solins à refaire ; les secteurs récents sont surtout du remplacement de bardeaux de première génération.",
      isolation: "Les maisons des années 1980-1990 d'Aylmer atteignent l'âge où l'isolant d'entretoit s'est tassé ; un ajout par soufflage rétablit la valeur R sans tout refaire.",
    },
    secteurs: ['Aylmer', 'Hull', 'Buckingham', 'Masson-Angers', 'Le Plateau'],
  },
  {
    slug: 'saguenay',
    nom: 'Saguenay',
    region: 'Saguenay–Lac-Saint-Jean',
    contexte:
      "Saguenay — Chicoutimi, Jonquière, La Baie — connaît les hivers les plus rigoureux des grands centres québécois. Les charges de neige, la durée de la saison froide et l'intensité du gel-dégel y rendent l'isolation et la toiture plus déterminantes qu'ailleurs, et raccourcissent la saison des travaux extérieurs.",
    angles: {
      epoxy: "Le sel et l'abrasif entrent massivement dans les garages durant cinq mois : un système avec finition polyaspartique résiste nettement mieux qu'un époxy standard dans ce climat.",
      asphalte: "La saison de pavage et de scellant est courte — de la fin mai à la fin septembre. Planifier tôt évite de perdre une année complète.",
      toiture: "Les charges de neige et les barrières de glace dictent le choix des membranes de protection en rive et la ventilation ; une toiture mal ventilée au Saguenay vieillit deux fois plus vite.",
      isolation: "C'est la région où l'isolation d'entretoit se rentabilise le plus rapidement au Québec, avec les degrés-jours de chauffage les plus élevés parmi les grands centres.",
    },
    secteurs: ['Chicoutimi', 'Jonquière', 'La Baie', 'Canton Tremblay', 'Laterrière'],
  },
  {
    slug: 'longueuil',
    nom: 'Longueuil',
    region: 'Montérégie',
    contexte:
      "Longueuil et la Rive-Sud — Saint-Hubert, Greenfield Park, Brossard à proximité — offrent un parc résidentiel des années 1960 à 1990 avec garages attenants et entrées doubles, ainsi qu'une densité croissante de condos et de jumelés récents.",
    angles: {
      epoxy: "Les garages de bungalows et de jumelés dominent ; les projets de condos et de garages communs se traitent en époxy industriel avec marquage au sol.",
      asphalte: "Les stationnements de petits immeubles locatifs et de commerces de quartier représentent une part importante du volume, avec marquage de lignes inclus.",
      toiture: "Le remplacement de bardeaux posés dans les années 1990 est le gros du marché ; les annexes et garages à toit plat demandent une membrane, pas du bardeau.",
      isolation: "Les maisons des années 1960-1970 de Saint-Hubert et Greenfield Park bénéficient le plus d'un ajout d'isolant en entretoit et d'un traitement d'étanchéité à l'air.",
    },
    secteurs: ['Saint-Hubert', 'Greenfield Park', 'Le Vieux-Longueuil', 'Brossard', 'Boucherville', 'Saint-Lambert'],
  },
  {
    slug: 'drummondville',
    nom: 'Drummondville',
    region: 'Centre-du-Québec',
    contexte:
      "Drummondville connaît une croissance résidentielle soutenue : nouveaux développements en périphérie, parc industriel actif et secteurs établis au centre. Le mélange de construction neuve et de bâtiments industriels crée une demande à la fois résidentielle et commerciale.",
    angles: {
      epoxy: "Le parc industriel génère une demande réelle en époxy et uréthane pour planchers d'usine et d'entrepôt, avec exigences de résistance chimique et marquage de circulation.",
      asphalte: "Les stationnements commerciaux et industriels demandent un entretien planifié — scellant, marquage, réparation — plutôt que des interventions d'urgence.",
      toiture: "Les bâtiments commerciaux à toit plat se traitent en TPO blanc ou EPDM ; le résidentiel récent est surtout en bardeaux architecturaux.",
      isolation: "Les constructions récentes exigent surtout de l'étanchéité à l'air et de l'infiltrométrie ; le parc plus ancien du centre, de l'ajout d'isolant en entretoit.",
    },
    secteurs: ['Saint-Nicéphore', 'Saint-Charles-de-Drummond', 'Saint-Joachim-de-Courval', 'Parc industriel'],
  },
];

export function getVille(slug: string): Ville | undefined {
  return VILLES.find((v) => v.slug === slug);
}

export const villeSlugs = VILLES.map((v) => v.slug);
