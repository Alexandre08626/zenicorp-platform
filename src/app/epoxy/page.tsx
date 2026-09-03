import type { Metadata } from 'next';
import DivisionTemplate from '@/components/DivisionTemplate';
import { getDivisionBySlug } from '@/lib/divisions-data';

const division = getDivisionBySlug('epoxy')!;

export const metadata: Metadata = {
  title: division.name,
  description: division.positioning,
  alternates: { canonical: `/${division.slug}` },
  openGraph: {
    title: division.name,
    description: division.positioning,
    images: [{ url: division.photo, width: 1200, height: 630, alt: division.name }],
  },
};

export default function Page() {
  return <DivisionTemplate division={division} />;
}
