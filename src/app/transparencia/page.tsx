import type { Metadata } from 'next';
import { Box, Container } from "@mui/material";
import PageBanner from '../components/PageBanner';
import Links from './components/Links_Cards';
import ExternalLinksCarousel from './components/ExternalLinksCarousel';
import FreshDivider from '../components/FreshDivider';

export const metadata: Metadata = {
  title: 'Transparencia'
};

export default async function TransparenciaPage() {
  let dataPage = null;

  try {
    const params = new URLSearchParams({
      'populate[cover]': 'true',
      'populate[Internal_links]': 'true',
      'populate[external_links][populate][image]': 'true',
    });

    const req = await fetch(
      `${process.env.NEXT_PUBLIC_IMPLAN_CMS}/transparencia-page?${params.toString()}`,
    );

    if (!req.ok) {
      const body = await req.text();
      throw new Error(`HTTP ${req.status} — ${body}`);
    }

    const page = await req.json();
    dataPage = page?.data ?? null;
  } catch (error) {
    console.error('Error fetching transparencia-page:', error);
  }

  return (
    <Box minHeight='100vh'>
      <PageBanner
        cover={dataPage.cover?.url
          ? `${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${dataPage.cover.url}`
          : undefined}
        title={dataPage.title ?? ''}
        description={dataPage.description}
      />

      <Container maxWidth="lg" sx={{ my: 3 }}>
        <Links
          titulo="Enlaces Internos"
          enlaces={dataPage.Internal_links || dataPage.internal_links || []}
        />
        <FreshDivider />
        <ExternalLinksCarousel
          titulo="Enlaces Externos"
          enlaces={dataPage.external_links || []}
        />
      </Container>
    </Box>
  );
}