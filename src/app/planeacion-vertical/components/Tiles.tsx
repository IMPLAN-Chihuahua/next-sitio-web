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
import { ChangeEvent, useRef, useState } from 'react';
import { formatISO } from 'date-fns';
import TemasInstrumentoPlaneacionAutocomplete from './TemasDatosAbiertosAutocomplete';
import { AnimatePresence, motion } from 'framer-motion';
import { useUrlPagination } from '@/app/hooks/useUrlPagination';
import CardTiles from '@/app/components/CardTiles';
import type { GrupoPlaneacion } from '../data/sistema-planeacion';

const MotionGrid = motion.create(Grid);

type SeccionInstrumento = 'datos_abiertos' | 'sistema_planeacion';
type EstadoInstrumento = 'vigente' | 'historico' | 'no_aplica' | null;

type InstrumentoPlaneacionConEstado = InstrumentoPlaneacion & {
  estado?: EstadoInstrumento;
};

type InstrumentosTilesProps = {
  seccion: SeccionInstrumento;
  incluirSinSeccion?: boolean;
  compact?: boolean;
  expandedCatalog?: boolean;
  grupo?: GrupoPlaneacion | null;
};

type FormValues = {
  anio: number[];
  temas: TemaInstrumentoPlaneacion[];
};

const InstrumentosTiles = ({ seccion, incluirSinSeccion = false, compact = false, expandedCatalog = false, grupo = null }: InstrumentosTilesProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const methods = useForm<FormValues>({
    defaultValues: { anio: [], temas: [] }
  });

  const values = useWatch({ control: methods.control });
  const [search, setSearch] = useState('');
  const { page: urlPage, changePage: changeUrlPage } = useUrlPagination(1);
  const [catalogPage, setCatalogPage] = useState(1);
  const page = compact ? catalogPage : urlPage;
  const changePage = compact ? setCatalogPage : changeUrlPage;

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
        ...aniosFilter,
        ...(grupo ? [{ estado: { $eq: 'vigente' } }, {
          $or: [
            { nombre: { $containsi: { parciales: 'parcial', sectoriales: 'sectorial', maestros: 'maestro' }[grupo] } },
            { tema: { descripcion: { $containsi: { parciales: 'parcial', sectoriales: 'sectorial', maestros: 'maestro' }[grupo] } } }
          ]
        }] : [])
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
    if (compact) {
      sectionRef.current?.parentElement?.scrollIntoView({ block: 'start', behavior: 'auto' });
    } else {
      window.scrollTo({ top: 550, behavior: 'auto' });
    }
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
    <Box component="section" ref={sectionRef} sx={compact ? {
      '& .MuiOutlinedInput-root': { minWidth: '0 !important' },
      '& > .MuiFormControl-root': { minWidth: 0 },
    } : undefined}>
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

      <Grid data-instrumentos-results container spacing={compact ? 3 : 2} sx={{ my: 3 }} minHeight={compact ? undefined : '600px'}>
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
                size={compact ? (expandedCatalog ? { xs: 12, sm: 6, lg: 4, xl: 3 } : { xs: 12, sm: 6, xl: 4 }) : { xs: 12, md: 4 }}
                justifyContent={{ xs: 'center' }}
                display="flex"
              >
                <InstrumentoTile instrumento={instrumento} compact={compact} />
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
  compact?: boolean;
  instrumento: Pick<
    InstrumentoPlaneacionConEstado,
    'cover' | 'nombre' | 'descripcion' | 'tema' | 'version' |
    'fechaAprobacion' | 'nombreCortoSlug' | 'anioPublicacion' |
    'estado' | 'destacado'
  >;
};

const InstrumentoTile = ({ instrumento, compact = false }: InstrumentoCardProps) => {
  const aboutInstrumento = instrumento.anioPublicacion ? `• ${instrumento.anioPublicacion}` : '';
  const title = `${instrumento.nombre} ${aboutInstrumento}`.trim();

  const coverUrl = instrumento.cover?.url
    ? `${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${instrumento.cover.url}`
    : null;

  const esHistorico = instrumento.estado === 'historico';

  return (
    <CardTiles
      tipo={compact ? 'rectangular-horizontal' : 'rectangular-vertical'}
      title={title}
      href={`/planeacion-vertical/${instrumento.nombreCortoSlug}`}
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
      contentSx={compact ? { minHeight: 220, p: 2 } : { minHeight: 235 }}
      titleLineClamp={compact ? 3 : 2}
      action={compact ? { href: `/planeacion-vertical/${instrumento.nombreCortoSlug}`, label: 'Ver estudio', external: false } : undefined}
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
