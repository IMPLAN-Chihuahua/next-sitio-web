import type { Metadata } from 'next';

import {
  Box,
  Container,
} from '@mui/material';

import PageBanner from '../components/PageBanner';

import { InstrumentosPageType } from './definitions';

import PlaneacionTabs from './components/PlaneacionTabs';
import DatosAbiertos from './components/DatosAbiertos';
import Tableros from './components/Tableros';
import GuiasManuales from './components/GuiasManuales';
import { InstrumentoDetailPageBreadcrumbs } from './components/InstrumentoBreadcrumbs';

export const metadata: Metadata = {
  title: 'Planeación | IMPLAN',
};

type Props = {
  searchParams: Promise<{
    tab?: string;
  }>;
};

export default async function InstrumentosPlaneacionPage({
  searchParams,
}: Props) {
  const { tab = 'datos-abiertos' } = await searchParams;

  const req = await fetch(
    `${process.env.NEXT_PUBLIC_IMPLAN_CMS}/instrumento-planeacion-page?populate=*`
  );

  const page: {
    data: InstrumentosPageType;
  } = await req.json();

  return (
    <Box minHeight="100vh">
      <PageBanner
        cover={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${page.data.cover.url}`}
        title={page.data.titulo}
        description={page.data.descripcion}
      />

      <Box
        sx={{
          bgcolor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Container>
          <PlaneacionTabs />
        </Container>
      </Box>

      <Container >
        <InstrumentoDetailPageBreadcrumbs currentPageTitle={tab} />
        {tab === 'datos-abiertos' && <DatosAbiertos />}

        {tab === 'tableros' && <Tableros />}


        {tab === 'guias-manuales' && <GuiasManuales />}
      </Container>
    </Box>
  );
}