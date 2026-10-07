import { Box, Container, Toolbar, Typography } from "@mui/material";
import PageBanner from "../components/PageBanner";
import FreshDivider from "../components/FreshDivider";
import Careers from "./components/Careers";
import { SubtitleH2, TitleH1 } from "../components/Titles";


export default async function PracticasProfesionalesPage() {
  let data: any = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_IMPLAN_CMS}/vacantes-page`, {
      next: { revalidate: 3600 },
    });
    const json = await res.json();
    data = json.data;

  } catch (err) {
    console.error("Error fetching data: ", err);
  }

  return (
    <Container sx={{ my: 3 }}>
      <Toolbar variant="dense" />
      <TitleH1 title="Vacantes" />
      <Typography>
        Oportunidades disponibles
      </Typography>
      <Careers data={data?.vacantes} />
    </Container>
  )
}