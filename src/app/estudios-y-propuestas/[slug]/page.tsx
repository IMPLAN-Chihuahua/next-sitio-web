import { Box, CircularProgress, Container, Divider, Grid, Link as MuiLink, Table, TableBody, TableCell, TableContainer, TableRow, Toolbar, Typography } from "@mui/material";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import qs from 'qs';
import { Suspense } from "react";
import { TrabajoPageBreadcrumbs } from "../components/Breadcrumbs";
import { FichaTrabajoPlaneacion, ObjetivosEstudio, TrabajoPlaneacion } from "../definitions";
import { ClasificacionSpan, getFormattedInversion } from "../components/Tile";
import Image from "next/image";
import { Media, MultipleMedia } from "@/app/definitions";
import { ShareOptions } from "../components/ShareOptions";
import { Metadata } from "next";
import { filesize } from "filesize";
import Carousel, { Slide } from "../components/Carousel";
import { ImagesMasonry } from "@/app/editorial/components/Masonry";


type DetailPageMetadataProps = {
  params: Promise<{ slug: string }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}


export async function generateMetadata({ params, searchParams }: DetailPageMetadataProps): Promise<Metadata> {
  const queryParams = qs.stringify({
    fields: ['nombre', 'cover', 'resumen'],
    populate: ['cover']
  }, {
    indices: true
  })
  try {

    const slug = (await params).slug;
    const page = await fetch(`${process.env.NEXT_PUBLIC_IMPLAN_CMS}/trabajos-planeacion/${slug}?${queryParams.toString()}`)
    const json: { data: Pick<TrabajoPlaneacion, 'nombre' | 'cover' | 'resumen'> } = await page.json();
    const imageUrl = json.data.cover?.formats?.small?.url || json.data.cover?.url;
    const images = imageUrl ? [imageUrl] : []
    return {
      title: `${json.data.nombre} | IMPLAN`,
      description: json.data.resumen,
      openGraph: {
        images
      }
    }
  } catch (err) {
    return {
      title: 'Trabajo de planeación | IMPLAN'
    }
  }
}




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
      'objetivos.especificos',
      'galeriaFotografica'
    ]
  })
  const req = await fetch(`${process.env.NEXT_PUBLIC_IMPLAN_CMS}/trabajos-planeacion/${slug}?${queryParams.toString()}`)
  const page: { data: TrabajoPlaneacion } = await req.json();

  return (
    <Box component={'main'}>
      <Toolbar variant="dense" />
      <Container sx={{ mt: 3 }}>
        <HeaderSection
          nombre={page.data.nombre}
          categoria={page.data.categoria}
          ficha={page.data.ficha}
        />
        <CoverImage cover={page.data.cover} />
        <FichaSummary ficha={page.data.ficha} />
        <Divider sx={{ my: 3 }} />
        <ObjetivosSection objetivos={page.data.objetivos} />
        <ContentSection contenido={page.data.contenido} />
        <ArchivosAdjuntosSection archivosAdjuntos={page.data.archivosAdjuntos} />
        {
          page.data.galeriaFotografica && page.data.galeriaFotografica.length > 0 && (
            <GaleriaFotografica images={page.data.galeriaFotografica} />
          )
        }
        <AcercaDeSection categoria={page.data.categoria} ficha={page.data.ficha} />
      </Container>
    </Box >
  )
}



const HeaderSection = ({ nombre, categoria, ficha }: { nombre: string, categoria: string, ficha: FichaTrabajoPlaneacion }) => {
  return (
    <Box component='section'>
      <TrabajoPageBreadcrumbs currentPageTitle={nombre} />
      <Typography component={'h1'} mt={3} fontWeight={600} fontSize={36}>{nombre}</Typography>
      <Typography mb={3} color='primary.700' fontSize={16} fontWeight={600}>{categoria} • {ficha.anio}</Typography>
    </Box>
  )
}



