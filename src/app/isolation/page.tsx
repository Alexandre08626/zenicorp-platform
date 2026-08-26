import { Metadata } from 'next';
import DivisionPage from '@/components/division-page';
import { getDivisionBySlug } from '@/lib/divisions-data';

const division = getDivisionBySlug('isolation')!;

export const metadata: Metadata = {
  title: division.name,
  description: division.positioning,
  openGraph: {
    title: division.name,
    description: division.positioning,
    images: [`/og/${division.slug}.jpg`],
  },
};

export default function IsolationPage() {
  return <DivisionPage division={division} />;
}
