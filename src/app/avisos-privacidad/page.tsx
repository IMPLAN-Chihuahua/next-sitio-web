import { Box, Container, Toolbar, Typography } from "@mui/material";
import { SubtitleH2, TitleH1 } from "../components/Titles";
import { AvisosPrivacidadTable } from "./components/AvisosPrivacidadTable";
import { AvisoPrivacidad } from "./definitions";
import qs from 'qs'
import { TransparenciaBreadcrumbs } from "../transparencia/components/Breadcrumbs";



export default async function AvisoPrivacidadPage() {
  const queryParams = qs.stringify({
    sort: ['orden:asc'],
    fields: ['titulo', 'fechaElaboracion', 'fechaModificacion', 'orden', 'seoUrl'],
  })
  const req = await fetch(`${process.env.NEXT_PUBLIC_IMPLAN_CMS}/avisos-privacidad?${queryParams}`);
  const { data: avisos }: { data: AvisoPrivacidad[] } = await req.json();
  const pageTitle = 'Avisos de privacidad'
  return (
    <Box>
      <Toolbar variant="dense" />
      <Container sx={{ my: 3 }}>
        <TransparenciaBreadcrumbs currentPageTitle={pageTitle} />
        <TitleH1 title={pageTitle} />
        <AvisosPrivacidadTable avisos={avisos} />
      </Container>
    </Box>
  )
}