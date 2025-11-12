import type { Metadata } from 'next';
import { Typography } from "@mui/material";


export const metadata: Metadata = {
  title: '¿Quiénes somos?'
};


export default function QuienesSomosPage() {
  return (
    <main>
      <Typography>¿Quiénes somos?</Typography>
    </main>
  )
}