import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Footer() {

  const ARRACITO = [1, 2, 3, 4];

  return (
    <Grid container sx={{
      height: 350,
      bgcolor: 'primary.900',
      color: 'primary.50',
      borderTop: '5px solid',
      borderColor: 'secondary.main',
      '& .MuiTypography-root': {
        color: 'primary.50',
      },
      '& a': {
        color: 'secondary.main',
        textDecoration: 'none'
      },
      '& .MuiIconButton-root': {
        color: 'inherit'
      }
    }}>
      <Grid size={{
        md: 4,
        xs: 12,
      }}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Box sx={{
          width: '50%',
          '& .MuiSvgIcon-root': {
            fontSize: '30px' // O puedes usar valores como '2rem', 'large', etc.
          },
        }}>
          <Image
            src={`https://implanchihuahua.org/img/IMPLAN_B.png`}
            unoptimized={true}
            alt=''
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
      <Grid size={{
        md: 4,
        xs: 12,
      }} sx={{ pt: 3 }}>
        <Typography variant="h5" fontWeight={500} >
          Acerca de
        </Typography>
        {ARRACITO.map((idx) => {
          return (
            <Typography variant="body1" key={idx} sx={{ py: 1 }}>
              Lorem ipsum
            </Typography>
          )
        })}
      </Grid>
      <Grid size={{
        md: 4,
        xs: 12
      }}
        sx={{ pt: 3 }}
      >
        <Typography variant="h5" fontWeight={500}>
          Legal
        </Typography>

        {ARRACITO.map((idx) => {
          return (
            <Typography variant="body1" key={idx} sx={{ py: 1 }}>
              Lorem ipsum
            </Typography>
          )
        })}
      </Grid>
    </Grid>
  )
}