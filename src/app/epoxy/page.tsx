import type { Metadata } from 'next';
import DivisionTemplate from '@/components/DivisionTemplate';
import { getDivisionBySlug } from '@/lib/divisions-data';

const division = getDivisionBySlug('epoxy')!;
const title = division.seoTitle ?? division.name;
const description = division.seoDescription ?? division.positioning;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `/${division.slug}` },
  openGraph: {
    title,
    description,
    url: `https://www.zeniva.ca/${division.slug}`,
    images: [{ url: division.photo, width: 1200, height: 630, alt: division.name }],
  },
};

export default function Page() {
  return <DivisionTemplate division={division} />;
}
