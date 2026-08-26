import { Metadata } from 'next';
import DivisionPage from '@/components/division-page';
import { getDivisionBySlug } from '@/lib/divisions-data';

const division = getDivisionBySlug('toiture')!;

export const metadata: Metadata = {
  title: division.name,
  description: division.positioning,
  openGraph: {
    title: division.name,
    description: division.positioning,
    images: [`/og/${division.slug}.jpg`],
  },
};

export default function ToiturePage() {
  return <DivisionPage division={division} />;
}
