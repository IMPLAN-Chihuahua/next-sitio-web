'use client'

import {
  Box, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Link as MuiLink,
  TextField,
  FormControl,
  OutlinedInput,
  InputLabel,
  Grid,
  Autocomplete,
  Alert,
  AlertTitle,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { Convocatoria, Licitacion } from "../definitions";
import { DatePicker } from '@mui/x-date-pickers'
import { Search } from "@mui/icons-material";
import { useCallback, useMemo, useState } from "react";
import useSWR from 'swr';
import { cmsFetcher } from "@/app/services/http";
import qs from 'qs';
import { useDebounce, useDebouncedCallback } from 'use-debounce'
import { eachYearOfInterval, formatDate, formatISO, parse } from 'date-fns';
import { DataGrid, GridColDef, gridClasses } from '@mui/x-data-grid';
import { Pagination } from "@/app/definitions";



export default function LicitacionesTable() {
  const [search, setSearch] = useState('');
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25
  })
  const [selectedYears, setSelectedYears] = useState<Date[]>([]);
  const years = eachYearOfInterval({ start: new Date(), end: new Date(2000, 0, 1) })
  const queryForLicitaciones = qs.stringify({
    sort: ['fechaInicio:desc'],
    populate: [
      'convocatoria',
      'modificacionesConvocatoria',
      'bases',
      'resolucion',
    ],
    filters: {
      $and: [
        {
          $or: [
            {
              identificador: {
                $containsi: search,
              }
            },
            {
              descripcion: {
                $containsi: search
              }
            },
          ]
        },
        {
          $or: selectedYears.map(date => ({
            fechaInicio: {
              $gte: formatISO(date, { representation: 'date' }),
              $lte: formatISO(new Date(date.getFullYear(), 11, 31), { representation: 'date' })
            }
          }))
        }
      ]
    },
    pagination: {
      page: paginationModel.page + 1,
      pageSize: paginationModel.pageSize
    }
  }, { encodeValuesOnly: true })

  const handleDebouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value)
  }, 300);

  const { data, error, isLoading } = useSWR<{ data: Licitacion[], meta: { pagination: Pagination } }>(`/licitaciones?${queryForLicitaciones.toString()}`, cmsFetcher)

  if (error) {
    return <Alert severity="error">
      Hubo un error al obtener las licitaciones
    </Alert>
  }

  const cols: GridColDef<Licitacion>[] = [{
    field: 'identificador',
    headerName: 'Convocatoria',
    width: 220,
    sortable: false,
    filterable: false,
    renderCell: params => (
      <Box>
        <MuiLink
          href={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${params.row.convocatoria.url}`}
          target='_blank'
          display={'block'}
          my={1}
          maxWidth={'fit-content'}
        >
          {params.row.identificador}
        </MuiLink>
        {
          params.row.modificacionesConvocatoria
          && params.row.modificacionesConvocatoria.map((adjunto, idx) => (
            <MuiLink
              key={adjunto.id}
              href={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${params.row.convocatoria.url}`}
              target='_blank'
              display={'block'}
              ml={1.5}
              maxWidth={'fit-content'}
            >
              {idx + 1}ª Modificación
            </MuiLink>
          ))
        }
      </Box>
    )
  }, {
    field: 'descripcion',
    headerName: 'Descripción',
    width: 300,
    sortable: false,
    filterable: false,
  },
  {
    field: 'fechaInicio',
    headerName: 'Fecha inicio',
    sortable: false,
    width: 130,
    filterable: false,
    valueGetter: (_, row) => formatDate(parse(row.fechaInicio, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy')
  },
  {
    field: 'estatus',
    headerName: 'Estatus',
    width: 115,
    sortable: false,
    filterable: false,
    renderCell: (params) => <Chip sx={{ fontWeight: params.row.estatus === 'Cerrada' ? 500 : 400 }} variant={params.row.estatus === 'Cerrada' ? "filled" : "outlined"} label={params.row.estatus} />
  },
  {
    field: 'bases',
    headerName: 'Bases',
    sortable: false,
    width: 200,
    filterable: false,
    renderCell: params => (
      <Box>
        {
          params.row.bases
          && params.row.bases.map(adjunto => (
            <MuiLink
              key={adjunto.id}
              href={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${adjunto.url}`}
              target='_blank'
              mt={1}
              display={'block'}
              maxWidth={'fit-content'}
            >
              {adjunto.name}
            </MuiLink>
          ))
        }
      </Box>
    )
  }, {
    field: 'resolucion',
    headerName: 'Resolución',
    width: 200,
    filterable: false,
    sortable: false,
    renderCell: params => (
      <Box>
        {
          params.row.resolucion
          && params.row.resolucion.map(adjunto => (
            <MuiLink
              key={adjunto.id}
              href={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${adjunto.url}`}
              target='_blank'
              mt={1}
              display={'block'}
              maxWidth={'fit-content'}
            >
              {adjunto.name}
            </MuiLink>
          ))
        }
      </Box>
    )
  }
  ]

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
              placeholder="por identificador o descripción"
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
          columns={cols}
          rowSpacingType="margin"
          rows={data?.data}
          pageSizeOptions={[5, 10, 25, 50, 100]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          paginationMode="server"
          rowCount={data?.meta.pagination.total || 0}
          sx={{
            [`& .${gridClasses.cell}`]: {
              py: 1,
            },
          }}

          getRowHeight={() => 'auto'}
        />
      </Paper>
    </Box>
  )
}