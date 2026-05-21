import PageBanner from "@/app/components/PageBanner";
import { TrabajosPlaneacionPageType } from "./definitions";
import { Container, Typography } from "@mui/material";
import { SubtitleH2 } from "@/app/components/Titles";
import TrabajosTiles from "./components/Tiles";


export default async function CentroEstudiosPage() {
  const pageReq = await fetch(`${process.env.NEXT_PUBLIC_IMPLAN_CMS}/trabajos-planeacion-page?populate=*`);
  const trabajosPlaneacionPage: { data: TrabajosPlaneacionPageType, media: Record<string, unknown> } = await pageReq.json();


  return (
    <main>
      <PageBanner
        title={trabajosPlaneacionPage.data.titulo}
        description={trabajosPlaneacionPage.data.descripcion}
        cover={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${trabajosPlaneacionPage.data.cover.url}`}
      />
      <Container>
        <SubtitleH2 title="Estudios y proyectos" />
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima quibusdam nesciunt quo cupiditate ab consequatur.
          Libero commodi laborum dolor saepe, delectus vitae veniam recusandae quidem. Vero nesciunt necessitatibus sint consequuntur.
        </Typography>
        <TrabajosTiles />
      </Container>
    </main>
  )
}