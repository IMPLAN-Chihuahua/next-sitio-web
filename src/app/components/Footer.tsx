import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import Link from 'next/link';

export default async function Footer() {
  let data: any = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_IMPLAN_CMS}/footer?populate=*`, {
      next: { revalidate: 3600 },
    });
    const json = await res.json();
    data = json.data;
    console.log(data)
  } catch (err) {
    console.error("Error fetching data: ", err);
  }

  const aboutLinks = data.fields.filter((item: any) => item.type === 'ABOUT');
  const legalLinks = data.fields.filter((item: any) => item.type === 'LEGAL');

  const logoUrl = data.logo.formats?.medium?.url || data.logo.url;
  const fullLogoPath = `${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${logoUrl}`;

  return (
    <Grid container sx={{
      minHeight: { md: 350, xs: 'auto' },
      py: { xs: 5, md: 0 },
      bgcolor: 'primary.900',
      color: 'primary.50',
      borderTop: '5px solid',
      borderColor: 'secondary.main',
      '& a': {
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline',
          color: 'secondary.main' // Descomenta si quieres que se ponga amarillo solo al hacer hover
        }
      },
      '& .MuiIconButton-root': {
        color: 'inherit'
      }
    }}>
      {/* logo */}
      <Grid size={{
        md: 4,
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
          width: { xs: '60%', md: '50%' },
          textAlign: 'center',
          '& .MuiSvgIcon-root': {
            fontSize: '30px' // O puedes usar valores como '2rem', 'large', etc.
          },
        }}>
          <Image
            src={fullLogoPath}
            unoptimized={true}
            alt='Logotipo monocromático de la página web'
            loading="eager"
            width={1000}
            height={300}
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-around',
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
      {/* about */}
      <Grid size={{
        md: 4,
        xs: 12,
      }} sx={{
        pt: 3,
        textAlign: { xs: 'center', md: 'left' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'

      }}>
        <Typography variant="h5" fontWeight={500} sx={{
          color: 'secondary.main'
        }} >
          Acerca de
        </Typography>
        {aboutLinks.map((link: any) => (
          <Typography key={link.id} variant="body1" sx={{
            py: 0.5,
            '& a': {
              position: 'relative',
              textDecoration: 'none',
              color: 'primary.50',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                width: '0%',
                height: '2px',
                bottom: 0,
                left: 0,
                backgroundColor: 'secondary.main',
                transition: 'width 0.3s ease-in-out',
              },
              '&:hover::after': {
                width: '100%',
              },
              '&:hover': {
                color: 'secondary.main',
                textDecoration: 'none'
              }
            }
          }}>
            <Link
              href={link.url}
              target={link.url.startsWith('http') ? "_blank" : "_self"}
              rel={link.url.startsWith('http') ? "noopener noreferrer" : undefined}
            >
              {link.text}
            </Link>
          </Typography>
        ))}
      </Grid>
      {/* legal */}
      <Grid size={{
        md: 4,
        xs: 12
      }}
        sx={{
          pt: 3,
          pb: { xs: 3, md: 0 },
          textAlign: { xs: 'center', md: 'left' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',

        }}
      >
        <Typography variant="h5" fontWeight={500} sx={{
          color: 'secondary.main'
        }} >
          Legal
        </Typography>

        {legalLinks.map((link: any) => (
          <Typography key={link.id} variant="body1" sx={{
            py: 0.5,
            '& a': {
              position: 'relative',
              textDecoration: 'none',
              color: 'primary.50',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                width: '0%',
                height: '2px',
                bottom: 0,
                left: 0,
                backgroundColor: 'secondary.main',
                transition: 'width 0.3s ease-in-out',
              },

              '&:hover::after': {
                width: '100%',
              },
              '&:hover': {
                color: 'secondary.main',
                textDecoration: 'none'
              }
            }
          }}>
            <Link
              href={link.url}
              target={link.url.startsWith('http') ? "_blank" : "_self"}
              rel={link.url.startsWith('http') ? "noopener noreferrer" : undefined}
            >
              {link.text}
            </Link>
          </Typography>
        ))}
      </Grid>
    </Grid>
  )
}