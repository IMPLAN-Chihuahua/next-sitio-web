import type { Metadata } from 'next';
import { Box, Container } from "@mui/material";
import PageBanner from '../components/PageBanner';
import Links from './components/Links-cards';

export const metadata: Metadata = {
  title: 'Transparencia'
};

export default async function TransparenciaPage() {
  const req = await fetch(`${process.env.NEXT_PUBLIC_IMPLAN_CMS}/transparencia-page?populate=*`, { cache: 'no-store' });  
  const page = await req.json();

  const dataPage = page.data;

  return (
    <Box component={'main'} minHeight='100vh'>
      <PageBanner
        cover={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${dataPage.cover?.url}`}
        title={`${dataPage.title}`} 
        description={dataPage.description} 
      />
      
      <Container sx={{ mt: 5, pb: 6 }}>
        {/* Enlaces Internos */}
        <Links 
          titulo="IMPLAN" 
          enlaces={dataPage.internal_links} 
        />

        {/* Enlaces Externos */}
        <Links 
          titulo="Enlaces Externos" 
          enlaces={dataPage.external_links} 
          esExterno 
        />
      </Container>
    </Box>
  );
}