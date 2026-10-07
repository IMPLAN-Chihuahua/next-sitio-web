'use client'

import { Pagination, TemaCartografia } from "@/app/definitions";
import { cmsFetcher } from "@/app/services/http";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import useSWRImmutable from "swr/immutable";



export const TemasCartografiaAutocomplete = ({ name, label = '' }: { name: string, label?: string }) => {
  const { control } = useFormContext();
  const { data, isLoading } = useSWRImmutable<{ data: TemaCartografia[], meta: { pagination: Pagination } }>('/temas-cartografia?pagination[pageSize]=100', cmsFetcher)

  if (isLoading) {
    return <CircularProgress aria-label="Cargando temas de cartografía" />
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Autocomplete
          noOptionsText='No se encontraron opciones'
          multiple
          value={field.value}
          onChange={(_, val) => field.onChange(val)}
          getOptionLabel={option => option.descripcion || ''}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          options={data?.data || []}
          renderInput={params => (
            <TextField {...params} sx={{ minWidth: 220 }} label={label || 'Temas'} />
          )}
        />
      )}
    />
  )
}
