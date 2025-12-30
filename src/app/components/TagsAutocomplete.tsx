'use client'

import { Autocomplete, CircularProgress, TextField } from "@mui/material"
import useSWRImmutable from "swr/immutable"
import { Pagination, Tag } from "../definitions"
import { cmsFetcher } from "../services/http"


export default function TagsAutocomplete({ label }: { label?: string }) {
  const { data, isLoading } = useSWRImmutable<{ data: Tag[], meta: { pagination: Pagination } }>('/tags?pagination[pageSize]=100', cmsFetcher)

  if (isLoading) {
    return <CircularProgress />
  }

  return (
    <Autocomplete
      multiple
      getOptionLabel={option => option.name}
      options={data?.data || []}
      renderInput={params => (
        <TextField {...params} sx={{ minWidth: 200 }} label={label || 'Tags'} />
      )}
    />
  )
}