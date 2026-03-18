import { Box, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { blue } from "@mui/material/colors";
import { AdquisicionDirecta } from "../definitions";


export default function AdquisicionesDirectasTable({ adquisiciones }: { adquisiciones: AdquisicionDirecta[] }) {


  return (
    <TableContainer component={Paper} variant="outlined">
      <Table>
        <TableHead>
          <TableRow
            sx={{ bgcolor: 'primary.200' }}
          >
            <TableCell>Adquisición</TableCell>
            <TableCell>Resolución</TableCell>
            <TableCell>Más</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { 
          adquisiciones.length > 0 ?
            adquisiciones.map(adquisicion => (
              <TableRow key={adquisicion.documentId}>
                <TableCell sx={{ minWidth: '200px' }}>
                  {adquisicion.adquisicion}
                </TableCell>
                <TableCell
                  sx={{ minWidth: '300px' }}
                >
                  {adquisicion.resolucion}
                </TableCell>
                <TableCell sx={{ minWidth: '180px' }}>
                  <Link
                    href={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${adquisicion.dictamenExcepcion.url}`}
                    target='_blank'>
                    Dictamen de excepción
                  </Link>
                </TableCell>
              </TableRow>
            ))
            : (
              <TableRow><TableCell>No se encontraron registros de este año</TableCell></TableRow>
            )
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}