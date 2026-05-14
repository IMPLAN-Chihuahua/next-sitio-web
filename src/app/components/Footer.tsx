import { Link as MuiLink, Box, Button, Container, Grid, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import Link from 'next/link';
import { FooterType } from "../definitions";
import { OpenInNew } from "@mui/icons-material";
import { FooterGroupLink } from "./FooterGroupLInk";

export default async function Footer() {
  let data: FooterType | null = null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_IMPLAN_CMS}/footer?populate[0]=logo&populate[1]=grupos&populate[2]=grupos.enlaces`, {
      next: { revalidate: 3600 },
    });
    const json = await res.json();
    data = json.data as FooterType;
  } catch (err) {
    console.error("Error fetching data: ", err);
    throw new Error('Error al obtener footer')
  }

  if (!data) {
    return;
  }

  const logoUrl = data.logo.formats?.medium?.url || data.logo.url;
  const fullLogoPath = `${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${logoUrl}`;

  return (
    <Box bgcolor={'primary.900'}>
      <Grid container sx={{
        minHeight: { md: 350, xs: 'auto' },
        py: { xs: 5, md: 6 },
        px: { xs: 5, md: 4 },
        justifyContent: 'space-around',
        color: 'primary.50',
        borderColor: 'secondary.main',
        '& a': {
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
            color: 'secondary.main'
          }
        },
        '& .MuiIconButton-root': {
          color: 'inherit'
        }
      }}>
        <Grid size={{
          md: 3,
          xs: 12,
        }}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            mb: { xs: 4, md: 0 }
          }}
        >
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', md: 'flex-start' }
          }}>
            <Image
              src={fullLogoPath}
              unoptimized={true}
              alt='Logotipo monocromático de la página web'
              loading="eager"
              width={200}
              height={150}
            />
            <Box my={1.5}>
              <Typography
                color='primary.400'
                textAlign={{ xs: 'center', md: 'start' }}
                variant='body2'
              >
                C. Victoria No. 14, 6° Piso, Col. Centro. C.P. 31000 Chihuahua, Chih. México. Horario de 8:30 a 15:30 horas de lunes a viernes. (614) 2004820.
              </Typography>
            </Box>
            <Box sx={{
              display: 'flex',
              justifyContent: { xs: 'center', md: 'flex-start' },
            }}>
              <IconButton>
                <FacebookIcon />
              </IconButton>
              <IconButton sx={{
                '& .MuiSvgIcon-root': {
                  fontSize: '35px'
                }
              }}>
                <YouTubeIcon />
              </IconButton>
              <IconButton>
                <InstagramIcon />
              </IconButton>
            </Box>
          </Box>
        </Grid>

        <Grid container sx={{ pl: { md: 2 } }} size={{ md: 9, xs: 12 }}>
          {
            data.grupos.map(grupo => (
              <Grid key={grupo.id} size={{ xs: 12, md: 3 }}>
                <Typography color='secondary.main' fontSize={24} fontWeight={600} my={1.5}>
                  {grupo.titulo}
                </Typography>
                <Box component='ul' sx={{ listStyle: 'none' }}>
                  {
                    grupo.enlaces.map(enlace => (
                      <Box
                        component='li'
                        key={enlace.id}
                        sx={{
                          ml: { md: '.5rem' },
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          mb: .5
                        }}>
                        {
                          enlace.external ? (
                            <>
                              <OpenInNew sx={{ color: 'inherit', fontSize: 18, mr: '2px' }} />
                              <MuiLink
                                href={enlace.href}
                                target={enlace.external ? '_blank' : '_self'}
                                color='primary.400'
                                variant="body1"
                              >
                                {
                                }{enlace.label}
                              </MuiLink>
                            </>
                          ) : (
                            <FooterGroupLink enlace={enlace} />
                          )
                        }
                      </Box>
                    ))
                  }
                </Box>
              </Grid>

            ))
          }
        </Grid>
      </Grid>
      <Box bgcolor='primary.300' textAlign={'center'} py={.5}>
        <Typography variant="caption">
          ® {new Date().getFullYear()} IMPLAN Chihuahua
        </Typography>
      </Box>
    </Box >
  )
}