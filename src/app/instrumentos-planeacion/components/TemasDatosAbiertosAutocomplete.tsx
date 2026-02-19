'use client'

import { Autocomplete, CircularProgress, TextField } from "@mui/material"
import useSWRImmutable from "swr/immutable"
import { Controller, useFormContext } from "react-hook-form"
import { Pagination, TemaInstrumentoPlaneacion } from "@/app/definitions";
import { cmsFetcher } from "@/app/services/http";


export default function TemasInstrumentoPlaneacionAutocomplete({ label, name }: { name: string, label?: string }) {
  const { control } = useFormContext();
  const { data, isLoading } = useSWRImmutable<{ data: TemaInstrumentoPlaneacion[], meta: { pagination: Pagination} }>('/temas-instrumento-planeacion?pagination[pageSize]=100', cmsFetcher)

  if (isLoading) {
    return <CircularProgress />
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Autocomplete
          noOptionsText='No se encontraron opciones'
          multiple
          value={field.value}
          onChange={(_, val) => field.onChange(val)}
          getOptionLabel={option => option.tema || ''}
          isOptionEqualToValue={(option, value) => option.documentId === value.documentId}
          options={data?.data || []}
          renderInput={params => (
            <TextField {...params} sx={{ minWidth: 220 }} label={label || 'Tags'} />
          )}
        />
      )}
    />
  )
}