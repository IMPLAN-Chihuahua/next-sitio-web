import type { Metadata } from 'next';
import { Box, CircularProgress, Container, Toolbar, Typography } from "@mui/material";
import PageBanner from '../components/PageBanner';
import { InstrumentosPageType } from './definitions';
import { SubtitleH2 } from '../components/Titles';
import InstrumentosTiles from './components/Tiles';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Planeación | IMPLAN'
};


export default async function InstrumentosPlaneacionPage() {
  const req = await fetch(`${process.env.NEXT_PUBLIC_IMPLAN_CMS}/instrumento-planeacion-page?populate=*`)
  const page: { data: InstrumentosPageType } = await req.json();


  return (<Box component={'main'} minHeight='100vh'>
    <PageBanner
      cover={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${page.data.cover.url}`}
      title={`${page.data.titulo}`}
      description={page.data.descripcion}
    />
    <Container>
      <SubtitleH2 title='Datos abiertos' />
      <Typography>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias illo eos commodi beatae a recusandae ratione, nihil esse dolor reiciendis eaque, deleniti voluptate ab fuga consectetur ipsam unde modi libero.
      </Typography>
      <Suspense fallback={<Box display="flex" justifyContent="center" py={10}><CircularProgress /></Box>}>
        <InstrumentosTiles />
      </Suspense>
    </Container>
  </Box>)
}