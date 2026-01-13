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
      'objetivos.especificos'
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
        <Divider sx={{ my: 3 }} />
        <ContentSection contenido={page.data.contenido} />
        <ObjetivosSection objetivos={page.data.objetivos} />
        <ArchivosAdjuntosSection archivosAdjuntos={page.data.archivosAdjuntos} />
        <AcercaDeSection categoria={page.data.categoria} ficha={page.data.ficha} />
      </Container>
    </Box >
  )
}



const HeaderSection = ({ nombre, categoria, ficha }: { nombre: string, categoria: string, ficha: FichaTrabajoPlaneacion }) => {
  return (
    <Box component='section'>
      <TrabajoPageBreadcrumbs currentPageTitle={nombre} />
      <Typography component={'h1'} mt={3} mb={1} fontWeight={600} fontSize={36}>{nombre}</Typography>
      <Typography mb={3} color='primary.700' fontSize={16} fontWeight={600}>{categoria} • {ficha.anio}</Typography>
      <FichaSummary ficha={ficha} />
    </Box>
  )
}



const FichaSummary = ({ ficha }: { ficha: FichaTrabajoPlaneacion }) => {
  return (
    <Grid container sx={{ my: { xs: 2.5, md: 4.5 } }} columnSpacing={3}>
      <Grid size={{ xs: 12, md: 3 }}>
        <Typography fontSize={15} fontWeight={600} color='primary.800'>Inversión</Typography>
        <Typography variant='body2'>{
          ficha.inversion
            ? getFormattedInversion(ficha.inversion)
            : ficha.esDesarrolloInterno
              ? 'Desarrollo interno'
              : 'Inversión: Ninguno'
        }</Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 3.5 }} mt={{ xs: 2, md: 0 }}>
        <Typography fontSize={15} fontWeight={600} color='primary.800'>Colaboradores</Typography>
        <Typography variant="body2">
          {
            ficha.colaboradoresExternos.length > 0
              ? ficha.colaboradoresExternos.map(colaborador => `${colaborador.nombre} ${colaborador.acronimo ? `(${colaborador.acronimo})` : ''}`).join(', ')
              : 'No establecido'
          }
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 3.5 }} mt={{ xs: 2, md: 0 }}>
        <Typography fontSize={15} fontWeight={600} color='primary.800'>Clasificación</Typography>
        {
          ficha.clasificaciones.length > 0
            ? ficha.clasificaciones.map(clasificacion => (
              <ClasificacionSpan clasificacion={clasificacion} key={clasificacion.documentId} />
            ))
            : 'No establecido'
        }
      </Grid>
      <Grid size={{ xs: 12, md: 2 }} mt={{ xs: 2, md: 0 }}>
        <Typography fontSize={15} fontWeight={600} color='primary.800'>Compartir</Typography>
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
        src={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${cover.url}`}
        height={0}
        width={0}
        alt={cover.alternativeText ?? ''}
        unoptimized
        style={{
          width: 'auto',
          height: '100%',
          objectFit: 'contain',
          userSelect: 'none'
        }}
      />
      <Typography variant="caption" my={1}>Imagen: {cover.caption}</Typography>
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
            // TODO: Agregar carousel component
            p: props => <Typography mb={1.3}>{props.children}</Typography>,
            a: props => <MuiLink href={props.href}>{props.children}</MuiLink>,
            li: props => <Typography component={'li'} ml={2}>{props.children}</Typography>,
            LocalVideo: props => (<Box>
              <video width='100%' height='auto' controls disablePictureInPicture>
                <source src={props.src} type={props.type}></source>
              </video>
              <Typography variant="caption" textAlign='center' display='block' mb={1}>Video: {props.caption}</Typography>
            </Box>)
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
      <Typography component={'h3'} mb={1} fontSize={20} fontWeight={500} color='primary.800'>General</Typography>
      <Box bgcolor={'primary.200'} p={3}>
        <Suspense fallback={<CircularProgress />}>
          <MDXRemote
            source={objetivos.general}
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
        </ol>
      </Box>
    </Box>
  )
}



const ArchivosAdjuntosSection = ({ archivosAdjuntos }: { archivosAdjuntos: MultipleMedia | null }) => {
  if (!archivosAdjuntos) {
    return null;
  }

  return (
    <Box component='section' my={4}>
      <Typography component={'h2'} fontSize={24} fontWeight={500}>Archivos adjuntos</Typography>
      <ul style={{ listStyle: 'none' }}>
        {
          archivosAdjuntos.map((adjunto) => (
            <li key={adjunto.documentId} style={{ display: 'flex', alignItems: 'center', marginTop: '5px', marginBottom: '5px' }}>
              <Typography>
                {adjunto.caption}: <MuiLink target="_blank" href={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${adjunto.url}`}>{adjunto.name}</MuiLink>
              </Typography>
            </li>
          ))
        }
      </ul>
    </Box>
  )
}



const AcercaDeSection = ({ categoria, ficha }: { categoria: string, ficha: FichaTrabajoPlaneacion }) => {

  return (
    <Box component='section' my={4}>
      <Typography component={'h2'} fontSize={24} fontWeight={500}>Acerca de</Typography>
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
                <Typography>{ficha.localizacion}</Typography>
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
                      : 'No definido'}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}