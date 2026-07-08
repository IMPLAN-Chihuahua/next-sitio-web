'use client'

import { AnioAutocomplete } from "@/app/estudios-y-propuestas/components/Tiles";
import { Clear } from "@mui/icons-material";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { TemasCartografiaAutocomplete } from "./TemasCartografiaAutocomplete";


const CartografiaFilters = ({ handleClearFiltros, showClearFilterButton }: { handleClearFiltros: () => void, showClearFilterButton: boolean }) => {

  return (
    <Box component={'form'}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <AnioAutocomplete
          label='Edición'
          name='ediciones'
        />
        <GeometriaSelect />
        <TemasCartografiaAutocomplete name='temas' label='Temas' />
        {
          showClearFilterButton && (
            <Button
              endIcon={<Clear />}
              sx={{ justifySelf: 'center', alignSelf: 'center' }}
              size="large"
              disableRipple
              variant="text"
              onClick={handleClearFiltros}>Borrar filtros</Button>
          )
        }
      </Stack>
    </Box>
  );
}


const GeometriaSelect = () => {
  const { control, } = useFormContext();


  return (
    <Controller
      control={control}
      name='geometria'
      render={({ field, fieldState }) => (
        <FormControl sx={{ minWidth: '220px' }}>
          <InputLabel id='geometria-select'>Geometría</InputLabel>
          <Select
            value={field.value}
            onChange={field.onChange}
            labelId="geometria-selec"
            label='Geometría'
          >
            <MenuItem value='Puntos'>Puntos</MenuItem>
            <MenuItem value='Líneas'>Líneas</MenuItem>
            <MenuItem value='Polígonos'>Polígonos</MenuItem>
          </Select>
        </FormControl>
      )}
    />
  )
}

export {
  CartografiaFilters
}