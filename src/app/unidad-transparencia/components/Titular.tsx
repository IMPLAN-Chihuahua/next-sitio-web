'use client'

import { Box, Typography } from "@mui/material"
import { EquipoUnidadTransparencia } from "../definitions"


export const Titular = (props: { titular: EquipoUnidadTransparencia }) => {

  return (
    <Box bgcolor={'primary.100'} borderRadius={1} px={3} py={2} my={3}>
      <Typography color='primary.700' textTransform={'uppercase'} fontWeight={800} letterSpacing={2} fontSize={16}>{props.titular.rol}</Typography>
      <Typography fontWeight={500} fontSize={26}>{props.titular.miembro.prefix} {props.titular.miembro.nombres} {props.titular.miembro.apellidos}</Typography>
      <Typography>Teléfono: {props.titular.telefono}, extensión: {props.titular.extension}</Typography>
    </Box>
  )
}