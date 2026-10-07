import { Box, Container, Divider, Toolbar, Typography } from "@mui/material";
import LandingPageBanner, { Overlay } from "./components/LandingPageBanner";
import ProjectsExplorer from "./inicio/ProjectsExplorer";
import ServicesList from "./inicio/ServicesList";
import ProjectSlider from "./inicio/ProjectSlider";
import News from "./inicio/News";
import QueInformacionTeInteresa from "./inicio/QueInformacionTeInteresa";


export default async function Home() {
  let data: any = {};
  let newsData: any = [];

  try {
    const [homeRes, newsRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_IMPLAN_CMS}/home-page?populate=deep`, {
        next: { revalidate: 3600 },
      }),
      fetch(`${process.env.NEXT_PUBLIC_IMPLAN_CMS}/entries?sort[0]=destacado:desc&sort[1]=fechaPublicacion:desc&pagination[limit]=4&populate=*`, {
        next: { revalidate: 3600 },
      })
    ]);

    const homeJson = await homeRes.json();
    const newsJson = await newsRes.json();

    data = homeJson?.data || {};
    newsData = newsJson?.data || [];

  } catch (err) {
    console.error("Error fetching data: ", err);
  }

  const heroPhrases = data.Hero?.map((item: any) => ({
    content: item.text,
    emphasis: item.textEmphasis,
    image: `${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${item.image?.url}`
  })) ?? [];

  const {
    Sections: sections = null,
    Platforms: platforms = null,
    Stellar: stellar = null,
    Projects: projects = null,
  } = data;

  return (
    <>
      <LandingPageBanner phrases={heroPhrases} />
      <Container>
        <Typography mt={{ xs: 3, md: 9 }} gutterBottom variant="h1" component="h2">¿Qué te interesa consultar?</Typography>
        <QueInformacionTeInteresa />
        <ServicesList data={sections} />
        <Box py={3} />
        <ProjectsExplorer data={platforms} />
      </Container>
      <Box py={3} />
      <Box
        sx={{
          background: 'linear-gradient(65deg, rgb(32, 32, 34) 60%,  rgb(65, 65, 67) 100%)',
          color: 'primary.50',
        }}
        py={4}>
        <Container maxWidth='xl'>
          <Typography
            variant="h1"
            color='inherit'
            component={'h2'}
            gutterBottom
          >Instrumentos de planeación</Typography>
          <ProjectSlider data={projects} />
        </Container>
      </Box>
      <Box py={3} />
      <Container>
        <News data={newsData} />
      </Container>
    </>
  );
}
