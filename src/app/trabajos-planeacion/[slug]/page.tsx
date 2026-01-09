import { SubtitleH2 } from "@/app/components/Titles";
import { Box, Breadcrumbs, CircularProgress, Container, Divider, Grid, IconButton, Link as MuiLink, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import Link from "next/link";
import qs from 'querystring';
import { Suspense } from "react";
import { TrabajoPageBreadcrumbs } from "../components/Breadcrumbs";
import { TrabajoPlaneacion } from "../definitions";
import { ClasificacionSpan, getFormattedInversion } from "../components/Tile";
import Image from "next/image";
import { Email, Instagram, LinkedIn } from "@mui/icons-material";
import LinkIcon from '@mui/icons-material/Link';
import { blue, teal } from "@mui/material/colors";



export default async function EstudioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const queryParams = qs.stringify({
    populate: [
      'cover',
      'archivosAdjuntos',
      'ficha.departamentosAsignados',
      'ficha.clasificaciones',
      'ficha.colaboradoresExternos',
      'objetivos.general',
      'objetivos.especificos'
    ]
  })
  const req = await fetch(`${process.env.NEXT_PUBLIC_IMPLAN_CMS}/trabajos-planeacion/${slug}?${queryParams.toString()}`)
  const page: { data: TrabajoPlaneacion } = await req.json();

  return (
    <Box component={'main'}>
      <Toolbar variant="dense" />
      <Container sx={{ mt: 3 }}>

        <TrabajoPageBreadcrumbs currentPageTitle={page.data.nombre} />
        <Typography component={'h1'} mt={3} mb={1} fontWeight={600} fontSize={36}>{page.data.nombre}</Typography>
        <Typography mb={3} color='primary.700' fontSize={16} fontWeight={600}>{page.data.categoria} • {page.data.ficha.anio}</Typography>
        <Grid container sx={{ my: { xs: 2.5, md: 4.5 } }} columnSpacing={3}>
          <Grid size={{ xs: 12, md: 2 }}>
            <Typography fontSize={15} fontWeight={600} color='primary.800'>Inversión</Typography>
            <Typography variant='body2'>{
              page.data.ficha.inversion
                ? getFormattedInversion(page.data.ficha.inversion)
                : page.data.ficha.esDesarrolloInterno
                  ? 'Desarrollo interno'
                  : 'Inversión: Ninguno'
            }</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }} mt={{ xs: 2, md: 0 }}>
            <Typography fontSize={15} fontWeight={600} color='primary.800'>Colaboradores</Typography>
            <Typography variant="body2">
              {page.data.ficha.colaboradoresExternos.map(colaborador => `${colaborador.nombre} ${colaborador.acronimo ? `(${colaborador.acronimo})` : ''}`).join(', ')}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }} mt={{ xs: 2, md: 0 }}>
            <Typography fontSize={15} fontWeight={600} color='primary.800'>Clasificación</Typography>
            {page.data.ficha.clasificaciones.map(clasificacion => (
              <ClasificacionSpan clasificacion={clasificacion} key={clasificacion.documentId} />
            ))}
          </Grid>
          <Grid size={{ xs: 12, md: 3 }} mt={{ xs: 2, md: 0 }}>
            <Typography fontSize={15} fontWeight={600} color='primary.800'>Compartir</Typography>
            <Stack direction={'row'}>
              <IconButton size="large">
                <LinkIcon />
              </IconButton>
              <IconButton size="large">
                <LinkedIn />
              </IconButton>
              <IconButton size="large">
                <Email />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
        {page.data.cover && (
          <Box
            height={550}
            width={'100%'}
            mt={2}
            mb={1}
            position={'relative'}
            overflow={'hidden'}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${page.data.cover.url}`}
              height={0}
              width={0}
              alt={page.data.cover.alternativeText ?? ''}
              unoptimized
              style={{
                width: 'auto',
                height: '100%',
                objectFit: 'contain',
                userSelect: 'none'
              }}
            />
            <Typography variant="caption" mt={1}>{page.data.cover.caption}</Typography>
          </Box>

        )}

        <Divider sx={{ my: 3 }} />
        <Box my={4}>
          <Suspense fallback={<CircularProgress />}>
            <MDXRemote
              source={page.data.contenido}
              components={{
                p: props => <Typography mb={1.3}>{props.children}</Typography>
              }}
            />
          </Suspense>
        </Box>
        <Box my={4}>
          <Typography component={'h2'} fontSize={24} my={1} fontWeight={500}>Objetivos</Typography>
          <Typography component={'h3'} mb={1} fontSize={20} fontWeight={500} color='primary.800'>General</Typography>
          <Box bgcolor={'primary.200'} p={3}>
            <Suspense fallback={<CircularProgress />}>
              <MDXRemote
                source={page.data.objetivos.general}
                components={{
                  p: props => <Typography textAlign={'center'}>{props.children}</Typography>
                }}
              />
            </Suspense>
          </Box>
          <Box mt={2}>
            <Typography component={'h3'} mb={1} fontSize={20} fontWeight={500} color='primary.800'>Específicos</Typography>
            <ol style={{ marginLeft: '20px' }}>
              {
                page.data.objetivos.especificos.map(especifico => (
                  <MDXRemote
                    source={especifico.descripcion}
                    key={especifico.id}
                    components={{
                      p: props => <li style={{ marginBottom: '5px' }}><Typography>{props.children}</Typography></li>,
                      a: props => <MuiLink target={'_blank'} href={props.href}>{props.children}</MuiLink>
                    }}
                  />
                ))
              }
            </ol>
          </Box>
        </Box>
        <Box my={4}>
          <Typography component={'h2'} fontSize={24} fontWeight={500}>Archivos adjuntos</Typography>
          <ul style={{ listStyle: 'none' }}>
            {
              page.data.archivosAdjuntos.map((adjunto) => (
                <li key={adjunto.documentId} style={{ display: 'flex', alignItems: 'center', marginTop: '5px', marginBottom: '5px' }}>
                  <Typography fontWeight={500}>{adjunto.caption}:</Typography>
                  <MuiLink target="_blank" ml={3} href={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${adjunto.url}`}>{adjunto.name}</MuiLink>
                </li>
              ))
            }
          </ul>
        </Box>
        <Box my={4}>
          <Typography component={'h2'} fontSize={24} fontWeight={500}>Acerca de</Typography>
          <TableContainer style={{ maxWidth: '900px' }}>
            <Table aria-label={`Metadatos del ${page.data.categoria.toLowerCase()}`}>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ width: { md: '250px' } }}>
                    <Typography fontWeight={500}>Código</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography>{page.data.ficha.codigo}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow sx={{ bgcolor: 'primary.100' }}>
                  <TableCell sx={{ width: { md: '250px' } }}>
                    <Typography fontWeight={500}>Departamentos asignados</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography>{page.data.ficha.departamentosAsignados.map(d => d.nombre).join(', ')}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ width: { md: '250px' } }}>
                    <Typography fontWeight={500}>Periodicidad</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography>{page.data.ficha.periodicidad}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow sx={{ bgcolor: 'primary.100' }}>
                  <TableCell sx={{ width: { md: '250px' } }}>
                    <Typography fontWeight={500}>Localización</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography>{page.data.ficha.localizacion}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ width: { md: '250px' } }}>
                    <Typography fontWeight={500}>Superficie</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography>{page.data.ficha.superficieM2}</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </Box >
  )
}