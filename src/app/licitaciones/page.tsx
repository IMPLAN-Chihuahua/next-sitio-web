import { Box, Button, Container, Divider, Grid, Link as MuiLink, TextField, Typography } from "@mui/material";
import PageBanner from "../components/PageBanner";
import LicitacionesTable from "./components/LicitacionesTable";
import qs from 'qs';
import LicitacionCard from "./components/LicitacionCard";
import { SubtitleH2 } from "../components/Titles";
import AdquisicionesDirectasTable from "./components/AdquisicionesDirectasTable";
import { AdquisicionDirecta, Licitacion, LicitacionPage, Subasta } from "./definitions";
import { OpenInNew } from "@mui/icons-material";
import { format, formatISO } from "date-fns";
import { SubastasTable } from "./components/SubastasTable";


const queryForPage = qs.stringify({
  populate: '*'
})

const queryForAdquisiciones = qs.stringify({
  populate: '*',
  filters: {
    $and: [{
      fechaResolucion: {
        $gte: formatISO(new Date(new Date().getFullYear(), 0, 1), { representation: 'date' }),
        $lte: formatISO(new Date(new Date().getFullYear(), 11, 31), { representation: 'date' })
      }
    }]
  }
}, {
  encodeValuesOnly: true
})

const queryForSubastas = qs.stringify({
  populate: '*',
  filters: {
    $and: [{
      createdAt: {
        $gte: formatISO(new Date(new Date().getFullYear(), 0, 1), { representation: 'date' }),
        $lte: formatISO(new Date(new Date().getFullYear(), 11, 31), { representation: 'date' })
      }
    }]
  }
}, { encodeValuesOnly: true })


export default async function LicitacionesPage() {
  const pageReq = await fetch(`${process.env.NEXT_PUBLIC_IMPLAN_CMS}/licitaciones-page?${queryForPage}`);
  const adquisicionesReq = await fetch(`${process.env.NEXT_PUBLIC_IMPLAN_CMS}/adquisiciones-directas?${queryForAdquisiciones}`)
  const subastasReq = await fetch(`${process.env.NEXT_PUBLIC_IMPLAN_CMS}/subastas?${queryForSubastas}`)

  const licitacionesPage: { data: LicitacionPage } = await pageReq.json();
  const adquisicionesList: { data: AdquisicionDirecta[] } = await adquisicionesReq.json();
  const { data: subastas }: { data: Subasta[] } = await subastasReq.json();

  return (
    <main>
      <PageBanner
        cover={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${licitacionesPage.data.cover.url}`}
        title="¿Cómo compramos?"
        description="En el IMPLAN estamos comprometidos con la transparencia y queremos que conozcas cómo invertimos tus impuestos"
      />
      <Container sx={{ my: 3 }}>
        <Button
          LinkComponent={MuiLink}
          href={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${licitacionesPage.data.planAdquisiciones.url}`}
          variant="outlined"
          endIcon={<OpenInNew />}
          sx={{ mt: 2, fontWeight: 500, color: 'primary.800' }}
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
                <Grid key={idx} size={{ xs: 12, sm: 6, md: 4 }}>
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
          <LicitacionesTable />
        </Box>

        <Box component={'section'} my={2}>
          <SubtitleH2 title="Adjudicaciones directas" />
          <AdquisicionesDirectasTable adquisiciones={adquisicionesList.data} />
        </Box>


        <Box my={2} component={'section'}>
          <SubtitleH2 title="Subastas" />
          <SubastasTable subastas={subastas} />
        </Box>
      </Container>
    </main>
  )
}