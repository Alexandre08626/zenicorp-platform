import type { Metadata } from 'next';

// La page est un composant client : ses métadonnées vivent ici (sinon elle héritait
// du titre et du canonical de l'accueil).
export const metadata: Metadata = {
  title: { absolute: 'Entrepreneurs RBQ : rejoindre le réseau Zeniva (gratuit) | Zeniva' },
  description:
    "Poseur d'époxy ou entrepreneur certifié RBQ au Québec ? Rejoignez gratuitement le réseau Zeniva et recevez des projets qualifiés de votre secteur, sans démarchage ni abonnement.",
  alternates: { canonical: '/entrepreneur' },
  openGraph: {
    title: 'Rejoindre le réseau d’entrepreneurs Zeniva',
    description: 'Adhésion gratuite, projets qualifiés de votre secteur, sans démarchage.',
    url: 'https://www.zeniva.ca/entrepreneur',
  },
};

export default function EntrepreneurLayout({ children }: { children: React.ReactNode }) {
  return children;
}