const FichaSummary = ({ ficha }: { ficha: FichaTrabajoPlaneacion }) => {
  return (
    <Grid container sx={{ my: { xs: 2.5, md: 4.5 } }} columnSpacing={3}>
      <Grid size={{ xs: 12, md: 3 }}>
        <Typography fontSize={15} mb={.7} fontWeight={600} color='primary.800'>Inversión</Typography>
        <Typography variant='body2'>{
          ficha.inversion
            ? getFormattedInversion(ficha.inversion)
            : ficha.esDesarrolloInterno
              ? 'Desarrollo interno'
              : 'Inversión: Ninguno'
        }</Typography>
        {
          ficha.helperTextInversion && <Typography variant="body2" color='textSecondary'>({ficha.helperTextInversion})</Typography>
        }
      </Grid>
      <Grid size={{ xs: 12, md: 3.5 }} mt={{ xs: 2, md: 0 }}>
        <Typography fontSize={15} mb={.7} fontWeight={600} color='primary.800'>Colaboradores</Typography>
        <Typography variant="body2">
          {
            ficha.colaboradoresExternos.length > 0
              ? ficha.colaboradoresExternos.map(colaborador => `${colaborador.nombre} ${colaborador.acronimo ? `(${colaborador.acronimo})` : ''}`).join(', ')
              : 'No establecido'
          }
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 3.5 }} mt={{ xs: 2, md: 0 }}>
        <Typography fontSize={15} mb={.7} fontWeight={600} color='primary.800'>Clasificación</Typography>
        {
          ficha.clasificaciones.length > 0
            ? ficha.clasificaciones.map(clasificacion => (
              <ClasificacionSpan clasificacion={clasificacion} key={clasificacion.documentId} />
            ))
            : 'No establecido'
        }
      </Grid>
      <Grid size={{ xs: 12, md: 2 }} mt={{ xs: 2, md: 0 }}>
        <Typography fontSize={15} mb={.7} fontWeight={600} color='primary.800'>Compartir</Typography>
        <ShareOptions />
      </Grid>
    </Grid>
  )
}



const CoverImage = ({ cover }: { cover: Media | null }) => {
  if (!cover) {
    return null;
  }

  return (
    <Box>
      <Box
        height={600}
        width={'100%'}
        mt={2}
        display={'flex'}
        justifyContent={'center'}
        overflow={'hidden'}
        borderRadius={1}
        sx={{
          ':before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${cover.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(16px) brightness(0.55)',
            transform: 'scale(1.1)',
            zIndex: 0
          }
        }}
        position={'relative'}
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${cover.url}`}
          layout='fill'
          alt={cover.alternativeText ?? ''}
          unoptimized
          style={{
            objectFit: 'contain',
            userSelect: 'none',
          }}
        />
      </Box>
      <Typography textAlign={'center'} display={'block'} variant="caption" mt={.5} mb={1}>{cover.caption}</Typography>
    </Box>
  )
}



const ContentSection = ({ contenido }: { contenido: string }) => {
  return (
    <Box component='section' my={4}>
      <Suspense fallback={<CircularProgress />}>
        <MDXRemote
          source={contenido}
          components={{
            p: props => <Typography mb={3}>{props.children}</Typography>,
            a: props => <MuiLink lineHeight={1.8} href={props.href}>{props.children}</MuiLink>,
            li: props => <Typography lineHeight={1.8} component={'li'} ml={2}>{props.children}</Typography>,
            ul: props => <Box component='ul' lineHeight={1.8} mb={1.3}>{props.children}</Box>,
            ol: props => <Box component='ol' lineHeight={1.8} mb={1.3}>{props.children}</Box>,
            h2: props => <Typography component={'h2'} fontSize={24} my={1} fontWeight={500}>{props.children}</Typography>,
            h3: props => <Typography component={'h3'} my={1} fontSize={20} fontWeight={500} color='primary.800'>{props.children}</Typography>,
            h4: props => <Typography component='h4' fontSize={18} fontWeight={600} color='primary.800'>{props.children}</Typography>,
            LocalVideo: props => (<Box>
              <video width='100%' height='auto' controls disablePictureInPicture>
                <source src={props.src} type={props.type}></source>
              </video>
              <Typography variant="caption" textAlign='center' display='block' mb={1}>Video: {props.caption}</Typography>
            </Box>),
            Carousel: props => (<Carousel>{props.children}</Carousel>),
            Slide: props => <Slide {...props} />
          }}
        />
      </Suspense>
    </Box>
  )
}



const ObjetivosSection = ({ objetivos }: { objetivos: ObjetivosEstudio | null }) => {
  if (!objetivos) {
    return null;
  }

  return (
    <Box component={'section'} my={4}>
      <Typography component={'h2'} fontSize={24} my={1} fontWeight={500}>Objetivos</Typography>
      {
        objetivos.general && (
          <>
            <Typography component={'h3'} mb={1} fontSize={20} fontWeight={500} color='primary.800'>General</Typography>
            <Box bgcolor={'primary.200'} p={3}>
              <Suspense fallback={<CircularProgress />}>
                <MDXRemote
                  source={objetivos.general}
                  components={{
                    p: props => <Typography mt={1} textAlign={'center'}>{props.children}</Typography>
                  }}
                />
              </Suspense>
            </Box>
          </>
        )
      }
      {
        objetivos.especificos.length > 0 && (
          <Box mt={2}>
            <Typography component={'h3'} mb={1} fontSize={20} fontWeight={500} color='primary.800'>Específicos</Typography>
            <Box component={'ol'} ml={5}>
              {
                objetivos.especificos.map(especifico => (
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
            </Box>
          </Box>
        )
      }
    </Box>
  )
}



const ArchivosAdjuntosSection = ({ archivosAdjuntos }: { archivosAdjuntos: MultipleMedia | null }) => {
  if (!archivosAdjuntos) {
    return null;
  }

  return (
    <Box component='section' my={4}>
      <Typography component={'h2'} fontSize={24} my={1} fontWeight={500}>Archivos adjuntos</Typography>
      <ul style={{ listStyle: 'none' }}>
        {
          archivosAdjuntos.map((adjunto) => (
            <li key={adjunto.documentId} style={{ display: 'flex', alignItems: 'center', marginTop: '5px', marginBottom: '5px' }}>
              <MuiLink
                target='_blank'
                href={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${adjunto.url}`}>{
                  `${adjunto.caption ? `${adjunto.caption} • ${adjunto.ext.substring(1)}` : adjunto.name} (${filesize(adjunto.size * 1000, { standard: 'jedec' })})`
                }</MuiLink>
            </li>
          ))
        }
      </ul>
    </Box>
  )
}



