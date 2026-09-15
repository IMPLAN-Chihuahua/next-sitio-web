'use client';

import SearchAndFiltersLayout from '@/app/components/SearchAndFiltersLayout';
import { Alert, Box, Button, CircularProgress, Grid, Pagination as MuiPagination, Stack, Typography } from '@mui/material';
import { Clear } from '@mui/icons-material';
import useSWRImmutable from 'swr/immutable';
import qs from 'qs';
import { cmsFetcher } from '@/app/services/http';
import { Pagination, TemaInstrumentoPlaneacion } from '@/app/definitions';
import { InstrumentoPlaneacion } from '../definitions';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { AnioAutocomplete } from '@/app/estudios-y-propuestas/components/Tiles';
import { ChangeEvent, useState } from 'react';
import { formatISO } from 'date-fns';
import TemasInstrumentoPlaneacionAutocomplete from './TemasDatosAbiertosAutocomplete';
import { AnimatePresence, motion } from 'framer-motion';
import { useUrlPagination } from '@/app/hooks/useUrlPagination';
import CardTiles from './CardTiles';

const MotionGrid = motion.create(Grid);

type SeccionInstrumento = 'datos_abiertos' | 'sistema_planeacion';
type EstadoInstrumento = 'vigente' | 'historico' | 'no_aplica' | null;

type InstrumentoPlaneacionConEstado = InstrumentoPlaneacion & {
  estado?: EstadoInstrumento;
};

type InstrumentosTilesProps = {
  seccion: SeccionInstrumento;
  incluirSinSeccion?: boolean;
};

type FormValues = {
  anio: number[];
  temas: TemaInstrumentoPlaneacion[];
};

const InstrumentosTiles = ({ seccion, incluirSinSeccion = false }: InstrumentosTilesProps) => {
  const methods = useForm<FormValues>({
    defaultValues: { anio: [], temas: [] }
  });

  const values = useWatch({ control: methods.control });
  const [search, setSearch] = useState('');
  const { page, changePage } = useUrlPagination(1);

  const seccionFilter = incluirSinSeccion
    ? {
      $or: [
        { seccion: { $eq: seccion } },
        { seccion: { $null: true } }
      ]
    }
    : { seccion: { $eq: seccion } };

  const temasFilter = values.temas?.length
    ? [{
      tema: {
        documentId: {
          $in: values.temas.map(tema => tema.documentId)
        }
      }
    }]
    : [];

  const aniosFilter = values.anio?.length
    ? [{
      $or: values.anio.map(anio => ({
        fechaAprobacion: {
          $gte: formatISO(new Date(anio, 0, 1), { representation: 'date' }),
          $lte: formatISO(new Date(anio, 11, 31), { representation: 'date' })
        }
      }))
    }]
    : [];

  const filterObj = {
    fields: ['nombre', 'version', 'descripcion', 'fechaAprobacion', 'nombreCortoSlug', 'anioPublicacion', 'estado', 'destacado'],
    populate: ['tema', 'cover'],
    pagination: { pageSize: 6, page },

    sort: ['destacado:asc', 'vigente:asc', 'anioPublicacion:desc'],

    filters: {
      $and: [
        seccionFilter,
        {
          $or: [
            { nombre: { $containsi: search } },
            { nombreCorto: { $containsi: search } }
          ]
        },
        ...temasFilter,
        ...aniosFilter
      ]
    }
  };

  const queryParams = qs.stringify(filterObj, { encodeValuesOnly: true });

  const { data, isLoading, error } = useSWRImmutable<{
    data: InstrumentoPlaneacionConEstado[];
    meta: { pagination: Pagination };
  }>(
    `/instrumentos-planeacion?${queryParams}`,
    cmsFetcher
  );

  const instrumentos = data?.data ?? [];

  const handleClearFiltros = () => {
    methods.reset();
  };

  const handlePageChange = (_: ChangeEvent<unknown>, val: number) => {
    changePage(val);
    window.scrollTo({ top: 550, behavior: 'auto' });
  };

  if (error) {
    return (
      <Alert severity="error">
        Hubo un error al obtener los instrumentos de planeación
      </Alert>
    );
  }

  const temaFilterLabel = seccion === 'sistema_planeacion'
    ? 'Tema sistema de planeación'
    : 'Tema datos abiertos';

  return (
    <Box component="section">
      <FormProvider {...methods}>
        <SearchAndFiltersLayout
          Filters={
            <InstrumentosFilters
              handleClearFiltros={handleClearFiltros}
              showClearFilterButton={methods.formState.isDirty}
              temaLabel={temaFilterLabel}
            />
          }
          onDebouncedSearchChange={(val) => {
            setSearch(val);
            changePage(1);
          }}
          hasDirtyFields={methods.formState.isDirty}
          searchBarPlaceholder="Buscar instrumentos por nombre"
        />
      </FormProvider>

      <Grid container spacing={2} sx={{ my: 3 }} minHeight="600px">
        <AnimatePresence mode="popLayout">
          {isLoading ? (
            <Grid size={12} display="flex" justifyContent="center" py={10}>
              <CircularProgress />
            </Grid>
          ) : instrumentos.length > 0 ? (
            instrumentos.map(instrumento => (
              <MotionGrid
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                key={instrumento.documentId}
                size={{ xs: 12, md: 4 }}
                justifyContent={{ xs: 'center' }}
                display="flex"
              >
                <InstrumentoTile instrumento={instrumento} />
              </MotionGrid>
            ))
          ) : (
            <MotionGrid size={12}>
              <Typography>No se encontraron instrumentos de planeación</Typography>
            </MotionGrid>
          )}
        </AnimatePresence>
      </Grid>

      <Box my={2} display="flex" justifyContent="center" alignItems="center">
        <MuiPagination
          page={page}
          onChange={handlePageChange}
          count={data?.meta.pagination.pageCount || 0}
          size="medium"
        />
      </Box>
    </Box>
  );
};

