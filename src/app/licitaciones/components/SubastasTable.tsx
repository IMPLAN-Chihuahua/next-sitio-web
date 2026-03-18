'use client'

import { Box, Chip, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { Subasta } from "../definitions"


export const SubastasTable = (props: { subastas: Subasta[] }) => {
  return (
    <TableContainer component={Paper} variant='outlined'>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: 'primary.200' }}>
            <TableCell>Identificador</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Archivos adjuntos</TableCell>
            <TableCell>Estatus</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.subastas.map((subasta) => (
            <TableRow key={subasta.documentId}>
              <TableCell>{subasta.identificador}</TableCell>
              <TableCell>{subasta.shortDescripcion}</TableCell>
              <TableCell>
                <Link
                  href={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${subasta.convocatoria.url}`}
                  target='_blank'
                  display={'block'}
                  maxWidth={'fit-content'}
                >
                  Convocatoria
                </Link>
                <Link
                  href={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${subasta.bases.url}`}
                  target='_blank'
                  display={'block'}
                  maxWidth={'fit-content'}
                >
                  Bases
                </Link>
                {
                  subasta.resolucion && (
                    <Link
                      href={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${subasta.resolucion.url}`}
                      target='_blank'
                      display={'block'}
                      maxWidth={'fit-content'}
                    >
                      Resolución
                    </Link>
                  )
                }
                {
                  subasta.aperturaPosturas && (
                    <Link
                      href={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${subasta.aperturaPosturas.url}`}
                      target='_blank'
                      display={'block'}
                      maxWidth={'fit-content'}
                    >
                      Apertura de posturas
                    </Link>
                  )
                }
                {
                  subasta.juntaAclaraciones && (
                    <Link
                      href={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${subasta.juntaAclaraciones.url}`}
                      target='_blank'
                      display={'block'}
                      maxWidth={'fit-content'}
                    >
                      Junta de aclaraciones
                    </Link>
                  )
                }
                {
                  subasta.otros?.map(otro => (
                    <Link
                      key={otro.documentId}
                      href={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${otro.url}`}
                      target='_blank'
                      display={'block'}
                      maxWidth={'fit-content'}
                    >
                      {otro.name}
                    </Link>
                  ))
                }
              </TableCell>
              <TableCell>
                <Chip label={subasta.estatus} sx={{ fontWeight: 500 }} variant="outlined" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}