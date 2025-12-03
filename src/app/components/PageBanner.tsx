import { Box, Container, Typography } from "@mui/material";
import { Overlay } from "./LandingPageBanner";
import Image from "next/image";



export default function PageBanner({ title, description, cover }: { title: string, description: string, cover?: string }) {

  return (
    <Box
      minHeight={'70vh'}
      bgcolor={'primary.100'}
      position={'relative'}
      display='flex'
      alignItems='center'
    >
      <Image
        src={cover || '/DefaultBanner.webp'}
        alt=''
        fill
        unoptimized
        loading="eager"
        style={{
          objectFit: 'cover',
        }}
      />
      <Overlay />
      <Container maxWidth='xl'
        sx={{
          zIndex: 120,
          color: 'primary.50',
          userSelect: 'none'
        }}
      >
        <Typography fontSize={{ xs: 38, md: 48 }} fontWeight={700} color="inherit"> {title}</Typography>
        <Typography maxWidth={'900px'} fontSize={24} fontWeight={400} color="inherit">{description}</Typography>
      </Container>
    </Box>
  )
}