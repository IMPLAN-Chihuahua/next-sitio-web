'use client'
import { cmsFetcher } from "@/app/services/http";
import { Alert, Autocomplete, Badge, Box, Button, Collapse, colors, Fade, FormControl, Grid, IconButton, InputLabel, OutlinedInput, Pagination, Stack, TextField, ToggleButton, Typography } from "@mui/material";
import useSWR from "swr";
import qs from 'qs';
import { TrabajoPlaneacion } from "../definitions";
import TrabajoTile from "./Tile";
import TuneIcon from '@mui/icons-material/Tune';
import { ChangeEvent, useCallback, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { ColaboradorExterno, Pagination as PaginationType, Tag } from "@/app/definitions";
import { eachYearOfInterval } from "date-fns";
import ColaboradoresExternosAutocomplete from "@/app/components/ColaboradoresExternosAutocomplete";
import TagsAutocomplete from "@/app/components/TagsAutocomplete";
import { Controller, FormProvider, useForm, useFormContext, useWatch } from 'react-hook-form'
import ClearIcon from '@mui/icons-material/Clear';
import { Search } from "@mui/icons-material";
import { TrabajosTilesSkeletons } from "./Skeleton";



export default function TrabajosTiles() {
  const [openFilters, setOpenFilters] = useState(false);
  const methods = useForm<{ anio: number[], colaboradoresExternos: Array<ColaboradorExterno>, tags: Array<Tag> }>({
    defaultValues: {
      anio: [],
      colaboradoresExternos: [],
      tags: []
    }
  })

  const values = useWatch<{ anio: number[], colaboradoresExternos: Array<ColaboradorExterno>, tags: Array<Tag> }>({ control: methods.control })
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

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

  const { data, error, isLoading } = useSWR<{
    data: TrabajoPlaneacion[],
    meta: { pagination: PaginationType }
  }>(`/trabajos-planeacion?${estudiosQueryParams.toString()}`, cmsFetcher);

  const handleDebouncedSearch = useDebouncedCallback((val: string) => {
    setSearch(val)
  }, 300);

  const handlePageChange = (_: ChangeEvent<unknown>, val: number) => {
    setPage(val)
  }

  const handleClearFiltros = useCallback(() => {
    methods.reset();
  }, []);

  const toggleFilterDisplay = () => setOpenFilters(pre => !pre);


  if (error) {
    console.error(error)
    return <Alert severity="error">Hubo un error al obtener los trabajos de planeación</Alert>
  }

  return (
    <Box>
      <Grid container my={2} spacing={2}>
        <Grid size={{ xs: 12, md: 11 }}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Buscar</InputLabel>
            <OutlinedInput
              placeholder='Buscar por nombre'
              onChange={(e) => handleDebouncedSearch(e.currentTarget.value)}
              sx={{ minWidth: '300px' }}
              label='Buscar'
              fullWidth
              endAdornment={<Search sx={{ color: 'primary.700' }} />}
            />
          </FormControl>
        </Grid>
        <FormProvider {...methods}>
          <Grid size={{ xs: 12, md: 1 }} display='flex' justifyContent='center' >
            <Badge
              color="info"
              variant="dot"
              overlap="circular"
              invisible={!methods.formState.isDirty}
            >
              <ToggleButton
                value='check'
                selected={openFilters}
                onChange={toggleFilterDisplay}
                sx={{
                  borderRadius: 50,
                  width: 55,
                  height: 55,
                }}>
                <TuneIcon sx={{ color: 'primary.700' }} />
              </ToggleButton>
            </Badge>
          </Grid>
          <Grid size={12}>
            <Collapse in={openFilters}>
              <TrabajosFilters
                handleClearFiltros={handleClearFiltros}
                showClearFilterButton={methods.formState.isDirty}
              />
            </Collapse>
          </Grid>
        </FormProvider>
      </Grid>
      <Box display={'flex'} flexDirection={'column'} minHeight={'600px'}>
        {
          isLoading
            ? <TrabajosTilesSkeletons />
            : data !== undefined && data.data !== null && data?.data.length > 0
              ? data.data.map(trabajo => (<TrabajoTile key={trabajo.documentId} trabajoPlaneacion={trabajo} />))
              : <Typography>No se encontraron registros</Typography>
        }
      </Box>
      <Box height={80} display={'flex'} justifyContent={'center'} alignItems={'center'} >
        {
          data?.meta && (
            <Pagination
              page={page}
              onChange={handlePageChange}
              count={data?.meta.pagination.pageCount}
              size='medium'
            />
          )
        }
      </Box>
    </Box >
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
      <TagsAutocomplete label='Clasificaciones' />
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



const AnioAutocomplete = () => {
  const methods = useFormContext()
  const years = eachYearOfInterval({ start: new Date(), end: new Date(2000, 0, 1) }).map(y => y.getFullYear())

  return (
    <Controller
      name="anio"
      control={methods.control}
      render={({ field }) => (
        <Autocomplete
          multiple
          getOptionLabel={(option) => option.toString()}
          options={years}
          value={field.value}
          onChange={(_, value) => field.onChange(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              label={'Año'}
              sx={{ minWidth: 200 }}
              maxRows={2}
            />
          )}
        />
      )}
    />
  )

}