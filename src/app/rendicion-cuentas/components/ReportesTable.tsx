'use client'

import { SubtitleH2 } from "@/app/components/Titles"
import { Box, Chip, CircularProgress, Stack, Tab, Typography } from "@mui/material"
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { useState } from "react"
import dynamic from "next/dynamic"
import { AnimatePresence } from "framer-motion"

const DynamicReportes = dynamic(() => import('./Reportes'), { loading: () => <CircularProgress /> })


export const CuentaPublicaSection = ({ availableYears }: { availableYears: number[] }) => {

  return (
    <Box component={'section'} minHeight={400}>
      <SubtitleH2 title='Cuenta pública' />
      <Typography>
        La cuenta pública representa una evaluación financiera de todas las acciones del Instituto y permite determinar el grado de aplicación de la Ley de Ingresos y del Presupuesto de Egresos del Municipio de Chihuahua.
      </Typography>
      <ReportesTabs availableYears={availableYears} />
    </Box>
  )
}


const ReportesTabs = ({ availableYears }: { availableYears: number[] }) => {
  const [value, setValue] = useState(availableYears[0]);

  return (
    <Box sx={{ width: '100%' }}>
      <TabContext value={value}>
        <Box>
          <TabList onChange={(_, val) => setValue(val)} aria-label="Años">
            {
              availableYears.map(y => (
                <Tab label={y} value={y} key={y} />
              ))
            }
          </TabList>
        </Box>
        <AnimatePresence mode='popLayout'>
          {
            availableYears.map(y => (
              <TabPanel value={y} key={y} sx={{ px: 0 }}>
                <DynamicReportes year={y} />
              </TabPanel>
            ))
          }
        </AnimatePresence>
      </TabContext>
    </Box>
  )
}