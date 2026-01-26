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
      title={`Datos abiertos ${page.data.titulo}`}
      description={page.data.descripcion}
    />
    <Container>
      <SubtitleH2 title='Planeación urbana' />
      <Typography>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias illo eos commodi beatae a recusandae ratione, nihil esse dolor reiciendis eaque, deleniti voluptate ab fuga consectetur ipsam unde modi libero.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla soluta voluptatibus dolorem eius, deserunt eligendi sint dolor perspiciatis neque perferendis tenetur ducimus quis? Ducimus impedit omnis sit unde. Id, atque.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis necessitatibus soluta, eos quaerat nesciunt rem cumque? Quia dolor cumque vel, quae suscipit velit amet culpa autem voluptate, consectetur, dolorum aliquam!
      </Typography>
      <InstrumentosTiles />
    </Container>
  </Box>)
}