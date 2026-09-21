import {
  Box, Button, Container, Grid, Link as MuiLink, Typography,
  Accordion, AccordionSummary, AccordionDetails,
  Toolbar
} from "@mui/material";
import PageBanner from "../components/PageBanner";
import LicitacionesTable from "./components/LicitacionesTable";
import qs from 'qs';
import LicitacionCard from "./components/LicitacionCard";
import { SubtitleH2, TitleH1 } from "../components/Titles";
import AdquisicionesDirectasTable from "./components/AdquisicionesDirectasTable";
import { AdquisicionDirecta, LicitacionPage, Subasta } from "./definitions";
import { OpenInNew, ExpandMore } from "@mui/icons-material";
import { formatISO } from "date-fns";
import { SubastasTable } from "./components/SubastasTable";
import { visuallyHidden } from '@mui/utils';
import { TransparenciaBreadcrumbs } from "../transparencia/components/Breadcrumbs";

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
  const planesAnuales = licitacionesPage.data?.planesAnuales || [];
  const planesOrdenados = [...planesAnuales].sort((a, b) => b.year - a.year);

  const planMasReciente = planesOrdenados[0];

  return (
    <>
      <Toolbar variant="dense" />
      <Container sx={{ my: 3 }}>
        <TransparenciaBreadcrumbs currentPageTitle="Adquisiciones" />

        
        <Box component='section' my={2}>
          <Typography variant='h1' gutterBottom>Adquisiciones</Typography>
          {planMasReciente && planMasReciente.document && (
          <Button
            LinkComponent={MuiLink}
            href={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${planMasReciente.document.url}`}
            variant="outlined"
            endIcon={<OpenInNew />}
            sx={{ mb: 2, fontWeight: 600 }}
            size="large"
            target='_blank'
          >
            Plan de adquisiciones {planMasReciente.year}
          </Button>
        )}
          <Typography variant='h2'>Proceso de compra</Typography>
          <Typography>Al igual que tú, el IMPLAN compara opciones y presupuestos antes de realizar una compra.</Typography>
          <Typography component="h2" sx={visuallyHidden}>
            Pasos del proceso
          </Typography>
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
        {planesOrdenados.length > 1 && (
          <Box my={4} component={'section'}>
            <Accordion variant="outlined" sx={{ borderRadius: 1 }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6" component={'h4'} sx={{ fontWeight: 600 }}>
                  Historial de Planes de Adquisición
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  {planesOrdenados.map((plan) => (
                    plan.document && (
                      <Grid size={{ xs: 12, sm: 4, md: 3 }} key={plan.id}>
                        <Button
                          fullWidth
                          variant="outlined"
                          color="primary"
                          endIcon={<OpenInNew />}
                          href={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${plan.document.url}`}
                          target="_blank"
                        >
                          Plan {plan.year}
                        </Button>
                      </Grid>
                    )
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Box>
        )}

      </Container>
    </>
  )
}