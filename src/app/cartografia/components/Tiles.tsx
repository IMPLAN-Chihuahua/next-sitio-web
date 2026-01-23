'use client'

import SearchAndFiltersLayout from "@/app/components/SearchAndFiltersLayout";
import { cmsFetcher } from "@/app/services/http";
import { Alert, Box, Card, CardContent, CardMedia, Link as MuiLink, Grid, Typography, CardActionArea } from "@mui/material"
import useSWRImmutable from "swr/immutable";
import qs from 'qs';
import { Pagination } from "@/app/definitions";
import Link from "next/link";
import { DatoGeografico } from "../definitions";



const CartografiaTiles = () => {
  const queryParams = qs.stringify({
    fields: ['objetoGeografico', 'geometria', 'edicion', 'descripcion'],
    populate: ['cover', 'temaDatosAbiertos'],
    order: ['edicion:asc']
  })

  const { data, isLoading, error } = useSWRImmutable<{ data: DatoGeografico[], meta: { pagination: Pagination } }>(`/datos-geograficos?${queryParams.toString()}`, cmsFetcher)

  if (error) {
    console.error(error)
    return <Alert severity="error">Hubo un error al obtener los trabajos de planeación</Alert>
  }

  return (
    <Box>
      <SearchAndFiltersLayout
        Filters={<pre>edicion | geometria | tema </pre>}
        onDebouncedSearchChange={console.log}
        hasDirtyFields={false}
        searchBarPlaceholder="por..."

      />
      <Grid container spacing={2} >
        {
          data?.data.map((geografico) => (
            <Grid key={geografico.documentId} size={{ xs: 12, md: 4 }} >
              <Card
                variant="outlined"
                sx={{
                  display: 'flex',
                  height: '100%',
                  flexDirection: 'column',
                  position: 'relative',
                  maxWidth: { xs: 'auto', sm: '400px' },
                }}>
                <Typography
                  position={'absolute'}
                  top={10}
                  right={10}
                  bgcolor={'primary.50'}
                  p={1}
                  variant='body2'
                  fontWeight={500}
                  zIndex={10}
                >
                  {geografico.geometria}
                </Typography>
                <CardActionArea
                  LinkComponent={Link}
                  href={`/cartografia/${geografico.documentId}`}
                  disableTouchRipple
                  disableRipple
                >
                  <CardMedia
                    sx={{ height: '375px', maxHeight: '375px', width: '375px' }}
                    image={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${geografico.cover?.formats?.small.url || geografico.cover.url}`}
                  />
                </CardActionArea>
                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <MuiLink
                    component={Link}
                    href={`/cartografia/${geografico.documentId}`}
                    color="primary.800"
                    title={geografico.objetoGeografico}
                    sx={{
                      lineHeight: '1.5rem',
                      textDecoration: 'none',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      wordBreak: 'break-word',
                      overflow: 'hidden'
                    }}
                    variant="h3"
                    fontSize={18}
                    fontWeight={600}>{geografico.objetoGeografico}</MuiLink>
                  <Typography variant="body2" color='primary.800' mb={1}>
                    {geografico.temaDatosAbiertos.tema} • {geografico.edicion}
                  </Typography>
                  <Box mt='auto'>
                    <Typography variant="body2" color={'text.secondary'} sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: 'vertical',
                      wordBreak: 'break-word',
                      overflow: 'hidden'
                    }}>
                      {geografico.descripcion}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        }
      </Grid>
    </Box>
  )
}



export default CartografiaTiles;