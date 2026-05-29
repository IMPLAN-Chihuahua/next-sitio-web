import type { Metadata } from 'next';
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import PageBanner from '../components/PageBanner';
import { SubtitleH2 } from '../components/Titles';
import CartografiaTiles from './components/Tiles';
import { Suspense } from 'react';
import { MDXRemote } from 'next-mdx-remote-client/rsc';

export const metadata: Metadata = {
  title: 'Cartografía | IMPLAN'
};

export default async function DatosAbiertosPage() {
  const req = await fetch(`${process.env.NEXT_PUBLIC_IMPLAN_CMS}/cartografia-page?populate=*`)
  const page = await req.json();

  return (<main>
    <PageBanner
      cover={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${page.data.cover.url}`}
      description={page.data.descripcion}
      title={page.data.titulo}
    />

    <Container sx={{ my: 4 }}>
      <SubtitleH2 title='Datos abiertos' />
      <MDXRemote 
        source={page.data.datosAbiertosContent}
      />

      <Suspense fallback={<Box display="flex" justifyContent="center" py={10}><CircularProgress /></Box>}>
        <CartografiaTiles />
      </Suspense>

    </Container>
  </main>)
}