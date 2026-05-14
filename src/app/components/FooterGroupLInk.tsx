'use client'

import { Link as MuiLink } from '@mui/material'
import Link from 'next/link'


export const FooterGroupLink = ({ enlace }: { enlace: { href: string, label: string } }) => {

  return (
    <MuiLink
      component={Link}
      href={enlace.href}
      color='primary.400'
      variant="body1"
    >
      {
      }{enlace.label}
    </MuiLink>
  )
}