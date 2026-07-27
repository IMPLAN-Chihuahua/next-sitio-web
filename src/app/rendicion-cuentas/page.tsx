import type { Metadata } from 'next';
import { Box, CircularProgress, Container, Link, Toolbar, Typography } from "@mui/material";
import PageBanner from '../components/PageBanner';
import { SubtitleH2 } from '../components/Titles';
import { CuentaPublicaSection } from './components/ReportesTable';
import { Suspense } from 'react';
import { MDXRemote } from 'next-mdx-remote-client/rsc';
import { RendicionDeCuentasPage } from './definitions';


export const metadata: Metadata = {
  title: 'Rendición de cuentas'
};


export default async function QuienesSomosPage() {
  const reportesReq = await fetch(`${process.env.NEXT_PUBLIC_IMPLAN_CMS}/reportes-financieros/available-years`);
  const { data: cuentaPublicaYears } = await reportesReq.json();

  const rendicionPageReq = await fetch(`${process.env.NEXT_PUBLIC_IMPLAN_CMS}/rendicion-cuentas-page?populate[0]=cover`);
  const rendicionCuentasPage = await rendicionPageReq.json() as { data: RendicionDeCuentasPage };

  return (
    <>
      <Toolbar variant='dense' />
      <Container sx={{ my: 3 }}>
        <CuentaPublicaSection availableYears={cuentaPublicaYears} />
        <Box>
          <Suspense fallback={<CircularProgress />}>
            <MDXRemote
              source={rendicionCuentasPage.data.contenido}
              components={{
                h2: props => (<SubtitleH2 title={props.children} />),
                p: props => (<Typography mb={1.3}>{props.children}</Typography>),
                a: props => (<Link href={props.href} target='_blank'>{props.children}</Link>)
              }}
            />
          </Suspense>
        </Box>
      </Container>
    </>
  )
}