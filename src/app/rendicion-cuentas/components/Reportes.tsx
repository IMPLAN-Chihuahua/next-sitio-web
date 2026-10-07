'use client'

import { cmsFetcher } from "@/app/services/http"
import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Chip, CircularProgress, Link, Table, TableCell, TableContainer, TableHead, Typography } from "@mui/material"
import useSWRImmutable from "swr/immutable"
import qs from 'qs';
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ExpandMore, More, UnfoldMore } from "@mui/icons-material";
import { MultipleMedia } from "@/app/definitions";
import { filesize } from "filesize";
import { ReporteFinanciero } from "../definitions";



const MotionBox = motion.create(Box);

const Reportes = ({ year }: { year: number }) => {
  const params = qs.stringify({
    filters: {
      anio: {
        $eq: year
      }
    },
    populate: ['reportes', 'reportes.adjuntos'],
    sort: ['trimestre:asc']
  })
  const { data, isLoading, error } = useSWRImmutable(`/reportes-financieros?${params.toString()}`, cmsFetcher);

  const [reportes, setReportes] = useState<ReporteFinanciero[]>([]);

  useEffect(() => {
    if (!data?.data) return;

    setReportes(data?.data);
  }, [data])


  if (error) {
    return (
      <Alert severity="error">
        Hubo un error al consultar los reportes financieros del año {year}
      </Alert>
    );
  }

  return (
    <MotionBox
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: .3 }}
    >
      {
        isLoading ? (
          <CircularProgress />
        ) :
          reportes.map((reporte, idx) => (
            <Accordion
              disableGutters
              variant="outlined"
              key={reporte.documentId}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls={`panel-${idx + 1}-reportes-trimestre-${reporte.trimestre ? reporte.trimestre : 'anual'}-año-${year}`}
                id={`panel-${idx + 1}`}
              >
                {reporte.trimestre ? (
                  <Typography fontWeight={500} fontSize={18}>
                    {reporte.trimestre}{
                      reporte.trimestre === 1 || reporte.trimestre === 3
                        ? 'er'
                        : reporte.trimestre === 2
                          ? 'do'
                          : 'to'} Trimestre
                  </Typography>
                ) : (
                  <Typography fontWeight={500} fontSize={18}>Anual</Typography>
                )}
              </AccordionSummary>
              <AccordionDetails>
                {
                  reporte.reportes.map((r: any) => (
                    <AccordionAdjuntos key={r.id} grupo={r.grupo} adjuntos={r.adjuntos} />
                  ))
                }
              </AccordionDetails>
            </Accordion>
          ))
      }
    </MotionBox>
  )
}


const AccordionAdjuntos = ({ grupo, adjuntos }: { grupo: string, adjuntos: MultipleMedia }) => {
  return (
    <Accordion
      variant="outlined"
    >
      <AccordionSummary
        expandIcon={<UnfoldMore />}
      >
        <Typography color={'text.secondary'} fontWeight={500}>{grupo} <Box component={'span'}>({adjuntos.length})</Box></Typography>
      </AccordionSummary>
      <AccordionDetails>
        <ul style={{ listStyle: 'none' }}>
          {
            adjuntos.sort((a, b) => {
              const nameA = a.name.toUpperCase();
              const nameB = b.name.toUpperCase();
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }
              return 0
            }).map((adjunto, idx) => (
              <Box component='li' mt={1.3} key={adjunto.documentId}>
                <Link
                  href={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${adjunto.url}`}
                  target={'_blank'}
                  sx={{ wordBreak: 'break-all' }}
                >{adjunto.name} ({filesize(adjunto.size * 1000, { standard: 'jedec' })})</Link>
              </Box>
            ))
          }
        </ul>
      </AccordionDetails>
    </Accordion>
  )
}


export default Reportes;