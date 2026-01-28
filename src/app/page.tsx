import { Container, Divider } from "@mui/material";
import LandingPageBanner from "./components/LandingPageBanner";
import ProjectsExplorer from "./inicio/ProjectsExplorer";
import ServicesList from "./inicio/ServicesList";
import StellarBanner from "./inicio/StellarBanner";
import ProjectSlider from "./inicio/ProjectSlider";
import News from "./inicio/News";


export default async function Home() {
  let data: any = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_IMPLAN_CMS}/home-page`, {
      next: { revalidate: 3600 },
    });
    const json = await res.json();
    data = json?.data || {};
  } catch (err) {
    console.error("Error fetching data: ", err);
  }

  return (
    <main>
      <LandingPageBanner
        phrases={[{
          content: 'Somos un Instituto que ',
          emphasis: 'Promueve el desarrollo equitativo',
          image: 'https://blog.uber-cdn.com/cdn-cgi/image/width=2160,quality=80,onerror=redirect,format=auto/wp-content/uploads/2019/05/Lugares-para-visitar-en-Chihuahua-1024x512.png'
        }]}
      />
      <ServicesList data={data.Sections} />
      <ProjectsExplorer data={data.Platforms} />
      <Container>
      </Container>
      <StellarBanner data={data.Stellar} />
      <Container maxWidth={'xl'}>
        <ProjectSlider data={data.Projects} />
        <Divider sx={{ mt: 5, mb: 5 }} />
        <News />
      </Container>
    </main>
  );
}
