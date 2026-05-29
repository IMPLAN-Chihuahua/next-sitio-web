'use client'

import {
  Box, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Link as MuiLink,
  TextField,
  FormControl,
  OutlinedInput,
  InputLabel,
  Grid,
  Alert,
  AlertTitle,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { Licitacion } from "../definitions";
import { DatePicker } from '@mui/x-date-pickers'
import { Search } from "@mui/icons-material";
import { useCallback, useMemo, useState } from "react";
import useSWR from 'swr';
import { cmsFetcher } from "@/app/services/http";
import qs from 'qs';
import { useDebounce, useDebouncedCallback } from 'use-debounce'
import { formatDate, parse } from 'date-fns';
import { DataGrid, GridColDef, gridClasses } from '@mui/x-data-grid';
import { Pagination } from "@/app/definitions";

type Archivo = {
  id: number;
  name: string;
  url: string;
}

type ArchivoGrupo = {
  id: number;
  Nombre: string;
  Archivo: Archivo[];
}

const getFileUrl = (url?: string) => {
  if (!url) return '#';

  if (url.startsWith('http')) return url;

  return `${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${url}`;
};

const renderArchivoGrupos = (grupos?: ArchivoGrupo[]) => {
  if (!grupos?.length) return null;

  return (
    <Box>
      {grupos.flatMap((grupo) =>
        grupo.Archivo?.map((archivo) => (
          <MuiLink
            key={`${grupo.id}-${archivo.id}`}
            href={getFileUrl(archivo.url)}
            target="_blank"
            display="block"
            mt={1}
            maxWidth="fit-content"
            underline="hover"
          >
            {grupo.Nombre}
          </MuiLink>
        )) ?? []
      )}
    </Box>
  );
};


export default function LicitacionesTable() {
  const [search, setSearch] = useState('');
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25
  })

  const [selectedYears, setSelectedYears] = useState<number[]>([new Date().getFullYear()]);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2018 + 1 }, (_, i) => currentYear - i);

  const queryForLicitaciones = qs.stringify({
    sort: ['createdAt:desc'],
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
        ...(selectedYears.length > 0 ? [{
          $or: selectedYears.map(year => ({
            fechaInicio: {
              $gte: `${year}-01-01`,
              $lte: `${year}-12-31`
            }
          }))
        }] : [])
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

  const { data, error, isLoading } = useSWR<{ data: Licitacion[], meta: { pagination: Pagination } }>(
    `/licitaciones?${queryForLicitaciones}`,
    cmsFetcher
  )

  if (error) {
    return <Alert severity="error">
      Hubo un error al obtener las licitaciones
    </Alert>
  }

  const cols: GridColDef<Licitacion>[] = [
    {
      field: 'descripcion',
      headerName: 'Descripción',
      flex: 2,
      minWidth: 420,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box
          sx={{
            whiteSpace: 'normal',
            lineHeight: 1.45,
            py: 1,
          }}
        >
          {params.row.descripcion}
        </Box>
      )
    },
    {
      field: 'Convocatoria',
      headerName: 'Convocatoria',
      sortable: false,
      width: 200,
      filterable: false,
      renderCell: params => renderArchivoGrupos(params.row.Convocatoria)
    },
    {
      field: 'Bases',
      headerName: 'Bases',
      sortable: false,
      width: 200,
      filterable: false,
      renderCell: params => renderArchivoGrupos(params.row.Bases)
    },
    {
      field: 'Resolucion',
      headerName: 'Resolución',
      width: 200,
      filterable: false,
      sortable: false,
      renderCell: params => renderArchivoGrupos(params.row.Resolucion)
    },
    {
      field: 'estatus',
      headerName: 'Estatus',
      width: 115,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Chip
          sx={{ fontWeight: params.row.estatus === 'Cerrada' ? 500 : 400 }}
          variant={params.row.estatus === 'Cerrada' ? 'filled' : 'outlined'}
          label={params.row.estatus}
        />
      )
    }
  ];

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
          <FormControl fullWidth>
            <InputLabel id="label-seleccionar-anios">Seleccionar años</InputLabel>
            <Select
              labelId="label-seleccionar-anios"
              id="select-anios"
              multiple
              value={selectedYears}
              onChange={(e) => {
                const { value } = e.target;
                setSelectedYears(
                  typeof value === 'string' ? value.split(',').map(Number) : (value as number[])
                );
              }}
              input={<OutlinedInput label="Seleccionar años" />}
              renderValue={(selected) =>
                selected.length === 0 ? '' : `Años: ${selected.join(', ')}`
              }
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  <Checkbox checked={selectedYears.indexOf(year) > -1} />
                  <ListItemText primary={year} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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