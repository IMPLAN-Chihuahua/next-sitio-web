'use client'

import { Breadcrumbs, Link as MuiLink, Typography } from "@mui/material";
import Link from "next/link";

const CartografiaDetailPageBreadcrumbs = ({ currentPageTitle }: { currentPageTitle: string }) => {


  return (
    <Breadcrumbs>
      <MuiLink variant="body2" component={Link} href='/'>Inicio</MuiLink>
      <MuiLink variant="body2" component={Link} href='/cartografia'>Cartografía</MuiLink>
      <Typography variant="body2">{currentPageTitle}</Typography>
    </Breadcrumbs>
  )
}


export default CartografiaDetailPageBreadcrumbs;