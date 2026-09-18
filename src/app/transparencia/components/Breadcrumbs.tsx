'use client'

import { Breadcrumbs, Link as MuiLink, Typography } from "@mui/material"
import Link from "next/link"



export const TransparenciaBreadcrumbs = ({ currentPageTitle }: { currentPageTitle: string }) => {

    return (
        <Breadcrumbs>
            <MuiLink variant="body2" component={Link} href='/'>Inicio</MuiLink>
            <MuiLink variant="body2" component={Link} href='/transparencia'>Transparencia</MuiLink>
            <Typography variant="body2">{currentPageTitle}</Typography>
        </Breadcrumbs>
    )
}