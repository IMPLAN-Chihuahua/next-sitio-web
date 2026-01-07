'use client'

import { Autocomplete, CircularProgress, TextField } from "@mui/material"
import useSWRImmutable from "swr/immutable"
import { Pagination, Tag } from "../definitions"
import { cmsFetcher } from "../services/http"
import { Controller, useFormContext } from "react-hook-form"


export default function TagsAutocomplete({ label }: { label?: string }) {
  const { control } = useFormContext();
  const { data, isLoading } = useSWRImmutable<{ data: Tag[], meta: { pagination: Pagination } }>('/tags?pagination[pageSize]=100', cmsFetcher)

  if (isLoading) {
    return <CircularProgress />
  }

  return (
    <Controller
      name='tags'
      control={control}
      render={({ field, fieldState }) => (
        <Autocomplete
          multiple
          value={field.value}
          onChange={(_, val) => field.onChange(val)}
          getOptionLabel={option => option.name}
          isOptionEqualToValue={(option, value) => option.documentId === value.documentId}
          options={data?.data || []}
          renderInput={params => (
            <TextField {...params} sx={{ minWidth: 200 }} label={label || 'Tags'} />
          )}
        />
      )}
    />
  )
}