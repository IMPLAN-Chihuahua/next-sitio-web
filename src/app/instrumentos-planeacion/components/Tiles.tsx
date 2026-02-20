'use client'

import SearchAndFiltersLayout from "@/app/components/SearchAndFiltersLayout";
import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Pagination as MuiPagination, Typography, Link as MuiLink, Stack, Button, Alert } from "@mui/material";
import useSWRImmutable from "swr/immutable";
import qs from 'qs'
import { cmsFetcher } from "@/app/services/http";
import { Pagination, Tag, TemaInstrumentoPlaneacion } from "@/app/definitions";
import { InstrumentoPlaneacion } from "../definitions";
import Link from "next/link";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { AnioAutocomplete } from "@/app/estudios-y-proyectos/components/Tiles";
import { Clear } from "@mui/icons-material";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { formatISO, parseISO } from "date-fns";
import TemasInstrumentoPlaneacionAutocomplete from "./TemasDatosAbiertosAutocomplete";
import { AnimatePresence, motion } from "framer-motion";



const MotionGrid = motion.create(Grid);

const InstrumentosTiles = () => {
  const methods = useForm<{ anio: number[], temas: Array<TemaInstrumentoPlaneacion> }>({
    defaultValues: {
      anio: [],
      temas: []
    }
  })
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1);
  const values = useWatch({ control: methods.control })

  const filterObj = {
    fields: ['nombre', 'version', 'descripcion', 'fechaAprobacion', 'nombreCortoSlug'],
    populate: [
      'tema',
      'cover'
    ],
    pagination: {
      pageSize: 6,
      page
    },
    sort: ['fechaAprobacion:desc'],
    filters: {
      $and: [
        {
          $or: [
            {
              nombre: {
                $containsi: search
              }
            },
            {
              nombreCorto: {
                $containsi: search
              }
            },

          ],
        },
        {
          tema: {
            documentId: {
              $in: values.temas?.map(t => t.documentId) || []
            }
          },
        },
        {
          $or: values.anio?.map(anio => ({
            fechaAprobacion: {
              $gte: formatISO(new Date(anio, 0, 1), { representation: 'date' }),
              $lte: formatISO(new Date(anio, 11, 31), { representation: 'date' })
            }
          }))
        }
      ]
    }
  }

  const queryParams = qs.stringify(filterObj, {
    encodeValuesOnly: true
  })
  const { data, isLoading, error } = useSWRImmutable<{
    data: InstrumentoPlaneacion[],
    meta: { pagination: Pagination }
  }>(`/instrumentos-planeacion?${queryParams.toString()}`, cmsFetcher)

  const [instrumentos, setInstrumentos] = useState<InstrumentoPlaneacion[]>([]);

  useEffect(() => {
    if (!data?.data) return;

    setInstrumentos(data.data);
  }, [data])

  const handleClearFiltros = useCallback(() => {
    methods.reset();
  }, []);

  const handlePageChange = (_: ChangeEvent<unknown>, val: number) => {
    setPage(val);

    window.scrollTo({
      top: 550,
      behavior: 'auto'
    });
  }

  if (error) {
    return <Alert severity="error">Hubo un error al obtener los instrumentos de planeación</Alert>
  }

  return (
    <Box component={'section'}>
      <FormProvider {...methods}>
        <SearchAndFiltersLayout
          Filters={<InstrumentosFilters handleClearFiltros={handleClearFiltros} showClearFilterButton={methods.formState.isDirty} />}
          onDebouncedSearchChange={(val) => setSearch(val)}
          hasDirtyFields={methods.formState.isDirty}
          searchBarPlaceholder="Buscar instrumentos por nombre"
        />
      </FormProvider>

      <Grid container spacing={2} sx={{ my: 3 }} minHeight={'600px'}>
        <AnimatePresence mode='popLayout'>
          {
            !isLoading && instrumentos.length > 0
              ? instrumentos.map(instrumento => (
                <MotionGrid
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  key={instrumento.documentId}
                  size={{ xs: 12, md: 4 }}
                  justifyContent={{ xs: 'center' }}
                  display={'flex'}
                >
                  <InstrumentoCard instrumento={instrumento} />
                </MotionGrid>
              )) : (
                <MotionGrid size={12}>
                  <Typography>
                    No se encontraron instrumentos de planeación
                  </Typography>
                </MotionGrid>
              )
          }
        </AnimatePresence>
      </Grid>

      <Box
        my={2}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <MuiPagination
          page={page}
          onChange={handlePageChange}
          count={data?.meta.pagination.pageCount || 0}
          size='medium'
        />
      </Box>
    </Box>
  )
}



type InstrumentoCardProps = {
  instrumento: Pick<InstrumentoPlaneacion, 'cover' | 'nombre' | 'descripcion' | 'tema' | 'version' | 'fechaAprobacion' | 'nombreCortoSlug'>
}
const InstrumentoCard = ({ instrumento }: InstrumentoCardProps) => {
  const anioPublicacion = parseISO(instrumento.fechaAprobacion).getFullYear();
  const aboutInstrumento = parseInt(instrumento.version) === anioPublicacion
    ? `(${anioPublicacion})`
    : `(${instrumento.version} ${anioPublicacion})`
  return (
    <Card variant="outlined"
      sx={{
        height: '100%',
        maxWidth: '450px',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <CardActionArea
        LinkComponent={Link}
        href={`/instrumentos-planeacion/${instrumento.nombreCortoSlug}`}
        disableTouchRipple
        disableRipple
      >
        <CardMedia
          component='img'
          sx={{ height: '480px', maxHeight: '480px' }}
          image={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${instrumento.cover.url}`}
          title={instrumento.cover.caption || `${instrumento.nombre} ${aboutInstrumento}`}
        />
      </CardActionArea>
      <CardContent sx={{ flex: 1 }}>
        <Box display={'flex'} flexDirection={'column'} height={'100%'}>
          <MuiLink
            component={Link}
            href={`/instrumentos-planeacion/${instrumento.nombreCortoSlug}`}
            color="primary.800"
            title={`${instrumento.nombre} ${aboutInstrumento}`}
            sx={{
              lineHeight: '1.5rem',
              textDecoration: 'none',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              wordBreak: 'break-word',
              overflow: 'hidden'
            }}
            height={'3rem'}
            maxHeight={'3rem'}
            variant="h3"
            mb={2.5}
            fontSize={18}
            fontWeight={600}>{instrumento.nombre} {aboutInstrumento}</MuiLink>
          <Box mt={'auto'}>
            <Typography variant="body2">{instrumento?.tema.descripcion}</Typography>
            <Typography
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                wordBreak: 'break-word',
                overflow: 'hidden'
              }}
              mt={.5}
              variant="body2"
              color="text.secondary">{instrumento.descripcion}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}



const InstrumentosFilters = ({ handleClearFiltros, showClearFilterButton }: { handleClearFiltros: () => void, showClearFilterButton: boolean }) => {

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      columnGap={2}
      rowGap={2}
      flexWrap={'wrap'}
    >
      <AnioAutocomplete />
      <TemasInstrumentoPlaneacionAutocomplete name='temas' label='Tema datos abiertos' />
      {
        showClearFilterButton && (
          <Button
            endIcon={<Clear />}
            sx={{ justifySelf: 'center', alignSelf: 'center' }}
            size="large"
            disableRipple
            variant="text"
            onClick={handleClearFiltros}>Borrar filtros</Button>
        )
      }
    </Stack>
  )
}


export default InstrumentosTiles;