import { Alert, Box, Button, Container, Link, Toolbar, Typography } from "@mui/material";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import qs from 'qs'
import { AvisoPrivacidadDetailPageBreadcrumbs } from "./components/AvisoPrivacidadBreadcrumb";



export default async function AvisoPrivacidadDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const queryParams = qs.stringify({
    populate: ['adjunto']
  })
  const req = await fetch(`${process.env.NEXT_PUBLIC_IMPLAN_CMS}/avisos-privacidad/${slug}?${queryParams}`);
  const { data: aviso } = await req.json();
  return (
    <Box>
      <Toolbar variant="dense" />
      <Container sx={{ my: 3 }}>
        <AvisoPrivacidadDetailPageBreadcrumbs currentPageTitle={aviso.titulo} />
        <Button component={Link} variant="outlined" sx={{ my: 3 }}>Descargar PDF</Button>
        <MDXRemote
          source={aviso.contenido}
          components={{
            p: props => <Typography my={2}>{props.children}</Typography>,
            a: props => <Link href={props.href}>{props.children}</Link>,
            li: props => <li style={{ paddingBottom: '2px' }}>{props.children}</li>,
            ul: props => <ul style={{ marginLeft: '15px' }}>{props.children}</ul>,
          }}
        />
        <Alert severity="info" sx={{ my: 3 }}>
          En caso de discrepancia, prevalece la versión oficial en PDF
        </Alert>
      </Container>
    </Box>
  )
}