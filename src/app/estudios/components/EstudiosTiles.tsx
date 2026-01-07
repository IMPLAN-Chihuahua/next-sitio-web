'use client'
import { cmsFetcher } from "@/app/services/http";
import { Autocomplete, Badge, Box, Button, Collapse, colors, Fade, FormControl, Grid, IconButton, InputLabel, OutlinedInput, Pagination, Stack, TextField, ToggleButton } from "@mui/material";
import useSWR from "swr";
import qs from 'qs';
import { Estudio } from "../definitions";
import EstudioTile from "./Tile";
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



export default function EstudiosTiles() {
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
    sort: ['fichaEstudio.anio:desc'],
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
          fichaEstudio: {
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
      'fichaEstudio',
      'fichaEstudio.clasificaciones',
      'fichaEstudio.colaboradoresExternos',]
  }, { encodeValuesOnly: true })

  const { data, error, isLoading } = useSWR<{
    data: Estudio[],
    meta: { pagination: PaginationType }
  }>(`/estudios?${estudiosQueryParams.toString()}`, cmsFetcher);

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

  return (
    <Box>
      <Grid container my={2} spacing={2}>
        <Grid size={{ xs: 12, md: 11 }}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Buscar</InputLabel>
            <OutlinedInput
              placeholder='Busca estudios por nombre'
              onChange={(e) => handleDebouncedSearch(e.currentTarget.value)}
              sx={{ minWidth: '300px' }}
              label='Buscar'
              fullWidth
              endAdornment={<Search sx={{ color: 'primary.700' }} />}
            />
          </FormControl>
        </Grid>
        <FormProvider {...methods}>
          <Grid size={{ xs: 1 }} >
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
              <EstudiosFilters
                handleClearFiltros={handleClearFiltros}
                showClearFilterButton={methods.formState.isDirty}
              />
            </Collapse>
          </Grid>
        </FormProvider>
      </Grid>
      <Box display={'flex'} flexDirection={'column'} minHeight={'600px'}>
        {
          data?.data.map((estudio) => (
            <EstudioTile key={estudio.documentId} estudio={estudio} />
          ))
        }
      </Box>
      <Box height={80} display={'flex'} justifyContent={'center'} alignItems={'center'} >
        <Pagination
          page={page}
          onChange={handlePageChange}
          count={data?.meta.pagination.pageCount}
          size='medium'
        />
      </Box>
    </Box >
  )
}



const EstudiosFilters = ({ handleClearFiltros, showClearFilterButton }: { handleClearFiltros: () => void, showClearFilterButton: boolean }) => {

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