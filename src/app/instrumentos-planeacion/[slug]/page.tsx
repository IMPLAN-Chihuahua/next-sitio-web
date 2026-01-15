import { Box, CircularProgress, Container, Grid, Toolbar, Typography, Link as MuiLink, Divider, Card, CardMedia, CardContent, Stack, Paper, Alert, AlertTitle } from "@mui/material";
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
      'datosGeograficos',
      'datosGeograficos.cover',
      'cover',
      'temaDatosAbiertos',
      'archivosAdjuntos',
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
          <Grid height={490} maxWidth={'450px'} position={'relative'} size={{ xs: 12, md: 4 }} display={'flex'} marginX={'auto'}>
            <Image
              src={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${page.data.cover.url}`}
              layout="fill"
              objectFit="cover"
              unoptimized
              alt=''
            />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography component={'h1'} fontWeight={600} fontSize={36}>{page.data.nombre}</Typography>
            <Typography color='primary.600' fontSize={16} fontWeight={600}>{page.data.temaDatosAbiertos.tema}</Typography>
            <Typography fontWeight={500} mt={1}>
              {page.data.publicadoEn !== null ? 'Aprobado' : 'Publicado'} el {
                parseISO(page.data.fechaAprobacion).toLocaleDateString('es-MX', { dateStyle: 'long' })}{
                page.data.publicadoEn !== null ? ` • ${page.data.publicadoEn} ${page.data.acercaDePublicacion || ''}` : ''
              }</Typography>
            <Typography mt={2}>{page.data.descripcion}</Typography>
            <Typography mt={3} fontSize={15} fontWeight={600} color='primary.800'>Compartir</Typography>
            <ShareOptions />
          </Grid>
        </Grid>
        <Divider sx={{ mb: 3 }} />
        <Suspense fallback={<CircularProgress />}>
          <MDXRemote
            source={page.data.contenido}
            components={{
              p: props => <Typography mb={2} color='inherit' sx={{ wordBreak: 'break-word' }}>{props.children}</Typography>,
              h2: props => <Typography variant="h2" fontSize={24} mt={2.5} mb={1} fontWeight={600}>{props.children}</Typography>,
              h3: props => <Typography variant="h3" fontSize={20} mt={1.5} mb={.5} fontWeight={500}>{props.children}</Typography>,
              ul: props => <ul style={{ listStyle: 'none' }}>{props.children}</ul>,
              li: props => <li style={{ paddingTop: '2px', paddingBottom: '2px' }}>{props.children}</li>,
              a: props => <MuiLink href={props.href} target='_blank'>{props.children}</MuiLink>,
              Alert: props => (<Alert sx={{ my: 2 }} severity={props?.severity || 'info'}>
                <AlertTitle color="inherit">{props.title}</AlertTitle>
                {props.children}
              </Alert>
              )
            }}
          />
        </Suspense>
        {
          page.data.datosGeograficos.length > 0 && (
            <Box component={'section'} mt={3}>
              <Typography component={'h2'} fontSize={24} fontWeight={600} mb={1}>Datos geográficos</Typography>
              <Grid container spacing={2} flexWrap={'wrap'}>
                {
                  page.data.datosGeograficos.map((capa) => (
                    <Grid size={{ xs: 12, sm: 4, md: 3 }} key={capa.documentId}>
                      <Card sx={{ maxWidth: { xs: '100%', sm: '300px' } }} variant="outlined">
                        <CardMedia
                          sx={{ height: { xs: '270px', md: '240px' }, maxHeight: { xs: '270px', md: '240px' } }}
                          image={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${capa.cover?.formats?.small?.url || capa.cover.url}`} />
                        <CardContent sx={{ minHeight: { xs: '80px', sm: '115px' } }}>
                          <Typography
                            sx={{
                              textDecoration: 'none',
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              wordBreak: 'break-word',
                              overflow: 'hidden'
                            }}
                          >{capa.objetoGeografico}</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))
                }
              </Grid>
            </Box>
          )
        }
      </Container>
    </main >
  )
}