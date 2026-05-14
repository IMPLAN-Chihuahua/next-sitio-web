'use client'

import { Box, Chip, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { Subasta } from "../definitions"


export const SubastasTable = (props: { subastas: Subasta[] }) => {
  return (
    <TableContainer component={Paper} variant='outlined'>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Convocatoria</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Bases</TableCell>
            <TableCell>Resolución</TableCell>
            <TableCell>Estatus</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            props.subastas.map((subasta) => (
              <TableRow key={subasta.documentId}>
                <TableCell width={200}>
                  <Link
                    href={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${subasta.convocatoria.url}`}
                    target='_blank'
                    display={'block'}
                  >
                    {subasta.identificador}
                  </Link>
                </TableCell>
                <TableCell width={300}>{subasta.shortDescripcion}</TableCell>
                <TableCell>
                  <Box>
                    {
                      subasta.bases
                      && subasta.bases.map(adjunto => (
                        <Link
                          key={adjunto.id}
                          href={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${adjunto.url}`}
                          target='_blank'
                          mt={1}
                          display={'block'}
                          maxWidth={'fit-content'}
                        >
                          {adjunto.name}
                        </Link>
                      ))
                    }
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    {
                      subasta.resolucion
                      && subasta.resolucion.map(adjunto => (
                        <Link
                          key={adjunto.id}
                          href={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${adjunto.url}`}
                          target='_blank'
                          mt={1}
                          display={'block'}
                          maxWidth={'fit-content'}
                        >
                          {adjunto.name}
                        </Link>
                      ))
                    }
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={subasta.estatus}
                    sx={{
                      fontWeight: subasta.estatus === 'Concluida' ? 500 : 400
                    }}
                    variant={subasta.estatus === 'Concluida' ? 'filled' : 'outlined'}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}