type InstrumentoCardProps = {
  instrumento: Pick<
    InstrumentoPlaneacionConEstado,
    'cover' | 'nombre' | 'descripcion' | 'tema' | 'version' |
    'fechaAprobacion' | 'nombreCortoSlug' | 'anioPublicacion' |
    'estado' | 'destacado'
  >;
};

const InstrumentoTile = ({ instrumento }: InstrumentoCardProps) => {
  const aboutInstrumento = instrumento.anioPublicacion ? `• ${instrumento.anioPublicacion}` : '';
  const title = `${instrumento.nombre} ${aboutInstrumento}`.trim();

  const coverUrl = instrumento.cover?.url
    ? `${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${instrumento.cover.url}`
    : null;

  const esHistorico = instrumento.estado === 'historico';

  return (
    <CardTiles
      tipo="rectangular-vertical"
      title={title}
      href={`/planeacion/${instrumento.nombreCortoSlug}`}
      image={{
        url: coverUrl,
        title: instrumento.cover?.caption || title,
        alt: instrumento.cover?.alternativeText || title
      }}
      imageMuted={esHistorico}
      category={instrumento.tema?.descripcion ?? ''}
      description={instrumento.descripcion}
      destacado={instrumento.destacado}
      historico={esHistorico}
      historicoLabel="Histórico"
      historicoTooltip="Este instrumento es de carácter histórico, por lo que su contenido puede no reflejar la normativa o situación urbana vigente."
      contentSx={{ minHeight: 235 }}
    />
  );
};

type InstrumentosFiltersProps = {
  handleClearFiltros: () => void;
  showClearFilterButton: boolean;
  temaLabel: string;
};

const InstrumentosFilters = ({ handleClearFiltros, showClearFilterButton, temaLabel }: InstrumentosFiltersProps) => {
  return (
    <Stack direction={{ xs: 'column', md: 'row' }} columnGap={2} rowGap={2} flexWrap="wrap">
      <AnioAutocomplete />

      <TemasInstrumentoPlaneacionAutocomplete name="temas" label={temaLabel} />

      {showClearFilterButton && (
        <Button
          endIcon={<Clear />}
          sx={{ justifySelf: 'center', alignSelf: 'center' }}
          size="large"
          disableRipple
          variant="text"
          onClick={handleClearFiltros}
        >
          Borrar filtros
        </Button>
      )}
    </Stack>
  );
};

export default InstrumentosTiles;