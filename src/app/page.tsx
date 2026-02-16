import { Box, Container, Divider } from "@mui/material";
import LandingPageBanner from "./components/LandingPageBanner";
import ProjectsExplorer from "./inicio/ProjectsExplorer";
import ServicesList from "./inicio/ServicesList";
import StellarBanner from "./inicio/StellarBanner";
import ProjectSlider from "./inicio/ProjectSlider";
import News from "./inicio/News";
import FreshDivider from "./components/FreshDivider";


export default async function Home() {
  let data: any = {};
  let newsData: any = [];

  try {
    const [homeRes, newsRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_IMPLAN_CMS}/home-page?populate=deep`, {
        next: { revalidate: 3600 },
      }),
      fetch(`${process.env.NEXT_PUBLIC_IMPLAN_CMS}/entries?sort=publishedAt:desc&pagination[limit]=4&populate=*`, {
        next: { revalidate: 3600 },
      })
    ]);

    const homeJson = await homeRes.json();
    const newsJson = await newsRes.json();

    data = homeJson?.data || {};
    newsData = newsJson?.data || [];

    console.log(newsData)
  } catch (err) {
    console.error("Error fetching data: ", err);
  }

  const heroPhrases = data.Hero?.map((item: any) => ({
    content: item.text,
    emphasis: item.textEmphasis,
    image: `${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${item.image?.url}`
  }))

  return (
    <main>
      <LandingPageBanner phrases={heroPhrases} />
      <Box sx={{
        bgcolor: 'white',
        backgroundSize: '20px 20px',
      }}>

        <Container>
          <ServicesList data={data.Sections} />
        </Container>

        <Box sx={{
          bgcolor: 'grey.50',
        }}>
          <ProjectsExplorer data={data.Platforms} />
        </Box>
        <StellarBanner data={data.Stellar} />
        <Box sx={{
          bgcolor: 'white',
        }}>
          <Container maxWidth={'xl'}>
            <ProjectSlider data={data.Projects} />
            <FreshDivider />
            <News data={newsData} />
          </Container>
        </Box>
      </Box>
    </main>
  );
}
