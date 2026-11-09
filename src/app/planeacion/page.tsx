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
import SistemaPlaneacion from './components/SistemaPlaneacion';
import DiagramaPlaneacion from './components/DiagramaPlaneacion';
import { sistemaPlaneacion } from './data/sistema-planeacion';

export const metadata: Metadata = {
  title: 'Planeación',
};

type Props = {
  searchParams: Promise<{
    tab?: string;
    grupo?: string;
  }>;
};

export default async function InstrumentosPlaneacionPage({
  searchParams,
}: Props) {
  const { tab = 'sistemas-planeacion', grupo: grupoParam } = await searchParams;
  const grupo = tab === 'sistemas-planeacion'
    ? sistemaPlaneacion.derivados.find(nodo => nodo.grupo === grupoParam)?.grupo ?? null
    : null;

  const req = await fetch(
    `${process.env.NEXT_PUBLIC_IMPLAN_CMS}/instrumento-planeacion-page?populate=*`
  );

  const page: {
    data: InstrumentosPageType;
  } = await req.json();

  return (
    <Box minHeight="100vh">
      <PageBanner
        titleComponent="h1"
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

      <Container maxWidth="lg" sx={{ pt: 3 }}>
        <DiagramaPlaneacion grupo={grupo} />
        {tab === 'sistemas-planeacion' && <SistemaPlaneacion grupo={grupo} />}

        {tab === 'datos-abiertos' && <DatosAbiertos />}

        {tab === 'tableros' && <Tableros />}


        {tab === 'guias-manuales' && <GuiasManuales />}
      </Container>
    </Box>
  );
}
