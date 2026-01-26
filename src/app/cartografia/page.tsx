import type { Metadata } from 'next';
import { Container, Toolbar, Typography } from "@mui/material";
import PageBanner from '../components/PageBanner';
import { SubtitleH2 } from '../components/Titles';
import SearchAndFiltersLayout from '../components/SearchAndFiltersLayout';
import CartografiaTiles from './components/Tiles';

export const metadata: Metadata = {
  title: 'Datos Abiertos | IMPLAN'
};


export default function DatosAbiertosPage() {

  return (<main>
    <PageBanner
      description='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi maxime nobis recusandae unde.'
      title='Cartografía'
    />

    <Container>
      <SubtitleH2 title='Datos abiertos' />
      <Typography mb={1}>
        Aviso: El carácter de esta información es de uso público, puede presentar inconsistencias y variaciones temporales. Los usuarios de nuestra información y otros productos de análisis son los únicos responsables de las interpretaciones que se realicen, no existe implicación legal en el uso de la misma para el municipio o para el propio instituto.
      </Typography>
      <Typography>
        No dude en ponerse en contacto con nuestro personal si detecta inconsistencias u omisiones. Realice sus observaciones al correo electrónico implan@implanchiuahua.org o al teléfono 200-48-00, ext. 5714.
      </Typography>
      <CartografiaTiles />
    </Container>
    

  </main>)
}