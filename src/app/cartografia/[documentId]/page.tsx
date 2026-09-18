
import { Box, Container, Grid, Table, TableBody, TableCell, TableContainer, Link as MuiLink, TableRow, Toolbar, Typography } from "@mui/material";
import qs from 'qs'
import CartografiaDetailPageBreadcrumbs from "../components/CartografiaDetailPageBreadcrumbs";
import { ShareOptions } from "@/app/estudios-y-propuestas/components/ShareOptions";
import Image from "next/image";
import { filesize } from 'filesize'
import { DatoGeografico } from "../definitions";




export default async function CartografiaDetailPage({ params }: { params: Promise<{ documentId: string }> }) {
  const { documentId } = await params;

  const queryParams = qs.stringify({
    populate: ['grupoCartografia', 'cover', 'tema', 'archivosDescargables']
  })
  const req = await fetch(`${process.env.NEXT_PUBLIC_IMPLAN_CMS}/datos-geograficos/${documentId}?${queryParams.toString()}`)
  const page: { data: DatoGeografico } = await req.json();

  return (
    <>
      <Toolbar variant="dense" />
      <Container sx={{ my: 3 }}>
        <CartografiaDetailPageBreadcrumbs currentPageTitle={page.data.objetoGeografico} />
        <Typography variant='h1' gutterBottom>{page.data.objetoGeografico}</Typography>
        <Typography mb={3} color='primary.700' fontSize={17} fontWeight={600}>{page.data.tema.descripcion} • {page.data.edicion}</Typography>
        <Typography sx={{ fontSize: '1.15rem', lineHeight: 1.5 }}>
          {
            page.data.descripcion
          }
        </Typography>
        <Box mt={1} mb={3}>
          <Typography fontSize={17} mb={.7} fontWeight={600} color='primary.800'>
            Compartir
          </Typography>
          <ShareOptions />
        </Box>

        <Box component={'section'} my={3}>
          <Typography variant={'h2'}>Acerca de</Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 5 }}>
              <Box
                height={550}
                width={'100%'}
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
                <Typography variant="caption" my={1}>Imagen: {page.data.cover.caption}</Typography>
              </Box>
            </Grid>
            <Grid size={'grow'}>
              <TableContainer>
                <Table aria-label={`Datos acerca de ${page.data.objetoGeografico}`}>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Typography fontWeight={500}>Grupo</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{page.data.grupoCartografia.grupo}</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography fontWeight={500}>Geometría</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{page.data.geometria}</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography fontWeight={500}>Escala</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{page.data.escala}</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography fontWeight={500}>DATUM</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{page.data.datum}</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography fontWeight={500}>Proyección</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{page.data.proyeccion}</Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Box>

        <Box component='section' my={3}>
          <Typography variant={'h2'}>Archivos descargables</Typography>
          <ul style={{ marginLeft: '1rem' }}>
            {
              page.data.archivosDescargables.map((archivo, idx) => (
                <li key={archivo.documentId}>
                  <MuiLink
                    href={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${archivo.url}`}>{
                      `${archivo.caption ? `${archivo.caption} • ${archivo.ext.substring(1)}` : archivo.name} (${filesize(archivo.size * 1000, { standard: 'jedec' })})`
                    }</MuiLink>
                </li>
              ))
            }
          </ul>
        </Box>
      </Container>
    </ >
  )
}