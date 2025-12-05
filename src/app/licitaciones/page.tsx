import { Box, Button, Container, Divider, Grid, Link as MuiLink, TextField, Typography } from "@mui/material";
import PageBanner from "../components/PageBanner";
import LicitacionesTable from "./components/LicitacionesTable";
import qs from 'qs';
import LicitacionCard from "./components/LicitacionCard";
import { SubtitleH2 } from "../components/Titles";
import AdquisicionesDirectasTable from "./components/AdquisicionesDirectasTable";
import { AdquisicionDirecta, Licitacion, LicitacionPage } from "./definitions";
import { OpenInNew } from "@mui/icons-material";


const queryForPage = qs.stringify({
  populate: '*'
})

const queryForAdquisiciones = qs.stringify({
  populate: '*'
})


export default async function LicitacionesPage() {
  const pageReq = await fetch(`${process.env.NEXT_PUBLIC_IMPLAN_CMS}/licitaciones-page?${queryForPage}`);
  const adquisicionesReq = await fetch(`${process.env.NEXT_PUBLIC_IMPLAN_CMS}/adquisiciones-directas?${queryForAdquisiciones}`)
  const licitacionesPage: { data: LicitacionPage } = await pageReq.json();
  const adquisicionesList: { data: AdquisicionDirecta[] } = await adquisicionesReq.json();

  return (
    <main>
      <PageBanner
        cover={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${licitacionesPage.data.cover.formats?.large.url}`}
        title="¿Cómo compramos?"
        description="En el IMPLAN estamos comprometidos con la transparencia y queremos que conozcas cómo invertimos tus impuestos"
      />
      <Container maxWidth='lg'>
        <Button
          LinkComponent={MuiLink}
          href={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${licitacionesPage.data.planAdquisiciones.url}`}
          variant="outlined"
          endIcon={<OpenInNew />}
          sx={{ mt: 2 }}
          target='_blank'
        >
          Plan de adquisiciones
        </Button>
        <Box component='section' my={2}>
          <SubtitleH2 title="Proceso de compra" />
          <Typography>Al igual que tú, el IMPLAN compara opciones y presupuestos antes de realizar una compra.</Typography>
          <Grid container spacing={2} my={2}>
            {
              (licitacionesPage.data.procesoCompra as any[]).map((proceso, idx) => (
                <Grid key={idx} size={{ xs: 12, md: 4 }} sx={{ height: '100%' }}>
                  <LicitacionCard
                    procedimiento={proceso.procedimiento}
                    descripcion={proceso.descripcion}
                    idx={idx + 1}
                  />
                </Grid>
              ))
            }
          </Grid>
        </Box>

        <Box component='section' my={2}>
          <SubtitleH2 title="Licitaciones públicas" />
          <Typography mb={1}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias, ipsam porro dolore, dicta quo temporibus quisquam, mollitia suscipit quam animi ipsa fugiat alias hic aliquam? Amet molestiae laudantium nobis dicta.
          </Typography>
          
          <LicitacionesTable />
        </Box>

        <Box my={2}>
          <SubtitleH2 title="Adjudicaciones directas" />
          <Typography mb={1}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, mollitia tempora ut illum porro, odit quae nulla facere autem tempore quos aliquid expedita sapiente. Similique consequatur dolorum cum facilis mollitia!
          </Typography>
          <AdquisicionesDirectasTable adquisiciones={adquisicionesList.data} />
        </Box>
      </Container>
    </main>
  )
}