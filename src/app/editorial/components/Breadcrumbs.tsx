'use client'

import { Breadcrumbs, Link as MuiLink, Typography } from "@mui/material"
import Link from "next/link"



export const NovedadBreadcrumbs = ({ currentPageTitle }: { currentPageTitle: string }) => {

  return (
    <Breadcrumbs sx={{ mb: 3 }}>      <MuiLink variant="body2" component={Link} href='/'>Inicio</MuiLink>
      <MuiLink variant="body2" component={Link} href='/editorial'>Editorial</MuiLink>
      <Typography variant="body2">{currentPageTitle}</Typography>
    </Breadcrumbs>
  )
}