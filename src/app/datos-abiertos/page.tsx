import type { Metadata } from 'next';
import { Typography } from "@mui/material";

export const metadata: Metadata = {
  title: 'Datos Abiertos | IMPLAN'
}; 


export default function DatosAbiertosPage() {

  return (<main>
    <Typography>Datos Abiertos</Typography>
  </main>)
}