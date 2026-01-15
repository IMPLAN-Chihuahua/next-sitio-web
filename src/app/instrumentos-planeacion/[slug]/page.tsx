import { Box, CircularProgress, Container, Grid, Toolbar, Typography, Link as MuiLink, Divider } from "@mui/material";
import qs from 'qs'
import { InstrumentoDetailPageBreadcrumbs } from "../components/InstrumentoBreadcrumbs";
import { InstrumentoPlaneacion } from "../definitions";
import Image from "next/image";
import { parseISO, parseJSON } from "date-fns";
import { ShareOptions } from "@/app/estudios-y-proyectos/components/ShareOptions";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { Suspense } from "react";
import { SubtitleH2 } from "@/app/components/Titles";


export default async function InstrumentoPlaneacionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const queryParams = qs.stringify({
    populate: [
      'cover',
      'archivosAdjuntos',
      'tema'
    ]
  }, { encodeValuesOnly: true });

  const req = await fetch(`${process.env.NEXT_PUBLIC_IMPLAN_CMS}/instrumentos-planeacion/${slug}?${queryParams.toString()}]`)
  const page: { data: InstrumentoPlaneacion } = await req.json();

  return (
    <main>
      <Toolbar variant="dense" />
      <Container sx={{ mt: 3 }}>
        <InstrumentoDetailPageBreadcrumbs currentPageTitle={page.data.nombre} />
        <Grid container my={4} spacing={2}>
          <Grid size={{ xs: 12, md: 4 }} display={'flex'} justifyContent={{ md: 'flex-start', xs: 'center' }}>
            <Image
              src={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${page.data.cover.url}`}
              height={450}
              width={350}
              unoptimized
              alt=''
            />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography component={'h1'} fontWeight={600} fontSize={36}>{page.data.nombre}</Typography>
            <Typography fontWeight={500}>
              {page.data.publicadoEn !== null ? 'Aprobado' : 'Publicado'} el {
                parseISO(page.data.fechaAprobacion).toLocaleDateString('es-MX', { dateStyle: 'long' })}{
                page.data.publicadoEn !== null ? ` • ${page.data.publicadoEn} ${page.data.acercaDePublicacion || ''}` : ''
              }</Typography>
            <Typography mt={2}>{page.data.descripcion}</Typography>
            <Typography mt={3} fontSize={15} fontWeight={600} color='primary.800'>Compartir</Typography>
            <ShareOptions />
          </Grid>
        </Grid>
        <Divider />
        <Suspense fallback={<CircularProgress />}>
          <MDXRemote
            source={page.data.contenido}
            components={{
              p: props => <Typography mt={2}>{props.children}</Typography>,
              h2: props => <Typography variant="h2" fontSize={24} mt={2.5} mb={1} fontWeight={600}>{props.children}</Typography>,
              h3: props => <Typography variant="h3" fontSize={20} mt={1.5} mb={.5} fontWeight={500}>{props.children}</Typography>,
              ul: props => <ul style={{ listStyle: 'none' }}>{props.children}</ul>,
              li: props => <li style={{ paddingTop: '2px', paddingBottom: '2px' }}>{props.children}</li>,
              a: props => <MuiLink href={props.href} target='_blank'>{props.children}</MuiLink>
            }}
          />
        </Suspense>
        <Box component={'section'} mt={3}>
          <Typography component={'h2'} fontSize={24} fontWeight={600}>Cartografía</Typography>
        </Box>
      </Container>
    </main>
  )
}