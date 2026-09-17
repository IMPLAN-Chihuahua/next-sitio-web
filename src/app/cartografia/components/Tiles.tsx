'use client'

import SearchAndFiltersLayout from "@/app/components/SearchAndFiltersLayout";
import { cmsFetcher } from "@/app/services/http";
import { Alert, Box, Grid, Typography, Pagination as MuiPagination, CircularProgress } from "@mui/material"
import useSWRImmutable from "swr/immutable";
import qs from 'qs';
import { Pagination, TemaCartografia } from "@/app/definitions";
import CartografiaCard from "./CartografiaCard";
import { DatoGeografico } from "../definitions";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { CartografiaFilters } from "./CartografiaFilters";
import { ChangeEvent, useCallback, useState } from "react";
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

  const datosGeograficos = data?.data ?? [];

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
          onDebouncedSearchChange={(val) => { setSearch(val); changePage(1); }}
          hasDirtyFields={methods.formState.isDirty}
          searchBarPlaceholder="Busca por objeto geográfico, "
        />
      </FormProvider>
      <Box minHeight={'600px'}>
        <Grid container spacing={2}>
          <AnimatePresence mode="popLayout">
            {
              isLoading
                ? (<CircularProgress />)
                : datosGeograficos.length > 0
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


export default CartografiaTiles;
