'use client'

import SearchAndFiltersLayout from "@/app/components/SearchAndFiltersLayout";
import { cmsFetcher } from "@/app/services/http";
import { Alert, Box, Card, CardContent, CardMedia, Link as MuiLink, Grid, Typography, CardActionArea, Stack, Skeleton, Pagination as MuiPagination } from "@mui/material"
import useSWRImmutable from "swr/immutable";
import qs from 'qs';
import { Pagination, TemaCartografia, TemaInstrumentoPlaneacion } from "@/app/definitions";
import Link from "next/link";
import { DatoGeografico } from "../definitions";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { CartografiaFilters } from "./CartografiaFilters";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useUrlPagination } from "@/app/hooks/useUrlPagination";


const MotionGrid = motion.create(Grid);

const CartografiaTiles = () => {
  const [search, setSearch] = useState('');
  const { page, changePage } = useUrlPagination(1);

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
    sort: ['edicion:desc'],
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
    },
    pagination: {
      pageSize: 6,
      page
    },
  })

  const { data, isLoading, error } = useSWRImmutable<{
    data: DatoGeografico[],
    meta: { pagination: Pagination }
  }>(`/datos-geograficos?${queryParams.toString()}`, cmsFetcher);

  const [datosGeograficos, setDatosGeograficos] = useState<DatoGeografico[]>([])

  useEffect(() => {
    if (!data?.data) return;

    setDatosGeograficos(data.data);
  }, [data]);

  const handleClearFiltros = useCallback(() => {
    methods.reset();
    changePage(1);
  }, [methods, changePage]);

  const handlePageChange = (_: ChangeEvent<unknown>, val: number) => {
    changePage(val);

    window.scrollTo({
      top: 550,
      behavior: 'auto'
    });
  }

  if (error) {
    console.error(error)
    return <Alert severity="error">Hubo un error al obtener los trabajos de planeación</Alert>
  }

  return (
    <Box>
      <FormProvider {...methods}>
        <SearchAndFiltersLayout
          Filters={<CartografiaFilters handleClearFiltros={handleClearFiltros} showClearFilterButton={methods.formState.isDirty} />}
          onDebouncedSearchChange={(val) => { setSearch(val), changePage(1) }}
          hasDirtyFields={methods.formState.isDirty}
          searchBarPlaceholder="Busca por objeto geográfico, "
        />
      </FormProvider>
      <Box minHeight={'600px'}>
        <Grid container spacing={2}>
          <AnimatePresence mode="popLayout">
            {
              !isLoading && datosGeograficos.length > 0
                ? datosGeograficos.map((geografico) => (
                  <MotionGrid
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    key={geografico.documentId}
                    size={{ xs: 12, md: 4 }}
                  >
                    <CartografiaCard geografico={geografico} />
                  </MotionGrid>
                ))
                : (
                  <MotionGrid
                    size={12}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}>
                    <Typography>No se encontraron datos geográficos</Typography>
                  </MotionGrid>
                )
            }
          </AnimatePresence>
        </Grid>
      </Box>
      <Box
        my={2}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        {
          data?.meta && (
            <MuiPagination
              page={page}
              onChange={handlePageChange}
              count={data?.meta.pagination.pageCount}
              size="medium"
            />
          )
        }
      </Box>
    </Box>
  )
}


const CartografiaCard = ({ geografico }: { geografico: DatoGeografico }) => {

  return (
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
      <CardContent sx={{
        flex: 1
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}>
          <MuiLink
            component={Link}
            href={`/cartografia/${geografico.documentId}`}
            color="primary.800"
            title={geografico.objetoGeografico}
            sx={{
              lineHeight: '1.5rem',
              textDecoration: 'none',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              wordBreak: 'break-word',
              overflow: 'hidden'
            }}
            height={'3rem'}
            maxHeight={'3rem'}
            variant="h3"
            fontSize={18}
            mb={1}
            fontWeight={600}>{geografico.objetoGeografico}</MuiLink>
          <Box mt='auto'>
            <Typography variant="body2" color='primary.800'>
              {geografico.tema.descripcion} • {geografico.edicion}
            </Typography>
            <Typography variant="body2" color={'text.secondary'} sx={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              wordBreak: 'break-word',
              overflow: 'hidden'
            }}>
              {geografico.descripcion}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}


export default CartografiaTiles;