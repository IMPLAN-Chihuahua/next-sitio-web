import PageBanner from "@/app/components/PageBanner";
import { TrabajosPlaneacionPageType } from "./definitions";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { SubtitleH2 } from "@/app/components/Titles";
import TrabajosTiles from "./components/Tiles";
import { Suspense } from "react";


export default async function CentroEstudiosPage() {
  const pageReq = await fetch(`${process.env.NEXT_PUBLIC_IMPLAN_CMS}/trabajos-planeacion-page?populate=*`);
  const trabajosPlaneacionPage: { data: TrabajosPlaneacionPageType, media: Record<string, unknown> } = await pageReq.json();


  return (
    <>
      <PageBanner
        title={trabajosPlaneacionPage.data.titulo}
        description={trabajosPlaneacionPage.data.descripcion}
        cover={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${trabajosPlaneacionPage.data.cover.url}`}
      />
      <Container sx={{ my: 3 }}>
        <Typography variant="h2" gutterBottom>
          Conoce nuestros estudios
        </Typography>
        <Typography>
          Consulta estudios, diagnósticos y propuestas desarrollados por el IMPLAN y en colaboración con instituciones y especialistas. Estos trabajos abordan distintos aspectos de la ciudad y el territorio, aportando información técnica para la planeación y la toma de decisiones.
        </Typography>
        <Suspense fallback={<Box display="flex" justifyContent="center" py={10}><CircularProgress /></Box>}>

          <TrabajosTiles />
        </Suspense>
      </Container>
    </>
  )
}