import { Alert, Box, Button, Container, Link, Toolbar, Typography } from "@mui/material";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import qs from 'qs'
import { AvisoPrivacidadDetailPageBreadcrumbs } from "./components/AvisoPrivacidadBreadcrumb";
import { AvisoPrivacidad } from "../definitions";



export default async function AvisoPrivacidadDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const queryParams = qs.stringify({
    populate: ['adjunto']
  })
  const req = await fetch(`${process.env.NEXT_PUBLIC_IMPLAN_CMS}/avisos-privacidad/${slug}?${queryParams}`);
  const { data: aviso }: { data: AvisoPrivacidad } = await req.json();
  return (
    <Box>
      <Toolbar variant="dense" />
      <Container sx={{ my: 3 }}>
        <AvisoPrivacidadDetailPageBreadcrumbs currentPageTitle={aviso.titulo} />
        <Button
          target="_blank"
          component={Link}
          href={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${aviso.adjunto.url}`}
          variant="outlined"
          sx={{ my: 3 }}>Descargar PDF</Button>
        <MDXRemote
          source={aviso.contenido}
          components={{
            p: props => <Typography my={2}>{props.children}</Typography>,
            a: props => <Link href={props.href}>{props.children}</Link>,
            li: props => <li style={{ paddingBottom: '2px' }}>{props.children}</li>,
            ul: props => <ul style={{ marginLeft: '18px' }}>{props.children}</ul>,
            ol: props => <ol style={{ marginLeft: '18px' }}>{props.children}</ol>,
          }}
        />
        <Alert severity="info" sx={{ my: 3 }}>
          En caso de discrepancia, prevalece la versión oficial en PDF
        </Alert>
      </Container>
    </Box>
  )
}