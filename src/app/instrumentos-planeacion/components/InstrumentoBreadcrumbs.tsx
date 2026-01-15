'use client'

import { Breadcrumbs, Link as MuiLink, Typography } from "@mui/material"
import Link from "next/link"


export const InstrumentoDetailPageBreadcrumbs = (props: { currentPageTitle: string }) => {

  return (
    <Breadcrumbs>
      <MuiLink variant="body2" component={Link} href='/'>Inicio</MuiLink>
      <MuiLink variant="body2" component={Link} href='/instrumentos-planeacion'>Instrumentos de planeación</MuiLink>
      <Typography variant="body2">{props.currentPageTitle}</Typography>
    </Breadcrumbs>
  )
}