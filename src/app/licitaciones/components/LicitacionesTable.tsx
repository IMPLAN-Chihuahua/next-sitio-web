'use client'
import {
  Box, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Link as MuiLink
} from "@mui/material";
import { blue } from "@mui/material/colors";
import Link from "next/link";
import { Licitacion } from "../definitions";



export default function LicitacionesTable({ licitaciones }: { licitaciones: Licitacion[] }) {

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table>
        <TableHead>
          <TableRow
            sx={{ bgcolor: 'primary.200' }}
          >
            <TableCell>Identificador</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Convocatoria</TableCell>
            <TableCell>Bases</TableCell>
            <TableCell>Resolución</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            licitaciones.map((licitacion) => (
              <TableRow
                key={licitacion.id}
              >
                <TableCell sx={{ minWidth: '200px' }}>{licitacion.identificador}</TableCell>
                <TableCell sx={{ minWidth: '250px' }}>{licitacion.descripcion}</TableCell>
                <TableCell>
                  <MuiLink href="#" color={blue[900]}>Convocatoria</MuiLink>
                </TableCell>
                <TableCell sx={{ minWidth: '180px' }}>
                  <ul style={{ listStyleType: 'none' }}>
                    <li>
                      <MuiLink href={'#'} color={blue[900]}>Bases</MuiLink> <br />
                    </li>
                    <li>
                      <MuiLink href="#" color={blue[900]}>Junta aclaraciones</MuiLink> <br />
                    </li>
                    <li>
                      <MuiLink href="#" color={blue[900]}>Acta de apertura</MuiLink>
                    </li>
                  </ul>
                </TableCell>
                <TableCell>
                  <MuiLink href="#" color={blue[900]}>Fallo</MuiLink>
                </TableCell>
                <TableCell sx={{ minWidth: '90px' }}><Chip variant="outlined" label="Abierta" /></TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}