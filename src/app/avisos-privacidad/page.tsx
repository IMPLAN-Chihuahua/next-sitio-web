import { Box, Container, Toolbar, Typography } from "@mui/material";
import { SubtitleH2, TitleH1 } from "../components/Titles";
import { AvisosPrivacidadTable } from "./components/AvisosPrivacidadTable";
import { AvisoPrivacidad } from "./definitions";
import qs from 'qs'



export default async function AvisoPrivacidadPage() {
  const queryParams = qs.stringify({
    sort: ['orden:asc'],
    fields: ['titulo', 'fechaElaboracion', 'fechaModificacion', 'orden', 'seoUrl'],
  })
  const req = await fetch(`${process.env.NEXT_PUBLIC_IMPLAN_CMS}/avisos-privacidad?${queryParams}`);
  const { data: avisos }: { data: AvisoPrivacidad[] } = await req.json();

  return (
    <Box>
      <Toolbar variant="dense" />
      <Container sx={{ my: 3 }}>
        <TitleH1 title="Avisos de privacidad" />
        <AvisosPrivacidadTable avisos={avisos} />
      </Container>
    </Box>
  )
}