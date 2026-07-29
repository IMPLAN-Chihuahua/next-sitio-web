'use client';
import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Box, Card, CardContent, Typography, IconButton, Icon } from '@mui/material';
import { SubtitleH2 } from '../../components/Titles';

interface StrapiImage {
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
  formats?: {
    small?: { url: string };
    thumbnail?: { url: string };
  };
}

interface Enlace {
  id: number;
  icon?: string | null;
  text: string;
  descriptionUrl?: string;
  url: string;
  image?: StrapiImage | null;
}

interface Props {
  titulo: string;
  enlaces: Enlace[];
}

export default function ExternalLinksCarousel({ titulo, enlaces }: Props) {
  const autoplay = Autoplay({ delay: 6000, stopOnInteraction: true, stopOnMouseEnter: true });

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center' },
    [autoplay]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
    autoplay.reset();
  }, [emblaApi, autoplay]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
    autoplay.reset();
  }, [emblaApi, autoplay]);

  const scrollTo = useCallback((index: number) => {
    emblaApi?.scrollTo(index);
    autoplay.reset();
  }, [emblaApi, autoplay]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi]);

  if (!enlaces || enlaces.length === 0) return null;

  const getImageUrl = (image: StrapiImage) => {
    const url = image.formats?.small?.url ?? image.url;
    return url.startsWith('http') ? url : `${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${url}`;
  };

  return (
    <Box sx={{ mb: 6 }}>
      <SubtitleH2 title={titulo} />

      <Box sx={{ position: 'relative', mt: 3 }}>

        {/* boton anterior */}
        <IconButton
          onClick={scrollPrev}
          aria-label="Anterior"
          sx={{
            position: 'absolute',
            left: { xs: -4, md: -20 },
            top: '50%',
            transform: 'translateY(-60%)',
            zIndex: 10,
            backgroundColor: 'background.paper',
            boxShadow: 3,
            '&:hover': { backgroundColor: '#e7a243', color: '#fff' },
          }}
        >
          <Icon>chevron_left</Icon>
        </IconButton>

        {/* Embla */}
        <Box ref={emblaRef} sx={{ overflow: 'hidden', mx: { xs: 3, md: 4 } }}>
          <Box sx={{ display: 'flex' }}>
            {enlaces.map((link) => (
              <Box
                key={link.id}
                sx={{ flex: '0 0 100%', minWidth: 0, px: 2, pb: 1 }}
              >
                <Card
                  component="a"
                  href={link.url.startsWith('http') ? link.url : `https://${link.url}`}
                  target="_blank"

                  rel="noopener noreferrer"
                  sx={{
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    borderRadius: '16px',
                    boxShadow: 3,
                    overflow: 'visible',
                    mb: 1,
                    height: { md: 260 },
                    backgroundColor: '#ffffff',
                    minHeight: { xs: 200 },
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 14px 40px #e7a34344',
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  {/* Imagen */}
                  {link.image && (
                    <Box
                      sx={{
                        width: { xs: '100%', md: 280 },
                        height: { xs: 200, md: 'auto' },
                        alignSelf: 'stretch',              // ocupa toda la altura del card
                        flexShrink: 0,
                        p: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white.50',
                      }}
                    >
                      <img
                        src={getImageUrl(link.image)}
                        alt={link.image.alternativeText ?? link.text}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          display: 'block',
                          borderRadius: '10px',
                        }}
                      />
                    </Box>
                  )}

                  {/* texto */}
                  <CardContent
                    sx={{
                      flex: 1,
                      p: { xs: 3, md: 4 },
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: { xs: 'center', md: link.image ? 'flex-start' : 'center' },
                      textAlign: { xs: 'center', md: link.image ? 'left' : 'center' },
                      overflow: 'hidden',
                      '&:last-child': { pb: { xs: 3, md: 4 } },
                    }}
                  >
                    <Typography
                      variant="h5"
                      component={'h3'}
                      color="text.primary"
                      sx={{
                        fontWeight: 700,
                        mb: 1.5,
                        lineHeight: 1.3,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {link.text}
                    </Typography>

                    {link.descriptionUrl && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 3,
                          lineHeight: 1.6,
                          maxWidth: '100%',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {link.descriptionUrl}
                      </Typography>
                    )}
                    <Box
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 0.5,
                        px: 2,
                        py: 0.75,
                        borderRadius: '999px',
                        backgroundColor: 'transparent',
                        border: '2px solid #e7a243', // Borde en tu amarillo
                        color: '#4B5563', // Texto en gris medio/oscuro
                        flexShrink: 0,
                        transition: 'all 0.2s',
                        '&:hover': {
                          backgroundColor: '#f9fafb', // Un fondito súper tenue al hacer hover
                        }
                      }}
                    >
                      <Typography variant="button" sx={{ textTransform: 'none', fontWeight: 700, fontSize: '0.8rem' }}>
                        Visitar sitio
                      </Typography>
                      <Icon sx={{ fontSize: 16, color: '#e7a243' }}>arrow_forward</Icon>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>

        {/* boton siguiente */}
        <IconButton
          onClick={scrollNext}
          aria-label="Siguiente"
          sx={{
            position: 'absolute',
            right: { xs: -4, md: -20 },
            top: '50%',
            transform: 'translateY(-60%)',
            zIndex: 10,
            backgroundColor: 'background.paper',
            boxShadow: 3,
            '&:hover': { backgroundColor: '#e7a243', color: '#fff' },
          }}
        >
          <Icon>chevron_right</Icon>
        </IconButton>
      </Box>

      {/* dots */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 3 }}>
        {enlaces.map((_, index) => (
          <Box
            key={index}
            onClick={() => scrollTo(index)}
            sx={{
              width: selectedIndex === index ? 24 : 8,
              height: 8,
              borderRadius: '999px',
              backgroundColor: selectedIndex === index ? '#e7a3438f' : '#e7a243',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </Box>
    </Box>
  );
}