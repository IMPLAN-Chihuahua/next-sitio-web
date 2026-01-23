'use client'

import { DatoGeografico } from "@/app/cartografia/definitions"
import { Card, CardActionArea, CardContent, CardMedia, Grid, Link as MuiLink } from "@mui/material"
import Link from "next/link"


const CartografiaCard = ({ capa }: { capa: DatoGeografico }) => {
  return (
    <Grid size={{ xs: 12, sm: 4, md: 3 }} key={capa.documentId}>
      <Card sx={{ maxWidth: { xs: '100%', sm: '300px' } }} variant="outlined">
        <CardActionArea
          LinkComponent={Link}
          href={`/cartografia/${capa.documentId}`}
        >
          <CardMedia
            title={capa.objetoGeografico}
            sx={{ height: '200px', maxHeight: '200px' }}
          image={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${capa.cover?.formats?.small?.url || capa.cover.url}`} />
        </CardActionArea>
        <CardContent sx={{ minHeight: { xs: '80px', sm: '115px' } }}>
          <MuiLink
            component={Link}
            href={`/cartografia/${capa.documentId}`}
            fontWeight={500}
            title={capa.objetoGeografico}
            sx={{
              color: 'primary.800',
              textDecoration: 'none',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              wordBreak: 'break-word',
              overflow: 'hidden'
            }}
          >{capa.objetoGeografico}</MuiLink>
        </CardContent>
      </Card>
    </Grid>
  )
}


export default CartografiaCard;