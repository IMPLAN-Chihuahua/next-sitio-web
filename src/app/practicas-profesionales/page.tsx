import { Typography } from "@mui/material";
import PageBanner from "../components/PageBanner";
import FreshDivider from "../components/FreshDivider";
import Careers from "./components/Careers";


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
  const { text, textEmphasis, image } = data.Slides;
  return (
    <main>
      <PageBanner
        title={text}
        description={textEmphasis}
        cover={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${image.url}`}
      />
      <FreshDivider />
      <Careers data={data.vacantes} />
    </main>)
}