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
    sort: ['convocatoria.fechaInicio:desc'],
    populate: [
      'convocatoria.convocatoria',
      'convocatoria.modificaciones',
      'bases.bases',
      'bases.modificaciones',
      'bases.actaApertura',
      'bases.actaJuntaAclaraciones',
      'bases.actaApertura',
      'bases.basesEditable',
      'bases.sesionesExtraordinarias',
      'resolucion.actaFallo',
      'resolucion.actaDiferimientoFallo',
      'resolucion.cancelacionLicitacion'
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
          convocatoria: {
            $or: selectedYears.map(date => ({
              fechaInicio: {
                $gte: formatISO(date, { representation: 'date' }),
                $lte: formatISO(new Date(date.getFullYear(), 11, 31), { representation: 'date' })
              }
            }))
          }
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
    headerName: 'Identificador',
    width: 180,
    sortable: false,
    filterable: false,
  }, {
    field: 'descripcion',
    headerName: 'Adquisición',
    width: 300,
    sortable: false,
    filterable: false,
  },
  {
    field: '_fechaInicio',
    headerName: 'Fecha inicio',
    sortable: false,
    width: 130,
    filterable: false,
    valueGetter: (_, row) => formatDate(parse(row.convocatoria.fechaInicio, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy')
  },
  {
    field: 'estatus',
    headerName: 'Estatus',
    width: 115,
    sortable: false,
    filterable: false,
    renderCell: (params) => <Chip sx={{ fontWeight: 500 }} variant="outlined" label={params.row.estatus} />
  },
  {
    field: 'convocatoria',
    headerName: 'Convocatoria',
    width: 180,
    filterable: false,
    sortable: false,
    renderCell: (params) => (
      <Box>
        <MuiLink
          href={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${params.row.convocatoria.convocatoria.url}`}
          target='_blank'
        >
          Convocatoria
        </MuiLink>
        <ul style={{ listStyle: 'none', marginTop: '8px' }}>
          {

            params.row.convocatoria.modificaciones
            && params.row.convocatoria.modificaciones.map((mod, idx) => (
              <li key={mod.documentId}>
                <MuiLink
                  href={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${mod.url}`}
                  target='_blank'
                >
                  {idx + 1}ª  Modificacion de la convocatoria
                </MuiLink>
              </li>
            ))
          }
        </ul>
      </Box>
    ),
  }, {
    field: 'bases',
    headerName: 'Bases',
    width: 200,
    filterable: false,
    sortable: false,
    renderCell: (params) => (<Box>
      {params.row.bases && (
        <ul style={{ listStyleType: 'none' }}>
          <li>
            <MuiLink
              target='_blank'
              href={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${params.row.bases.bases.url}`}
            >Bases</MuiLink>
          </li>
          {
            params.row.bases.modificaciones &&
            params.row.bases.modificaciones.map((modificacion, idx) => (
              <li style={{ marginTop: '8px' }} key={modificacion.documentId}>
                <MuiLink
                  target='_blank'
                  href={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${modificacion.url}`}
                >{idx + 1}ª Modificación bases</MuiLink>
              </li>
            ))
          }
          {
            params.row.bases.actaJuntaAclaraciones && (
              <li style={{ marginTop: '8px' }} key={params.row.bases.actaJuntaAclaraciones.documentId}>
                <MuiLink
                  target='_blank'
                  href={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${params.row.bases.actaJuntaAclaraciones.url}`}
                >Junta de aclaraciones</MuiLink>
              </li>
            )
          }
          {
            params.row.bases.actaApertura && (
              <li style={{ marginTop: '8px' }}>
                <MuiLink
                  target='_blank'
                  href={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${params.row.bases.actaApertura.url}`}
                >Acta de apertura</MuiLink>
              </li>
            )
          }

          {
            params.row.bases.sesionesExtraordinarias
            && params.row.bases.sesionesExtraordinarias.map((sesion, idx) => (
              <li style={{ marginTop: '8px' }} key={sesion.documentId}>
                <MuiLink
                  target='_blank'
                  href={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${sesion.url}`}
                >{idx + 1}ª sesión extraordinaria</MuiLink>
              </li>
            ))
          }
        </ul>
      )}
    </Box>)
  }, {
    field: 'resolucion',
    headerName: 'Resolución',
    width: 180,
    filterable: false,
    sortable: false,
    renderCell: (params) => {
      if (!params.row.resolucion) {
        return null;
      }
      return <MuiLink
        href={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${params.row.resolucion.actaFallo.url}`}
        target='_blank'
      >Fallo</MuiLink>
    }
  }]

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