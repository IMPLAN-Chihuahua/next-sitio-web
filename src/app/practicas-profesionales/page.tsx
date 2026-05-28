import { Box, Container, Toolbar, Typography } from "@mui/material";
import PageBanner from "../components/PageBanner";
import FreshDivider from "../components/FreshDivider";
import Careers from "./components/Careers";
import { SubtitleH2 } from "../components/Titles";


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
    <Container component={'main'}>
      <Toolbar variant="dense" />
      <SubtitleH2 title="Vacantes" />
      <Careers data={data?.vacantes} />
    </Container>
  )
}