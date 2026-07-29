'use client';

import { useState } from 'react';
import { Box, Card, CardContent, Typography, Icon } from "@mui/material";
import Grid from "@mui/material/Grid";
import useMediaQuery from '@mui/material/useMediaQuery';
import { SubtitleH2 } from '../../components/Titles';
import Link from 'next/link';
import { visuallyHidden } from '@mui/utils';

interface Enlace {
  id: number;
  icon?: string;
  text: string;
  description: string;
  descriptionUrl: string;
  url: string;
}

interface Props {
  titulo: string;
  enlaces: Enlace[];
}

function TarjetaLink({ link, esMovil }: { link: Enlace; esMovil: boolean }) {
  const [volteada, setVolteada] = useState(false);

  const handleTouchStart = () => {
    if (!volteada) setVolteada(true);
  };

  // Si el usuario toca la trasera sin estar volteada aún, evitamos navegación accidental
  const handleTraseraTouch = (e: React.TouchEvent) => {
    if (!volteada) e.preventDefault();
  };

  return (
    <Box
      sx={{
        textDecoration: 'none',
        display: 'block',
        perspective: '1000px',
        // Desktop (>900px): se giran las tarjetas solas al pasar el mouse
        ...(!esMovil && {
          '&:hover .capa-frontal': { opacity: 0, transform: 'rotateY(90deg)' },
          '&:hover .capa-trasera': { opacity: 1, transform: 'rotateY(0deg)' },
          '&:hover .tarjeta-contenedor': {
            transform: 'translateY(-4px)',
            boxShadow: '0 14px 40px #e7a34344',
          },
        }),
        // Móvil (<900px): doble click, el primero para mostrar la descripcion y el segundo para ir al link
        ...(esMovil && volteada && {
          '& .capa-frontal': { opacity: 0, transform: 'rotateY(90deg)' },
          '& .capa-trasera': { opacity: 1, transform: 'rotateY(0deg)' },
          '& .tarjeta-contenedor': {
            transform: 'translateY(-4px)',
            boxShadow: '0 14px 40px #e7a34344',
          },
        }),
      }}
    >
      <Card
        className="tarjeta-contenedor"
        elevation={0}
        sx={{
          position: 'relative',
          height: '220px',
          width: '100%',
          borderRadius: '16px',
          backgroundColor: 'transparent',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.22)',
          transition: 'all 0.3s ease',
        }}
      >
        {/* FRONTAL */}
        <Box
          className="capa-frontal"
          onTouchStart={esMovil ? handleTouchStart : undefined}
          sx={{
            position: 'absolute',
            inset: 0,
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'background.paper',
            borderRadius: '16px',
            transition: 'opacity 0.25s ease, transform 0.3s ease',
            opacity: 1,
            transform: 'rotateY(0deg)',
            zIndex: 2,
            cursor: esMovil ? 'pointer' : 'default',
          }}
        >
          <CardContent sx={{ textAlign: 'center' }}>
            {link.icon && (
              <Icon sx={{ fontSize: 48, color: '#e7a243', mb: 1.5 }}>
                {link.icon}
              </Icon>
            )}
            <Typography variant="h5" component="h3" color='primary.secondary' sx={{ fontWeight: 600 }}>
              {link.text}
            </Typography>
            {/* Hint solo en móvil */}
            {esMovil && (
              <Typography variant="caption" sx={{ mt: 1, display: 'block', color: 'text.disabled' }}>
                Toca para ver más
              </Typography>
            )}
          </CardContent>
        </Box>

        {/* TRASERA movil es el Link navegable; en desktop el Box padre ya es Link */}
        <Box
          className="capa-trasera"
          component={esMovil ? Link : 'div'}
          href={esMovil ? link.url : undefined}
          onTouchStart={esMovil ? handleTraseraTouch : undefined}
          sx={{
            position: 'absolute',
            inset: 0,
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'primary.main',
            color: '#ffffff',
            borderRadius: '16px',
            textDecoration: 'none',
            transition: 'opacity 0.25s ease 0.25s, transform 0.3s ease 0.2s',
            opacity: 0,
            transform: 'rotateY(-90deg)',
            zIndex: 1,
          }}
        >
          <CardContent sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ fontWeight: 400, lineHeight: 1.5, color: '#ffffff', opacity: 0.9, mb: 2 }}>
              {link.descriptionUrl}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 'auto' }}>
              <Typography variant="button" sx={{ color: '#ffffff', fontWeight: 'bold', textTransform: 'none', letterSpacing: '0.5px' }}>
                Ingresar a la sección
              </Typography>
              <Icon sx={{ color: '#ffffff', fontSize: 20 }}>arrow_forward</Icon>
            </Box>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
}

export default function Links({ titulo, enlaces }: Props) {
  const esMovil = !useMediaQuery('(min-width:900px)');  //funcion para manejar los px de si es movil o web

  return (
    <Box sx={{ mb: 6 }}>
      <Typography component="h1" sx={visuallyHidden}>
        Transparencia
      </Typography>
      <SubtitleH2 title={titulo} />

      <Grid container spacing={3} sx={{ mt: 1 }}>
        {enlaces?.map((link) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={link.id}>
            {/* Desktop: el Box entero es un Link */}
            {!esMovil ? (
              <Box
                component={Link}
                href={link.url}
                sx={{ textDecoration: 'none', display: 'block' }}
              >
                <TarjetaLink link={link} esMovil={false} />
              </Box>
            ) : (
              <TarjetaLink link={link} esMovil={true} />
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}