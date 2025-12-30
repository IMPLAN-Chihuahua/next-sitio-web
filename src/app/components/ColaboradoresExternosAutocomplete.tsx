'use client'

import { Autocomplete, TextField } from "@mui/material"
import useSWRImmutable from "swr/immutable"
import { cmsFetcher } from "../services/http"
import { Pagination, ColaboradorExterno } from "../definitions"


export default function ColaboradoresExternosAutocomplete() {

  const { data } = useSWRImmutable<{ data: ColaboradorExterno[], meta: { pagination: Pagination } }>('/colaboradores-externos?pagination[pageSize]=100', cmsFetcher)

  return (
    <Autocomplete
      multiple
      options={data?.data || []}
      getOptionLabel={(option) => option.nombre}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          label='Colaboradores externos'
          rows={2}
          sx={{ minWidth: 300 }}
        />
      )}
    />
  )
}