'use client'
import { cmsFetcher } from "@/app/services/http";
import { Autocomplete, Box, Collapse, Fade, Grid, IconButton, Pagination, Stack, TextField, ToggleButton } from "@mui/material";
import useSWR from "swr";
import qs from 'qs';
import { Estudio } from "../definitions";
import EstudioTile from "./Tile";
import TuneIcon from '@mui/icons-material/Tune';
import { ChangeEvent, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Pagination as PaginationType } from "@/app/definitions";
import { eachYearOfInterval } from "date-fns";
import ColaboradoresExternosAutocomplete from "@/app/components/ColaboradoresExternosAutocomplete";
import TagsAutocomplete from "@/app/components/TagsAutocomplete";



export default function EstudiosTiles() {
  const [openFilters, setOpenFilters] = useState(false);
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
        // 
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

  const toggleFilterDisplay = () => setOpenFilters(pre => !pre);

  return (
    <Box>
      <Grid container my={2} spacing={2}>
        <Grid size={{ xs: 12, sm: 11 }}>
          <TextField
            fullWidth
            label='Buscar'
            variant="outlined"
            onChange={(e) => handleDebouncedSearch(e.currentTarget.value)}
          />
        </Grid>
        <Grid
          size={{ xs: 12, sm: 1 }}
          display={'flex'}
          justifyContent={{ xs: 'flex-end', sm: 'center' }}>
          <ToggleButton
            value='check'
            selected={openFilters}
            onChange={toggleFilterDisplay}
            sx={{
              borderRadius: 50,
              border: 'none',
              width: 55,
              height: 55,
            }}>
            <TuneIcon sx={{ color: 'primary.700' }} />
          </ToggleButton>
        </Grid>
        <Grid size={12}>
          <Collapse in={openFilters}>
            <EstudiosFilters />
          </Collapse>
        </Grid>
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
    </Box>
  )
}


const EstudiosFilters = () => {
  const years = eachYearOfInterval({ start: new Date(), end: new Date(2000, 0, 1) })

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={2}
      flexWrap={'wrap'}>
      <ColaboradoresExternosAutocomplete />
      <Autocomplete
        multiple
        getOptionLabel={val => val.toLocaleDateString('es-MX', { year: 'numeric' })}
        options={years}
        renderInput={(params) => (
          <TextField
            {...params}
            label={'Año'}
            sx={{ minWidth: 200, maxWidth: 400 }}
            maxRows={2}
          />
        )}
      />
      <TagsAutocomplete />
    </Stack>
  )
}