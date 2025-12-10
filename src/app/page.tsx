import { Container } from "@mui/material";
import LandingPageBanner from "./components/LandingPageBanner";
import ProjectsExplorer from "./components/ProjectsExplorer";
import ServicesList from "./components/ServicesList";


export default async function Home() {
  let data: any = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_IMPLAN_CMS}/home-page`, {
      next: { revalidate: 3600 },
    });
    const json = await res.json();
    data = json.data;
  } catch (err) {
    console.error("Error fetching data: ", err);
  }

  return (
    <main>
      <LandingPageBanner
        phrases={[]}
      />
      <Container>
        <ServicesList data={data.Sections} />
        <ProjectsExplorer data={data.Platforms} />
      </Container>
    </main>
  );
}
