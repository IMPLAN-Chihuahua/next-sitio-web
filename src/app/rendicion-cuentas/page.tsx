import type { Metadata } from 'next';
import { Typography } from "@mui/material";


export const metadata: Metadata = {
  title: 'Rendición de cuentas'
};


export default function QuienesSomosPage() {
  return (
    <main>
      <Typography>Rendición de cuentas</Typography>
    </main>
  )
}