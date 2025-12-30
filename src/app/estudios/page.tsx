import PageBanner from "@/app/components/PageBanner";
import { CentroEstudiosPageType } from "./definitions";
import { Container, Typography } from "@mui/material";
import { SubtitleH2 } from "@/app/components/Titles";
import EstudiosTiles from "./components/EstudiosTiles";


export default async function CentroEstudiosPage() {
  const pageReq = await fetch(`${process.env.NEXT_PUBLIC_IMPLAN_CMS}/centro-estudios?populate=*`);
  const centroEstudiosPage: { data: CentroEstudiosPageType, media: Record<string, unknown> } = await pageReq.json();

  return (
    <main>
      <PageBanner
        title={centroEstudiosPage.data.titulo}
        description={centroEstudiosPage.data.descripcion}
        cover={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${centroEstudiosPage.data.cover.url}`}
      />
      <Container>
        <SubtitleH2 title="Estudios" />
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima quibusdam nesciunt quo cupiditate ab consequatur.
          Libero commodi laborum dolor saepe, delectus vitae veniam recusandae quidem. Vero nesciunt necessitatibus sint consequuntur.
        </Typography>
        <EstudiosTiles />
      </Container>
      <Container maxWidth='xl'>
      </Container>
    </main>
  )
}