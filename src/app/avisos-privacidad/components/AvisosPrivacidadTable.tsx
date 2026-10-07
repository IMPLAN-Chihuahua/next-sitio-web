'use client'

import { Link as MuiLink, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { AvisoPrivacidad } from "../definitions"
import Link from "next/link"
import { parse } from "date-fns"



export const AvisosPrivacidadTable = (props: { avisos: AvisoPrivacidad[] }) => {


  return (<TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Titulo</TableCell>
          <TableCell>Fecha elaboración</TableCell>
          <TableCell>Fecha modificación</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          props.avisos.length > 0
            ? props.avisos.map(aviso => (
              <TableRow key={aviso.documentId}>
                <TableCell>
                  <MuiLink component={Link} href={`/avisos-privacidad/${aviso.seoUrl}`}>
                    {aviso.orden}. {aviso.titulo}
                  </MuiLink>
                </TableCell>
                <TableCell>
                  {parse(aviso.fechaElaboracion, 'yyyy-MM-dd', new Date()).toLocaleDateString('es-MX')}
                </TableCell>
                <TableCell>
                  {aviso.fechaModificacion && parse(aviso.fechaModificacion, 'yyyy-MM-dd', new Date()).toLocaleDateString('es-MX')}
                </TableCell>
              </TableRow>
            ))
            : (
              <TableRow>
                <TableCell sx={{ textAlign: 'center' }} colSpan={3}>No se encontraron avisos de privacidad disponibles.</TableCell>
              </TableRow>
            )
        }
      </TableBody>
    </Table>
  </TableContainer>)
}