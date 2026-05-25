import type { Metadata } from 'next';
import { Box, Container, Toolbar, Typography } from "@mui/material";
import PageBanner from '../components/PageBanner';
import { InstrumentosPageType } from './definitions';
import { SubtitleH2 } from '../components/Titles';
import InstrumentosTiles from './components/Tiles';


export const metadata: Metadata = {
  title: 'Instrumentos de Planeación | IMPLAN'
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
      <InstrumentosTiles />
    </Container>
  </Box>)
}