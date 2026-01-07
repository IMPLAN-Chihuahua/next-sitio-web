'use client'

import { Autocomplete, TextField } from "@mui/material"
import useSWRImmutable from "swr/immutable"
import { cmsFetcher } from "../services/http"
import { Pagination, ColaboradorExterno } from "../definitions"
import { Controller, useFormContext } from "react-hook-form"


export default function ColaboradoresExternosAutocomplete() {
  const { control } = useFormContext();
  const { data } = useSWRImmutable<{ data: ColaboradorExterno[], meta: { pagination: Pagination } }>('/colaboradores-externos?pagination[pageSize]=100', cmsFetcher)

  return (
    <Controller
      name='colaboradoresExternos'
      control={control}
      render={({ field, fieldState }) => (
        <Autocomplete
          onChange={(_, val) => field.onChange(val)}
          value={field.value}
          multiple
          isOptionEqualToValue={(option, value) => option.documentId === value.documentId}
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
      )}
    />
  )
}