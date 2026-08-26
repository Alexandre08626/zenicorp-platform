export interface DivisionData {
  slug: string;
  name: string;
  positioning: string;
  icon: string;
  services: string[];
  color: string;
  gradient: string;
  site: string;
}

export const divisionsData: DivisionData[] = [
  {
    slug: 'epoxy',
    name: 'ZeniCorp Epoxy',
    positioning: 'Revêtements époxy haut de gamme pour garages, commerces et espaces industriels.',
    icon: '🏠',
    color: '#1E3A8A',
    gradient: 'from-blue-900 to-blue-700',
    site: 'https://zenicorp-epoxy.vercel.app/',
    services: [
      'Époxy résidentiel (garages, sous-sols)',
      'Époxy commercial (boutiques, restaurants)',
      'Époxy industriel (usines, entrepôts)',
      'Polyaspartique séchage rapide',
      'Uréthane résistance chimique',
      'Réparation et préparation de béton',
      'Marquage au sol stationnement',
    ],
  },
  {
    slug: 'asphalte',
    name: 'ZeniCorp Asphalte',
    positioning: 'Entretien, réparation et protection des surfaces asphaltées.',
    icon: '🛣️',
    color: '#374151',
    gradient: 'from-gray-800 to-gray-600',
    site: 'https://zenicorp-asphalte.vercel.app/',
    services: [
      'Scellant d\'asphalte protection UV',
      'Réparation fissures injection à chaud',
      'Réparation nids-de-poule permanente',
      'Entretien stationnements commerciaux',
      'Entretien entrées résidentielles',
      'Marquage lignes et symboles',
      'Resurfaçage asphalte existant',
    ],
  },
  {
    slug: 'toiture',
    name: 'ZeniCorp Toiture',
    positioning: 'Couvreur expert pour toiture résidentielle et commerciale.',
    icon: '🏠',
    color: '#7F1D1D',
    gradient: 'from-red-900 to-red-700',
    site: 'https://zenicorp-toiture.vercel.app/',
    services: [
      'Installation bardeaux asphaltiques',
      'Toiture membrane TPO blanche',
      'Toiture membrane EPDM caoutchouc',
      'Réparation fuites urgence 24/7',
      'Remplacement complet toiture',
      'Inspection préventive avec rapport',
      'Ventilation toiture (soufflets, maximums)',
    ],
  },
  {
    slug: 'isolation',
    name: 'ZeniCorp Isolation',
    positioning: 'Isolation haute performance pour efficacité énergétique.',
    icon: '🌡️',
    color: '#14532D',
    gradient: 'from-green-900 to-green-700',
    site: 'https://zenicorp-isolation.vercel.app/',
    services: [
      'Isolation grenier cellulose soufflée',
      'Isolation murs polyuréthane giclé',
      'Isolation sous-sol panneaux rigides',
      'Isolation vide sanitaire',
      'Étanchéité à l\'air infiltrométrie',
      'Évaluation énergétique Rénoclimat',
      'Subventions et programmes gouvernementaux',
    ],
  },
];

export function getDivisionBySlug(slug: string): DivisionData | undefined {
  return divisionsData.find(d => d.slug === slug);
}

export function getAllDivisions(): DivisionData[] {
  return divisionsData;
}