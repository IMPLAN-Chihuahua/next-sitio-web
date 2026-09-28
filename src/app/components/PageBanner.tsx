import { Box, Container, Typography } from "@mui/material";
import { Overlay } from "./LandingPageBanner";
import Image from "next/image";



export default function PageBanner({ title, description, cover }: { title: string, description: string, cover?: string }) {

  return (
    <Box
      minHeight={'70vh'}
      bgcolor={'primary.700'}
      position={'relative'}
      display='flex'
      pt={{ xs: 12 }}
      alignItems={{ xs: 'flex-start', md: 'center' }}
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
        <Typography
          fontSize={{ xs: 40, md: 50 }}
          fontWeight={700}
          color="inherit"
          sx={{
            textShadow: '1px 1px 2px black'
          }}
        >{title}</Typography>

        <Typography
          maxWidth={'900px'}
          fontSize={26}
          fontWeight={500}
          color="inherit"
          my={{ xs: 1.5 }}
          sx={{
            textShadow: '1px 1px 2px black'
          }}
        >{description}</Typography>
      </Container>
    </Box>
  )
}