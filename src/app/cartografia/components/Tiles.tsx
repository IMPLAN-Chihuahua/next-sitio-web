'use client'

import SearchAndFiltersLayout from "@/app/components/SearchAndFiltersLayout";
import { cmsFetcher } from "@/app/services/http";
import { Alert, Box, Card, CardContent, CardMedia, Link as MuiLink, Grid, Typography, CardActionArea, Stack, Skeleton } from "@mui/material"
import useSWRImmutable from "swr/immutable";
import qs from 'qs';
import { Pagination, TemaCartografia, TemaInstrumentoPlaneacion } from "@/app/definitions";
import Link from "next/link";
import { DatoGeografico } from "../definitions";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { CartografiaFilters } from "./CartografiaFilters";
import { useCallback, useState } from "react";



const CartografiaTiles = () => {
  const [search, setSearch] = useState('');

  const methods = useForm<{
    ediciones: number[],
    geometria: string,
    temas: TemaCartografia[]
  }>({
    defaultValues: {
      ediciones: [],
      geometria: '',
      temas: []
    }
  });

  const values = useWatch({ control: methods.control })

  const queryParams = qs.stringify({
    fields: ['objetoGeografico', 'geometria', 'edicion', 'descripcion'],
    populate: ['cover', 'tema'],
    order: ['edicion:asc'],
    filters: {
      $and: [
        {
          $or: [
            {
              objetoGeografico: {
                $containsi: search
              }
            }
          ],


        },
        {
          tema: {
            documentId: {
              $in: values?.temas?.map((tema) => tema.documentId)
            }
          }
        },
        {
          geometria: {
            $contains: values?.geometria
          }
        },
        {
          edicion: {
            $in: values?.ediciones
          }
        }
      ]
    }
  })

  const { data, isLoading, error } = useSWRImmutable<{
    data: DatoGeografico[],
    meta: { pagination: Pagination }
  }>(`/datos-geograficos?${queryParams.toString()}`, cmsFetcher);

  const handleClearFiltros = useCallback(() => {
    methods.reset();
  }, []);


  if (error) {
    console.error(error)
    return <Alert severity="error">Hubo un error al obtener los trabajos de planeación</Alert>
  }

  return (
    <Box>
      <FormProvider {...methods}>
        <SearchAndFiltersLayout
          Filters={<CartografiaFilters handleClearFiltros={handleClearFiltros} showClearFilterButton={methods.formState.isDirty} />}
          onDebouncedSearchChange={(val) => setSearch(val)}
          hasDirtyFields={methods.formState.isDirty}
          searchBarPlaceholder="Busca por objeto geográfico, "
        />
      </FormProvider>
      <Box minHeight={'600px'}>
        {
          isLoading
            ? <CartografiaTilesSkeleton />
            : data?.data
              ? (
                <Grid container spacing={2}>
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
                              {geografico.tema.descripcion} • {geografico.edicion}
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
              )
              : <Typography>No se encontraron resultados</Typography>
        }
      </Box>
    </Box>
  )
}



const CartografiaTilesSkeleton = () => {

  return (
    <Grid container spacing={2}>
      {
        [...Array(3)].map((_, i) => (
          <Grid size={{ xs: 12, md: 4 }} key={i}>
            <Box>
              <Skeleton variant="rectangular" height={400} />
              <Skeleton variant="text" sx={{ fontSize: '2.5rem', mb: .5 }} />
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
              <Skeleton variant="text" sx={{ maxWidth: '40%', fontSize: '1rem' }} />
            </Box>
          </Grid>
        ))
      }
    </Grid>

  )
}



export default CartografiaTiles;