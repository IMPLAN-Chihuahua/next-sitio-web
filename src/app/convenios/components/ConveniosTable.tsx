'use client'

import { cmsFetcher } from "@/app/services/http"
import { Alert, Autocomplete, Box, FormControl, Grid, InputLabel, Link as MuiLink, OutlinedInput, Paper, TextField } from "@mui/material"
import { DataGrid, GridColDef, gridClasses } from "@mui/x-data-grid"
import useSWRImmutable from "swr/immutable"
import qs from 'qs'
import { Convenio } from "../definitions"
import { ColaboradorExterno, Pagination } from "@/app/definitions"
import { useDebouncedCallback } from "use-debounce"
import { useState } from "react"
import { Search } from "@mui/icons-material"
import { eachYearOfInterval, formatISO } from "date-fns"



export const ConveniosTable = () => {
  const [search, setSearch] = useState('');

  const handleDebouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value)
  }, 300);

  const [selectedYears, setSelectedYears] = useState<Date[]>([]);

  const years = eachYearOfInterval({ start: new Date(), end: new Date(2000, 0, 1) })

  const params = qs.stringify({
    sort: ['anio:desc'],
    populate: ['colaboradores', 'convenio', 'terminosReferencia', 'presentacion'],
    filters: {
      $and: [{
        $or: [
          {
            codigo: {
              $containsi: search,
            }
          },
          {
            shortDescripcion: {
              $containsi: search
            }
          },
        ],
      }, {
        $or: selectedYears.map(date => ({
          anio: {
            $eq: date.getFullYear()
          }
        }))
      }]
    }
  }, { encodeValuesOnly: true })

  const { data, isLoading, error } = useSWRImmutable<{ data: Convenio[], meta: { pagination: Pagination } }>(`/convenios?${params.toString()}`, cmsFetcher);

  const columns: GridColDef[] = [{
    field: 'codigo',
    headerName: 'Código',
    width: 200
  }, {
    field: 'colaboradorExterno',
    headerName: 'Colaborador',
    valueGetter: (_, row) => row.colaboradores.map((c: ColaboradorExterno) => `${c.nombre}${c.acronimo ? ` (${c.acronimo})` : ''}`).join(','),
    width: 200
  }, {
    field: 'shortDescripcion',
    headerName: 'Descripción',
    flex: 1,
  },{
    field: 'anio',
    headerName: 'Año',
  },
  {
    flex: 1,
    field: '_',
    sortable: false,
    headerName: 'Archivos adjuntos',
    renderCell: ({ row }) => (
      <Box>
        <MuiLink
          mt={1}
          target='_blank'
          href={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${row.convenio.url}`}
          display={'block'}
          maxWidth={'fit-content'}
        >Convenio</MuiLink>
        {
          row.terminosReferencia && (
            <MuiLink
              mt={1}
              target='_blank'
              href={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${row.terminosReferencia.url}`}
              display={'block'}
              maxWidth={'fit-content'}
            >Términos de referencia</MuiLink>
          )
        }
        {
          row.presentacion && (
            <MuiLink
              mt={1}
              target='_blank'
              href={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${row.presentacion.url}`}
              display={'block'}
              maxWidth={'fit-content'}
            >Presentación</MuiLink>
          )
        }
      </Box>
    )
  }]

  if (error) {
    return <Alert severity="error">
      Hubo un error al obtener los convenios
    </Alert>
  }


  return (
    <Box>
      <Grid container spacing={2} my={2}>
        <Grid size={{ xs: 12, md: 5 }}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Buscar</InputLabel>
            <OutlinedInput
              onChange={(e) => handleDebouncedSearch(e.currentTarget.value)}
              sx={{ minWidth: '300px' }}
              label='Buscar'
              fullWidth
              placeholder="Buscar por código, descripción o colaborador"
              endAdornment={<Search sx={{ color: 'primary.700' }} />}
            />
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Autocomplete
            multiple
            value={selectedYears}
            id='tags-años'
            getOptionLabel={val => val.toLocaleDateString('es-MX', { year: 'numeric' })}
            options={years}
            onChange={(_, newValue) => setSelectedYears(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant='outlined'
                label='Seleccionar años'
                helperText='Si quieres ver otros años, filtra aquí'
                maxRows={2}
              />
            )}
          />
        </Grid>
      </Grid>
      <Paper sx={{ height: 600, width: '100%' }} variant='outlined'>
        <DataGrid
          loading={isLoading}
          rows={data?.data}
          columns={columns}
          getRowHeight={() => 'auto'}
          sx={{
            [`& .${gridClasses.cell}`]: {
              py: 1,
            },
          }}
        />
      </Paper>
    </Box>
  )
}