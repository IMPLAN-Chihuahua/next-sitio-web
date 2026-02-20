import type { Metadata } from 'next';
import { Box, Container, Typography } from "@mui/material";
import PageBanner from '../components/PageBanner';
import { SubtitleH2 } from '../components/Titles';
import { CuentaPublicaSection } from './components/ReportesTable';


export const metadata: Metadata = {
  title: 'Rendición de cuentas'
};


export default async function QuienesSomosPage() {
  const reportesReq = await fetch(`${process.env.NEXT_PUBLIC_IMPLAN_CMS}/reportes-financieros/available-years`);
  const { data: cuentaPublicaYears } = await reportesReq.json();

  return (
    <main>
      <PageBanner
        description='lorem ipsum'
        title='Rendición de cuentas'
      />
      <Container>
        <CuentaPublicaSection availableYears={cuentaPublicaYears} />
        <Box height={600}>
          <Typography>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus voluptas perspiciatis delectus laboriosam veniam non dolorum magnam eos laudantium. Obcaecati repellendus, ipsa vero accusamus molestias corporis repellat accusantium quidem sit.</Typography>
        </Box>
      </Container>
    </main>
  )
}