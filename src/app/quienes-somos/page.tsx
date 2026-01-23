import type { Metadata } from 'next';
import { Box, Container, Grid, Typography } from "@mui/material";
import PageBanner from '../components/PageBanner';
import CardInfo from './components/CardInfo';
import OurValues from './components/OurValues';
import VisibilityIcon from "@mui/icons-material/Visibility";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import TeamDirectory from './components/TeamDirectory';

export const metadata: Metadata = {
  title: '¿Quiénes somos?'
};



export default async function QuienesSomosPage() {
  let data: any = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_IMPLAN_CMS}/about-us-page`, {
      next: { revalidate: 3600 },
    });
    const json = await res.json();
    console.log(json)
    data = json.data;
  } catch (err) {
    console.error("Error fetching data: ", err);
  }

  return (
    <Box sx={{ pb: 10 }}>
      <PageBanner title="¿Quiénes somos?" description="..." />
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Grid container spacing={4} alignItems="stretch" justifyContent="center">

          <Grid size={{ md: 6, xs: 12 }} >
            <CardInfo
              title="Misión"
              text="Impulsar la planeación estratégica del municipio mediante análisis técnico y participación ciudadana, promoviendo un desarrollo ordenado y sostenible."
              icon={TrackChangesIcon}
            />
          </Grid>
          <Grid size={{ md: 6, xs: 12 }} >
            <CardInfo
              title="Visión"
              text="Ser un referente nacional en la planeación integral urbana, consolidando un municipio competitivo, resiliente y con alta calidad de vida para todos."
              icon={VisibilityIcon}
            />
          </Grid>
        </Grid>
        <OurValues />
        <TeamDirectory data={data.team_members} />
      </Container>
    </Box>
  );
}