const GaleriaFotografica = (props: { images: MultipleMedia }) => {
  return (
    <Box my={4}>
      <Typography component={'h2'} fontSize={24} my={1} fontWeight={500}>Galería fotográfica</Typography>
      <ImagesMasonry images={props.images} />
    </Box>
  )
}



const AcercaDeSection = ({ categoria, ficha }: { categoria: string, ficha: FichaTrabajoPlaneacion }) => {

  return (
    <Box component='section' my={4}>
      <Typography component={'h2'} fontSize={24} my={1} fontWeight={500}>Acerca de</Typography>
      <TableContainer style={{ maxWidth: '900px' }}>
        <Table aria-label={`Metadatos del ${categoria.toLowerCase()}`}>
          <TableBody>
            <TableRow>
              <TableCell sx={{ width: { md: '250px' } }}>
                <Typography fontWeight={500}>Código</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography>{ficha.codigo}</Typography>
              </TableCell>
            </TableRow>
            <TableRow sx={{ bgcolor: 'primary.100' }}>
              <TableCell sx={{ width: { md: '250px' } }}>
                <Typography fontWeight={500}>Departamentos asignados</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography>{
                  ficha.departamentosAsignados.length > 0
                    ? ficha.departamentosAsignados.map(d => d.nombre).join(', ')
                    : 'No establecido'
                }</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: { md: '250px' } }}>
                <Typography fontWeight={500}>Periodicidad</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography>{ficha.periodicidad}</Typography>
              </TableCell>
            </TableRow>
            <TableRow sx={{ bgcolor: 'primary.100' }}>
              <TableCell sx={{ width: { md: '250px' } }}>
                <Typography fontWeight={500}>Localización</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography>{ficha.localizacion ? ficha.localizacion : 'No establecida'}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: { md: '250px' } }}>
                <Typography fontWeight={500}>Superficie</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography>{
                  ficha.superficieM2
                    ? `${new Intl.NumberFormat().format(ficha.superficieM2)} m²`
                    : ficha.superficieHas
                      ? `${new Intl.NumberFormat().format(ficha.superficieHas)} has`
                      : 'No establecida'}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}