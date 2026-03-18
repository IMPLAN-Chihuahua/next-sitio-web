'use client'

import { Box, Grid, Typography } from "@mui/material"
import { EquipoUnidadTransparencia } from "../definitions"


export const Miembros = (props: { miembros: EquipoUnidadTransparencia[] }) => {
  const [presidente] = props.miembros.filter(m => m.rol === 'Presidente');

  return (
    <Grid container spacing={3} my={3}>
      <Grid size={12} display={'flex'} justifyContent={'center'}>
        <Box bgcolor={'primary.100'} px={3} py={2} borderRadius={1} width={'100%'}>
          <Typography color='primary.700' textTransform={'uppercase'} fontWeight={800} letterSpacing={2} fontSize={16}>{presidente.rol}</Typography>
          <Typography fontSize={26} fontWeight={500}>{presidente.miembro.prefix} {presidente.miembro.nombres} {presidente.miembro.apellidos}</Typography>
          <Typography>Teléfono: {presidente.telefono}, extensión: {presidente.extension}</Typography>
        </Box>
      </Grid>
      {
        props.miembros
          .filter(m => m.rol !== 'Presidente' && m.rol !== 'Titular')
          .map(m => (
            <Grid size={{ xs: 12, md: 6 }} key={m.miembro.documentId}>
              <Box bgcolor={'primary.100'} px={3} py={2} height={'100%'} borderRadius={1}>
                <Typography 
                  color='primary.700' 
                  textTransform={'uppercase'} 
                  fontWeight={800} 
                  letterSpacing={2} 
                  fontSize={16}>{m.rol}</Typography>
                <Typography fontSize={26} fontWeight={500}>{m.miembro.prefix} {m.miembro.nombres} {m.miembro.apellidos}</Typography>
                <Typography>Teléfono: {m.telefono}, extensión: {m.extension}</Typography>
              </Box>
            </Grid>
          ))
      }
    </Grid>
  )
}