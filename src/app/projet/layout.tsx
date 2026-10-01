import type { Metadata } from 'next';

// La page est un composant client : ses métadonnées vivent ici. Sans ce fichier,
// /projet héritait du titre et du canonical de l'accueil (page vue comme un doublon).
export const metadata: Metadata = {
  title: { absolute: 'Soumission gratuite — plancher époxy et travaux au Québec | Zeniva' },
  description:
    'Demandez une soumission gratuite en deux minutes : plancher époxy de garage, sous-sol, commerce ou usine au Québec. Sans engagement, prix ferme après visite. Ou appelez le 581-748-7017.',
  alternates: { canonical: '/projet' },
  openGraph: {
    title: 'Soumission gratuite — Zeniva',
    description: 'Décrivez vos travaux en deux minutes. Sans engagement, prix ferme après visite.',
    url: 'https://www.zeniva.ca/projet',
  },
};

export default function ProjetLayout({ children }: { children: React.ReactNode }) {
  return children;
}
