'use client'

import { Box, Chip, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { Subasta } from "../definitions"

const getFileUrl = (url?: string) => {
  if (!url) return '#';
  if (url.startsWith('http')) return url;
  return `${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${url}`;
};

const renderArchivoGrupos = (grupos?: any[]) => {
  if (!grupos?.length) return null;

  return (
    <Box>
      {grupos.flatMap((grupo) =>
        grupo.Archivo?.map((archivo: any) => (
          <Link
            key={`${grupo.id}-${archivo.id}`}
            href={getFileUrl(archivo.url)}
            target="_blank"
            display="block"
            mt={1}
            maxWidth="fit-content"
            underline="none"
          >
            {grupo.Nombre}
          </Link>
        )) ?? []
      )}
    </Box>
  );
};

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
            props.subastas.map((subasta) => {
              // Extraemos de forma segura el URL del primer archivo en la convocatoria
              const urlConvocatoria = subasta.convocatoria?.[0]?.Archivo?.[0]?.url;

              return (
                <TableRow key={subasta.documentId}>
                  <TableCell width={200}>
                    {urlConvocatoria ? (
                      <Link
                        href={getFileUrl(urlConvocatoria)}
                        target='_blank'
                        display={'block'}
                        underline="none"
                      >
                        {subasta.identificador}
                      </Link>
                    ) : (
                      subasta.identificador
                    )}
                  </TableCell>
                  <TableCell width={300}>{subasta.shortDescripcion}</TableCell>

                  {/* Usamos el renderizador para Bases y Resolución */}
                  <TableCell>
                    {renderArchivoGrupos(subasta.bases)}
                  </TableCell>
                  <TableCell>
                    {renderArchivoGrupos(subasta.resolucion)}
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
              )
            })
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}