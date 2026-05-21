'use client'
import { cmsFetcher } from "@/app/services/http";
import { Alert, Autocomplete, Box, Button, Pagination, Stack, TextField, Typography } from "@mui/material";
import qs from 'qs';
import { TrabajoPlaneacion } from "../definitions";
import TrabajoTile from "./Tile";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { ColaboradorExterno, Pagination as PaginationType, Tag } from "@/app/definitions";
import { eachYearOfInterval } from "date-fns";
import ColaboradoresExternosAutocomplete from "@/app/components/ColaboradoresExternosAutocomplete";
import TagsAutocomplete from "@/app/components/TagsAutocomplete";
import { Controller, FormProvider, useForm, useFormContext, useWatch } from 'react-hook-form'
import ClearIcon from '@mui/icons-material/Clear';
import { TrabajosTilesSkeletons } from "./Skeleton";
import SearchAndFiltersLayout from "@/app/components/SearchAndFiltersLayout";
import useSWRImmutable from "swr/immutable";
import { AnimatePresence, motion } from "framer-motion";
import { useUrlPagination } from "@/app/hooks/useUrlPagination";


export default function TrabajosTiles() {
  const methods = useForm<{ anio: number[], colaboradoresExternos: Array<ColaboradorExterno>, tags: Array<Tag> }>({
    defaultValues: {
      anio: [],
      colaboradoresExternos: [],
      tags: []
    }
  })

  const values = useWatch<{ anio: number[], colaboradoresExternos: Array<ColaboradorExterno>, tags: Array<Tag> }>({ control: methods.control })
  const [search, setSearch] = useState('');
  const { page, changePage } = useUrlPagination(1);

  const estudiosQueryParams = qs.stringify({
    sort: ['ficha.anio:desc', 'updatedAt:desc'],
    pagination: {
      page: page,
      pageSize: 5,
    },
    filters: {
      $and: [
        {
          $or: [
            {
              nombre: {
                $containsi: search
              }
            }
          ]
        },
        {
          ficha: {
            $and: [
              {
                clasificaciones: {
                  documentId: {
                    $in: values.tags?.map(t => t.documentId) || []
                  }
                }
              },
              {
                anio: {
                  $in: values.anio || []
                }
              },
              {
                colaboradoresExternos: {
                  documentId: {
                    $in: values.colaboradoresExternos?.map(c => c.documentId) || []
                  }
                }
              }
            ],
          }

        }
      ]
    },
    populate: [
      'cover',
      'ficha',
      'ficha.clasificaciones',
      'ficha.colaboradoresExternos',]
  }, { encodeValuesOnly: true })

  const { data, error, isLoading } = useSWRImmutable<{
    data: TrabajoPlaneacion[],
    meta: { pagination: PaginationType }
  }>(`/trabajos-planeacion?${estudiosQueryParams.toString()}`, cmsFetcher);

  const [trabajos, setTrabajos] = useState<TrabajoPlaneacion[]>([])

  useEffect(() => {
    if (!data?.data) return;

    setTrabajos(data.data)
  }, [data]);



  const handlePageChange = (_: ChangeEvent<unknown>, val: number) => {
    changePage(val);

    window.scrollTo({
      top: 550,
      behavior: 'auto'
    });
  }

  const handleClearFiltros = useCallback(() => {
    methods.reset();
    changePage(1);
  }, [methods, changePage]);

  if (error) {
    console.error(error)
    return <Alert severity="error">Hubo un error al obtener los trabajos de planeación</Alert>
  }

  return (
    <Box>
      <FormProvider {...methods}>
        <SearchAndFiltersLayout
          onDebouncedSearchChange={(val) => { setSearch(val); changePage(1); }}
          hasDirtyFields={methods.formState.isDirty}
          Filters={
            <TrabajosFilters
              handleClearFiltros={handleClearFiltros}
              showClearFilterButton={methods.formState.isDirty}
            />
          }
        />
      </FormProvider>
      <Box component={'section'} display={'flex'} flexDirection={'column'} alignItems={'center'} minHeight={'600px'}>
        <AnimatePresence mode='popLayout'>
          {
            !isLoading && trabajos.length > 0
              ? trabajos.map(trabajo => (
                <Box
                  key={trabajo.documentId}
                  sx={{ mb: 2.5, width: '100%', maxWidth: { xs: '450px', md: '100%' } }}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  component={motion.div}>
                  <TrabajoTile trabajoPlaneacion={trabajo} />
                </Box>
              ))
              : <Typography>No se encontraron registros</Typography>
          }
        </AnimatePresence>
      </Box>
      <Box
        my={2}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'} >
        <Pagination
          page={page}
          onChange={handlePageChange}
          count={data?.meta.pagination.pageCount || 0}
          size='medium'
        />
      </Box>
    </Box>
  )
}



const TrabajosFilters = ({ handleClearFiltros, showClearFilterButton }: { handleClearFiltros: () => void, showClearFilterButton: boolean }) => {

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      columnGap={2}
      rowGap={2}
      flexWrap={'wrap'}>
      <ColaboradoresExternosAutocomplete />
      <AnioAutocomplete />
      <TagsAutocomplete name='tags' label='Clasificaciones' />
      {
        showClearFilterButton && (
          <Button
            endIcon={<ClearIcon />}
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



export const AnioAutocomplete = ({ name = 'anio', label = 'Año' }: { name?: string, label?: string }) => {
  const methods = useFormContext()
  const years = eachYearOfInterval({ start: new Date(), end: new Date(2000, 0, 1) }).map(y => y.getFullYear())

  return (
    <Controller
      name={name}
      control={methods.control}
      defaultValue={null}
      render={({ field }) => (
        <Autocomplete
          noOptionsText='No se encontraron opciones'
          multiple
          getOptionLabel={(option) => option.toString()}
          options={years}
          value={field.value}
          onChange={(_, value) => field.onChange(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              sx={{ minWidth: 200 }}
              maxRows={2}
            />
          )}
        />
      )}
    />
  )

}