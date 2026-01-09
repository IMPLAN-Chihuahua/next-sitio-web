'use client'

import { Breadcrumbs, Link as MuiLink, Typography } from "@mui/material"
import Link from "next/link"


export const TrabajoPageBreadcrumbs = (props: { currentPageTitle: string }) => {

  return (
    <Breadcrumbs>
      <MuiLink variant="body2" component={Link} href='/'>Inicio</MuiLink>
      <MuiLink variant="body2" component={Link} href='/trabajos-planeacion'>Trabajos de planeación</MuiLink>
      <Typography variant="body2">{props.currentPageTitle}</Typography>
    </Breadcrumbs>
  )
}