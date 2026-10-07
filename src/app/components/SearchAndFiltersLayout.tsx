'use client'

import { Search, Tune } from "@mui/icons-material"
import { Badge, Collapse, FormControl, Grid, InputLabel, OutlinedInput, ToggleButton } from "@mui/material"
import { ReactNode, useId, useState } from "react";
import { useDebouncedCallback } from "use-debounce";



type SearchAndFiltersLayoutProps = {
  onDebouncedSearchChange: (val: string) => void,
  hasDirtyFields?: boolean,
  Filters: ReactNode,
  searchBarPlaceholder?: string;
}
const SearchAndFiltersLayout = ({ onDebouncedSearchChange, hasDirtyFields = false, Filters, searchBarPlaceholder }: SearchAndFiltersLayoutProps) => {
  const [openFilters, setOpenFilters] = useState(false);
  const searchId = useId();
  const filtersId = useId();

  const toggleFilterDisplay = () => setOpenFilters(pre => !pre);

  const handleDebouncedSearch = useDebouncedCallback((val: string) => {
    onDebouncedSearchChange(val)
  }, 300);

  return (
    <Grid container my={2} spacing={2}>
      <Grid size={{ xs: 12, md: 11 }}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor={searchId}>Buscar</InputLabel>
          <OutlinedInput
            id={searchId}
            placeholder={searchBarPlaceholder || 'Buscar por nombre'}
            onChange={(e) => handleDebouncedSearch(e.currentTarget.value)}
            sx={{ minWidth: '300px' }}
            label='Buscar'
            fullWidth
            endAdornment={<Search sx={{ color: 'primary.700' }} />}
          />
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, md: 1 }} display='flex' justifyContent='center'>
        <Badge
          color="info"
          variant="dot"
          overlap="circular"
          invisible={!hasDirtyFields}
        >
          <ToggleButton
            value='check'
            aria-label="Filtros de búsqueda"
            aria-expanded={openFilters}
            aria-controls={filtersId}
            selected={openFilters}
            onChange={toggleFilterDisplay}
            sx={{
              borderRadius: 50,
              width: 55,
              height: 55,
            }}>
            <Tune sx={{ color: 'primary.700' }} />
          </ToggleButton>
        </Badge>
      </Grid>
      <Grid size={12}>
        <Collapse id={filtersId} in={openFilters}>
          {Filters}
        </Collapse>
      </Grid>
    </Grid>
  )
}

export default SearchAndFiltersLayout;
