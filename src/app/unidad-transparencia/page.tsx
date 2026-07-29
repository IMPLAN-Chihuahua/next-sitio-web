import { Box, Container, Toolbar } from "@mui/material";
import PageBanner from "../components/PageBanner";
import { SubtitleH2 } from "../components/Titles";
import { UnidadTransparenciaPageType } from "./definitions";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import Image from "next/image";
import { Titular } from "./components/Titular";
import qs from 'qs';
import { Miembros } from "./components/Miembros";




export default async function UnidadTransparenciaPage() {
  const params = qs.stringify({
    populate: ['equipo', 'equipo.miembro']
  }, { encodeValuesOnly: true })
  const req = await fetch(`${process.env.NEXT_PUBLIC_IMPLAN_CMS}/unidad-transparencia-page?${params}`);
  const page: { data: UnidadTransparenciaPageType } = await req.json();


  return (<Box minHeight={'85vh'}>
    <Toolbar variant="dense" />
    <Container sx={{ my: 3 }}>
      <MDXRemote
        source={page.data.contenido}
        components={{
          h2: props => <SubtitleH2 title={props.children} />,
          img: props => <Box position={'relative'} width={{ xs: '100%', md: '70%' }} height={{ xs: 400, md: 350 }} mx='auto' display='flex' justifyContent='center'>
            <Image
              alt=""
              unoptimized
              fill
              style={{
                objectFit: 'contain',
                objectPosition: 'center'
              }}
              src={props.src}
            />
          </Box>,
          Titular: props => <Titular titular={page.data.equipo.filter(m => m.rol === 'Titular')[0]} />,
          Miembros: props => <Miembros miembros={page.data.equipo} />
        }}
      />
    </Container>
  </Box>)
}