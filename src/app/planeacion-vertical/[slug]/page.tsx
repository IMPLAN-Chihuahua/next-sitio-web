import { Box, CircularProgress, Container, Grid, Toolbar, Typography, Link as MuiLink, Divider, Card, CardMedia, CardContent, Stack, Paper, Alert, AlertTitle, Chip } from "@mui/material";
import qs from 'qs'
import { InstrumentoDetailPageBreadcrumbs } from "../components/InstrumentoBreadcrumbs";
import { InstrumentoPlaneacion } from "../definitions";
import Image from "next/image";
import { parseISO } from "date-fns";
import { ShareOptions } from "@/app/estudios-y-propuestas/components/ShareOptions";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { Suspense } from "react";
import CartografiaCard from "../components/CartografiaCard";
import DiagramaPlaneacion from "../components/DiagramaPlaneacion";
import { filesize } from "filesize";
import { ArchiveOutlined, Landscape, StarBorderOutlined } from "@mui/icons-material";


export default async function InstrumentoPlaneacionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const queryParams = qs.stringify({
    populate: [
      'datosGeograficos',
      'datosGeograficos.cover',
      'cover',
      'tema',
      'archivosAdjuntos',
    ]
  }, { encodeValuesOnly: true });

  const req = await fetch(`${process.env.NEXT_PUBLIC_IMPLAN_CMS}/instrumentos-planeacion/${slug}?${queryParams.toString()}`)
  const page: { data: InstrumentoPlaneacion } = await req.json();

  return (
    <Box minHeight={'90vh'}>
      <Toolbar variant="dense" />
      <Container sx={{ my: 3 }}>
        <InstrumentoDetailPageBreadcrumbs currentPageTitle={page.data.nombre} />
        <DiagramaPlaneacion />
        <Grid container my={4} spacing={2}>
          <Grid height={490} maxWidth={'450px'} position={'relative'} size={{ xs: 12, md: 4 }} display={'flex'} marginX={'auto'}>
            {
              page.data.cover
                ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${page.data.cover.url}`}
                    layout="fill"
                    objectFit="contain"
                    unoptimized
                    alt=''
                  />
                ) : (
                  <Box
                    width={'100%'}
                    bgcolor={'primary.300'}
                    display='flex'
                    justifyContent={'center'}
                    alignItems={'center'}
                  >
                    <Landscape
                      sx={{
                        fontSize: 80,
                        color: 'primary.600'
                      }} />
                  </Box>
                )
            }

          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography component={'h1'} fontWeight={600} fontSize={36}>{page.data.nombre}</Typography>
            <Typography color='primary.600' fontSize={16} fontWeight={600}>{page.data.tema.descripcion}</Typography>
            <Stack direction="row" spacing={1} mt={1}>
              {page.data.destacado && (
                <Chip
                  icon={<StarBorderOutlined sx={{ fontSize: '16px !important' }} />}
                  label="Destacado"
                  size="small"
                  sx={{
                    border: '1px solid #fbc02d',
                    color: '#b8860b',
                    backgroundColor: '#fffde7',
                    fontWeight: 500,
                  }}
                />
              )}
              {!page.data.vigente && (
                <Chip
                  icon={<ArchiveOutlined sx={{ fontSize: '16px !important' }} />}
                  label="Histórico"
                  size="small"
                  title="Documento histórico. Su contenido puede estar desactualizado o haber sido reemplazado por una versión más reciente."
                  sx={{
                    border: '1px solid #ccc',
                    color: '#777',
                    backgroundColor: '#f5f5f5',
                    fontWeight: 500,
                    cursor: 'default',
                  }}
                />
              )}
            </Stack>
            <Typography fontWeight={500} mt={1}>
              Publicado el {
                page.data.fechaAprobacion !== null
                  ? parseISO(page.data.fechaAprobacion).toLocaleDateString('es-MX', { dateStyle: 'long' })
                  : page.data.anioPublicacion.toString() ?? ''}
              {
                page.data.publicadoEn !== null
                  ? ` • ${page.data.publicadoEn} ${page.data.acercaDePublicacion ?? ''}`
                  : ''
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
              ul: props => <ul style={{ marginLeft: '15px' }}>{props.children}</ul>,
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
            <Box component={'section'} my={3}>
              <Typography component={'h2'} fontSize={24} fontWeight={600} mb={1}>Datos geográficos</Typography>
              <Grid container spacing={2} flexWrap={'wrap'}>
                {
                  page.data.datosGeograficos.map((capa) => (
                    <CartografiaCard capa={capa} key={capa.documentId} />
                  ))
                }
              </Grid>
            </Box>
          )
        }
        {
          page.data.archivosAdjuntos && page.data.archivosAdjuntos.length > 0 && (
            <Box component={'section'} my={3}>
              <Typography component={'h2'} fontSize={24} fontWeight={600} mb={1}>Archivos descargables</Typography>
              <ul style={{ listStyle: 'none' }}>
                {
                  page.data.archivosAdjuntos.map((archivo, idx) => (
                    <li key={archivo.documentId}>
                      <MuiLink
                        target='_blank'
                        href={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${archivo.url}`}>{
                          `${archivo.caption ? `${archivo.caption} • ${archivo.ext.substring(1)}` : archivo.name} (${filesize(archivo.size * 1000, { standard: 'jedec' })})`
                        }</MuiLink>
                    </li>
                  ))
                }
              </ul>
            </Box>
          )
        }
      </Container>
    </Box>
  )
}