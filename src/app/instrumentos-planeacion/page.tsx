import type { Metadata } from 'next';
import { Typography } from "@mui/material";
import PageBanner from '../components/PageBanner';


export const metadata: Metadata = {
  title: 'Instrumentos de Planeación | IMPLAN'
};


export default function InstrumentosPlaneacionPage() {


  return (<main>
    <PageBanner
      cover=''
      title='Instrumentos de planeación'
      description='Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit veniam cum id tenetur aut aliquam.'
    />

  </main>)
}